import { Injectable } from '@nestjs/common'
import { UserService } from 'src/services/user/user.service'
import * as bcrypt from 'bcrypt'
import { User } from 'src/entity/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUser({ username })

    if (!user) {
      return null
    }

    const IsPasswordValid = await bcrypt.compare(password, user.password)

    if (!IsPasswordValid) {
      return null
    }

    return user
  }
}
