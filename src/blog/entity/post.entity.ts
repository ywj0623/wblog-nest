import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectType, Field } from '@nestjs/graphql'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { IsString } from 'class-validator'

@Schema()
@ObjectType()
export class Post extends Document {
  @Field((type) => String, {
    description: '文章 ID',
    nullable: false,
  })
  _id: MongooseSchema.Types.ObjectId

  @Prop()
  @Field((type) => String, {
    description: '文章標題',
    nullable: false,
  })
  @IsString()
  readonly title: string

  @Prop()
  @Field((type) => String, {
    description: '文章簡介',
    nullable: true,
  })
  @IsString()
  readonly description?: string

  @Prop()
  @Field((type) => String, {
    description: '內文',
    nullable: true,
  })
  @IsString()
  readonly body: string

  @Prop()
  @Field((type) => String, {
    description: '作者',
    nullable: false,
  })
  @IsString()
  readonly author: string

  @Prop()
  @Field((type) => Date, {
    description: '刊登日',
    nullable: false,
  })
  readonly date_posted: Date
}

export type PostDocument = Post & Document
export const PostSchema = SchemaFactory.createForClass(Post)
