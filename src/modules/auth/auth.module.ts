import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { LocalStrategy } from 'src/common/strategies/localAuth.strategy'
import { JwtStrategy } from 'src/common/strategies/jwt.strategy'
import { UserModule } from 'src/modules/user/user.module'
import { AuthResolver } from 'src/resolvers/auth/auth.resolver'
import { AuthService } from 'src/services/auth/auth.service'
import { ConfigModule } from '@nestjs/config'
import { JwtUtilModule } from 'src/modules/jwt/jwt.module'

@Module({
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'local' }), ConfigModule, JwtUtilModule],
  providers: [AuthService, AuthResolver, JwtService, LocalStrategy, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
