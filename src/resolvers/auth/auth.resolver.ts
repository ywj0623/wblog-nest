import { BadRequestException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
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

  @Mutation(() => LoginResponseDTO, { name: 'signup' })
  async signup(@Args() args: CreateUserDTO) {
    const { username, email } = args
    const isExist = await this.userService.isExistUser(username, email)

    if (isExist) {
      const message = 'username & email is already exists.'
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
  login(@Args('username') username: string, @Args('password') password: string, @UserPayload() user: UserPayloadDTO) {
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
