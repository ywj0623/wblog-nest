import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from 'src/common/strategies/localAuth.strategy'
import { UserModule } from 'src/modules/user/user.module'
import { AuthResolver } from 'src/resolvers/auth/auth.resolver'
import { AuthService } from 'src/services/auth/auth.service'

@Module({
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'local' })],
  providers: [AuthService, AuthResolver, LocalStrategy],
})
export class AuthModule {}
