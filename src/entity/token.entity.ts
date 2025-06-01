import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Field, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { Document, Schema as MongooseSchema } from 'mongoose'

@Schema()
@ObjectType()
export class Token extends Document {
  @Field(() => String, { description: 'Token ID', nullable: false })
  _id: MongooseSchema.Types.ObjectId

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => String, { description: '使用者 id', nullable: false })
  user_id: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  @Field(() => String, { description: 'Refresh Token', nullable: false })
  @IsString()
  refresh_token: string

  @Prop({ required: true })
  @Field(() => String, { description: 'Access Token', nullable: false })
  @IsString()
  access_token: string
}

export type TokenDocument = Token & Document
export const TokenSchema = SchemaFactory.createForClass(Token)
