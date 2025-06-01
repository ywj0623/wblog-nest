import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TokenService } from 'src/services/token/token.service'
import { TokenResolver } from 'src/resolvers/token/token.resolver'
import { Token, TokenSchema } from 'src/entity/token.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Token.name,
        schema: TokenSchema,
      },
    ]),
  ],
  providers: [TokenService, TokenResolver],
  exports: [TokenService],
})
export class TokenModule {}
