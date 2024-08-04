import { ArgsType, Field } from '@nestjs/graphql'
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator'
import { Schema as MongooseSchema } from 'mongoose'

@ArgsType()
export class UserPayloadDTO {
  @Field((type) => String, { description: '使用者 ID', nullable: false })
  @IsString()
  _id: MongooseSchema.Types.ObjectId

  @Field((type) => String, { description: '使用者名稱', nullable: false })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string

  @Field((type) => String, { description: 'email' })
  @IsEmail()
  @IsString()
  email: string
}
