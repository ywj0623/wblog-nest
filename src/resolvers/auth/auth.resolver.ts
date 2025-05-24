import { BadRequestException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/common/guards/auth.guard'
import { UserPayload } from 'src/common/decorators/userPayload.decorator'
import { User } from 'src/entity/user.entity'
import { UserService } from 'src/services/user/user.service'
import { CreateUserDTO } from 'src/resolvers/user/dto/createUser.dto'
import { LoginResponseDTO, UserPayloadDTO } from './dto/user.dto'
import { ConfigService } from '@nestjs/config'
import { JwtUtil } from 'src/common/utils/jwt.util'

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private configService: ConfigService,
    private jwtUtil: JwtUtil,
    private readonly userService: UserService,
  ) {}

  @Query(() => Boolean, { name: 'checkEmail' })
  async checkEmail(@Args('email') email: string) {
    const exist = await this.userService.isExistUser(email)
    return exist
  }

  @Mutation(() => LoginResponseDTO, { name: 'signup' })
  async signup(@Args() args: CreateUserDTO) {
    const { email } = args
    const isExist = await this.userService.isExistUser(email)

    if (isExist) {
      const message = 'email is already exists.'
      throw new BadRequestException(message)
    }

    const newUser = await this.userService.createUser(args)
    const token = this.jwtUtil.generateToken(newUser)

    return {
      token,
      user: newUser,
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginResponseDTO, { name: 'login' })
  login(@Args('email') email: string, @Args('password') password: string, @UserPayload() user: UserPayloadDTO) {
    const secret = this.configService.get<string>('secret.jwt')

    if (!secret) {
      throw new Error('Jwt secret is not defined')
    }

    const token = this.jwtUtil.generateToken(user)

    return {
      token,
      user: user,
    }
  }
}
