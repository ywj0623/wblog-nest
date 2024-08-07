import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UserPayloadDTO } from 'src/resolvers/auth/dto/user.dto'

@Injectable()
export class JwtUtil {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  generateToken(user: UserPayloadDTO): string {
    const secret = this.configService.get<string>('secret.jwt')

    if (!secret) {
      throw new Error('Jwt secret is not defined')
    }

    return this.jwtService.sign({ ...user }, { secret: secret })
  }
}
