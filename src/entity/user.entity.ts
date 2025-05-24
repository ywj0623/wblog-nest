import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { ObjectType, Field } from '@nestjs/graphql'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { IsEmail, IsString } from 'class-validator'

@Schema()
@ObjectType()
export class User extends Document {
  @Field(() => String, { description: '使用者 ID', nullable: false })
  _id: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  @Field(() => String, { description: 'email', nullable: false })
  @IsEmail()
  email: string

  @Prop({ required: true })
  @Field(() => String, { description: '密碼', nullable: false })
  @IsString()
  password: string
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
