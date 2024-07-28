import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectType, Field } from '@nestjs/graphql'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { IsString } from 'class-validator'

@Schema()
@ObjectType()
export class Post extends Document {
  @Field((type) => String, {
    description: '文章 ID',
  })
  _id: MongooseSchema.Types.ObjectId

  @Prop()
  @Field((type) => String, {
    description: '文章標題',
  })
  @IsString()
  readonly title: string

  @Prop()
  @Field((type) => String, {
    description: '文章簡介',
  })
  @IsString()
  readonly description?: string

  @Prop()
  @Field((type) => String, {
    description: '內文',
  })
  @IsString()
  readonly body: string

  @Prop()
  @Field((type) => String, {
    description: '作者',
  })
  @IsString()
  readonly author: string

  @Prop()
  @Field((type) => Date, {
    description: '刊登日',
  })
  @IsString()
  readonly date_posted: Date
}

export type PostDocument = Post & Document
export const PostSchema = SchemaFactory.createForClass(Post)
