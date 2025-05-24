import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { IsString, IsEmail } from 'class-validator'
import { Schema as MongooseSchema } from 'mongoose'
import { User } from 'src/entity/user.entity'

@ArgsType()
export class UserPayloadDTO {
  @Field(() => String, { description: '使用者 ID' })
  @IsString()
  _id: MongooseSchema.Types.ObjectId

  @Field(() => String, { description: 'email' })
  @IsEmail()
  @IsString()
  email: string
}

@ObjectType()
export class LoginResponseDTO {
  @Field(() => String)
  @IsString()
  token: string

  @Field(() => User)
  user: User
}
