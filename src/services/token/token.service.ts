import { BadRequestException, Injectable } from '@nestjs/common'
import { Token, TokenDocument } from 'src/entity/token.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { JwtUtil } from 'src/common/utils/jwt.util'
import { User } from 'src/entity/user.entity'
import { UserPayloadDTO } from 'src/resolvers/auth/dto/user.dto'

@Injectable()
export class TokenService {
  constructor(
    private jwtUtil: JwtUtil,
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
  ) {}

  async createToken(user: User): Promise<Token> {
    if (!user._id) {
      throw new BadRequestException('User ID, refresh token, and access token are required')
    }
    const refresh_token = this.jwtUtil.generateRefreshToken(user)
    const access_token = this.jwtUtil.generateAccessToken(user)

    const result = await this.tokenModel.create({
      user_id: user._id,
      refresh_token,
      access_token,
    })

    return result
  }

  async refreshToken(user: UserPayloadDTO): Promise<Token> {
    if (!user._id) {
      throw new BadRequestException('User ID, refresh token, and access token are required')
    }

    const existingTokenUser = await this.tokenModel.findOne({ user_id: user._id })

    if (existingTokenUser) {
      existingTokenUser.refresh_token = this.jwtUtil.generateRefreshToken(user)
      existingTokenUser.access_token = this.jwtUtil.generateAccessToken(user)
      return existingTokenUser.save()
    } else {
      return this.createToken(user)
    }
  }

  async clearToken(user: UserPayloadDTO): Promise<void> {
    if (!user._id) {
      throw new BadRequestException('User ID is required to clear token')
    }

    await this.tokenModel.deleteOne({ user_id: user._id }).exec()
  }
}
