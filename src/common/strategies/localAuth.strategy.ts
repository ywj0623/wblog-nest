import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from 'src/services/auth/auth.service'
import { UserPayloadDTO } from 'src/resolvers/auth/dto/user.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    })
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: UserPayloadDTO = {
      _id: user._id,
      username: user.username,
      email: user.email,
    }

    return payload
  }
}
