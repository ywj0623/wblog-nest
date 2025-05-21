import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { User, UserDocument } from 'src/entity/user.entity'
import { CreateUserDTO } from 'src/resolvers/user/dto/createUser.dto'

import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  public async createUser(dto: CreateUserDTO): Promise<User> {
    const { email, password, confirmPassword } = dto

    if (password !== confirmPassword) {
      throw new Error('Password and confirm password do not match')
    }

    const encrypted = await bcrypt.hash(password, 12)
    return this.userModel.create({
      email,
      password: encrypted,
    })
  }

  public async isExistUser(email: string): Promise<boolean> {
    const exist = await this.userModel.exists({ $or: [{ email }] }).exec()
    return !!exist
  }

  public findUser(filter: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel.findOne(filter).exec()
  }
}
