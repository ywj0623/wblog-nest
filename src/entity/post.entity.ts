import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectType, Field } from '@nestjs/graphql'
import { Document, Schema as MongooseSchema, Types } from 'mongoose'
import { IsString } from 'class-validator'
import { StaticData } from './staticData.entity'

@Schema()
@ObjectType()
export class Post extends Document {
  @Field((type) => String, { description: '文章 ID', nullable: false })
  _id: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  @Field((type) => String, { description: '文章標題', nullable: false })
  @IsString()
  readonly title: string

  @Prop()
  @Field((type) => String, { description: '文章簡介', nullable: true })
  @IsString()
  readonly description?: string

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'StaticData',
  })
  @Field((type) => String, { description: '分類', nullable: false })
  @IsString()
  readonly category: StaticData

  @Prop({
    required: true,
    default: 'draft',
    type: Types.ObjectId,
    ref: 'StaticData',
  })
  @Field((type) => String, { description: '文章狀態', nullable: false })
  @IsString()
  readonly status: StaticData

  @Prop({ required: true })
  @Field((type) => String, { description: '內文', nullable: true })
  @IsString()
  readonly body: string

  @Prop({ required: true })
  @Field((type) => String, { description: '作者', nullable: false })
  @IsString()
  readonly author: string

  @Prop({ required: true })
  @Field((type) => Date, { description: '刊登日', nullable: false })
  readonly date_posted: Date
}

export type PostDocument = Post & Document
export const PostSchema = SchemaFactory.createForClass(Post)
