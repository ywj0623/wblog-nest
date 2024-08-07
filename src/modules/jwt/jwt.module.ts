import { Module } from '@nestjs/common'
import { JwtUtil } from 'src/common/utils/jwt.util'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('secret.jwt')
        if (!secret) {
          throw new Error('JWT secret is not defined')
        }
        return {
          secret: secret,
          signOptions: { expiresIn: '60s' },
        }
      },
    }),
  ],
  providers: [JwtUtil],
  exports: [JwtUtil],
})
export class JwtUtilModule {}
