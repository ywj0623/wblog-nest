import { BadRequestException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from 'src/common/guards/auth.guard'
import { UserPayload } from 'src/common/decorators/userPayload.decorator'
import { User } from 'src/entity/user.entity'
import { UserService } from 'src/services/user/user.service'
import { CreateUserDTO } from 'src/resolvers/user/dto/createUser.dto'
import { LoginResponseDTO, UserPayloadDTO } from './dto/user.dto'
import { TokenService } from 'src/services/token/token.service'

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
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
    const result = await this.tokenService.createToken(newUser)

    return {
      token: result.access_token,
      user: newUser,
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginResponseDTO, { name: 'login' })
  async login(@Args('email') email: string, @Args('password') password: string, @UserPayload() user: UserPayloadDTO) {
    const result = await this.tokenService.refreshToken(user)

    return {
      token: result.access_token,
      user: user,
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'logout' })
  async logout(@UserPayload() user: UserPayloadDTO) {
    if (!user) {
      throw new BadRequestException('User not found')
    }

    const token = await this.tokenService.refreshToken(user)

    if (!token) {
      throw new BadRequestException('Failed to logout')
    }

    return true
  }
}
