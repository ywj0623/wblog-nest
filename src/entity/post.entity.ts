import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectType, Field } from '@nestjs/graphql'
import { Document, Schema as MongooseSchema, Types } from 'mongoose'
import { IsString, IsJSON } from 'class-validator'
import { StaticData } from './staticData.entity'

@Schema({ timestamps: { createdAt: 'date_created', updatedAt: 'date_updated' } })
@ObjectType()
export class Post extends Document {
  @Field(() => String, { description: '文章 ID', nullable: false })
  _id: MongooseSchema.Types.ObjectId

  @Prop({ required: true })
  @Field(() => String, { description: '文章標題', nullable: false })
  @IsString()
  title: string

  @Prop()
  @Field(() => String, { description: '文章簡介', nullable: true })
  @IsString()
  description?: string

  // @Prop({
  //   required: true,
  //   type: Types.ObjectId,
  //   ref: 'StaticData',
  // })
  // @Field(() => String, { description: '分類', nullable: false })
  // @IsString()
  // readonly category: StaticData

  // @Prop({
  //   required: true,
  //   default: 'draft',
  //   type: Types.ObjectId,
  //   ref: 'StaticData',
  // })
  // @Field(() => String, { description: '文章狀態', nullable: false })
  // @IsString()
  // readonly status: StaticData

  @Prop({ required: true })
  @Field(() => String, { description: '內文', nullable: true })
  @IsJSON()
  body: string

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => String, { description: '作者', nullable: false })
  author: MongooseSchema.Types.ObjectId

  @Field(() => Date, { description: '刊登日', nullable: false })
  date_created: Date

  @Field(() => Date, { description: '最後更新日', nullable: true })
  date_updated?: Date
}

export type PostDocument = Post & Document
export const PostSchema = SchemaFactory.createForClass(Post)
