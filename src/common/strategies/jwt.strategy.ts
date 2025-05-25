import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { UserPayloadDTO } from 'src/resolvers/auth/dto/user.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('secret.jwt')
    if (!secret) {
      throw new Error('Jwt secret is not defined')
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    })
  }

  validate(payload: Record<string, any>) {
    const { _id, email } = payload
    const userPayload: UserPayloadDTO = {
      _id,
      email,
    }
    return userPayload
  }
}
