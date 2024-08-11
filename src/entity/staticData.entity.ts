import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Field, ObjectType } from '@nestjs/graphql'
import { Document } from 'mongoose'
import { IsString } from 'class-validator'

@Schema()
@ObjectType()
export class StaticData extends Document {
  @Prop({ required: true })
  @Field((type) => String, { description: '資料分類' })
  @IsString()
  type: string

  @Prop({ required: true })
  @Field((type) => String, { description: '識別 Key' })
  @IsString()
  key: string

  @Prop({ required: true })
  @Field((type) => String, { description: '顯示值' })
  @IsString()
  value: string

  @Prop()
  @Field((type) => String, { description: '備註' })
  @IsString()
  description?: string
}

export type StaticDataDocument = StaticData & Document
export const StaticDataSchema = SchemaFactory.createForClass(StaticData)
