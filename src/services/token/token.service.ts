import { BadRequestException, Injectable } from '@nestjs/common'
import { Token, TokenDocument } from 'src/entity/token.entity'
import { Model, Schema as MongooseSchema } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>) {}

  async createToken(userId: MongooseSchema.Types.ObjectId, refresh_token: string, access_token: string): Promise<Token> {
    if (!userId || !refresh_token || !access_token) {
      throw new BadRequestException('User ID, refresh token, and access token are required')
    }

    return this.tokenModel.create({
      user_id: userId,
      refresh_token,
      access_token,
    })
  }

  async refreshToken(userId: MongooseSchema.Types.ObjectId, refresh_token: string, access_token: string): Promise<Token> {
    if (!userId || !refresh_token || !access_token) {
      throw new BadRequestException('User ID, refresh token, and access token are required')
    }

    const existingTokenUser = await this.tokenModel.findOne({ user_id: userId })

    if (existingTokenUser) {
      existingTokenUser.refresh_token = refresh_token
      existingTokenUser.access_token = access_token
      return existingTokenUser.save()
    } else {
      return this.createToken(userId, refresh_token, access_token)
    }
  }
}
