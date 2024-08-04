import { BadRequestException } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from 'src/entity/user.entity'
import { UserService } from 'src/services/user/user.service'
import { CreateUserDTO } from 'src/resolvers/user/dto/createUser.dto'

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'signup' })
  async signup(@Args() args: CreateUserDTO) {
    const { username, email } = args
    const isExist = await this.userService.isExistUser(username, email)

    if (isExist) {
      const message = 'username & email is already exists.'
      throw new BadRequestException(message)
    }

    return this.userService.createUser(args)
  }
}
