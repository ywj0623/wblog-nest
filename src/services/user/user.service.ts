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
    const { username, email, password } = dto
    const encrypted = await bcrypt.hash(password, 12)
    return this.userModel.create({
      username,
      email,
      password: encrypted,
    })
  }

  public async isExistUser(username: string, email: string): Promise<boolean> {
    const exist = await this.userModel.exists({ $or: [{ username }, { email }] }).exec()
    return !!exist
  }

  public findUser(filter: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel.findOne(filter).exec()
  }
}
