import { Module } from '@nestjs/common'
import { UserModule } from 'src/modules/user/user.module'
import { AuthResolver } from 'src/resolvers/auth/auth.resolver'

@Module({
  imports: [UserModule],
  providers: [AuthResolver],
})
export class AuthModule {}
