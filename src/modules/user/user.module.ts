import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from 'src/services/user/user.service'
import { UserResolver } from 'src/resolvers/user/user.resolver'
import { User, UserSchema } from 'src/entity/user.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ConfigModule.forRoot({ cache: true }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
