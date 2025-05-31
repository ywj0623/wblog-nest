import { ArgsType, Field, PartialType } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose'
import { IsString, IsOptional, IsNotEmpty } from 'class-validator'

@ArgsType()
export class CreatePostDTO {
  @Field({ description: '文章標題', nullable: false })
  @IsString()
  @IsNotEmpty()
  title: string

  @Field({ description: '文章簡介', nullable: true })
  @IsString()
  @IsOptional()
  description?: string

  // @Field(() => String, { description: '文章分類', nullable: false })
  // category: string

  @Field({ description: '內文', nullable: true })
  @IsString()
  @IsOptional()
  body: string
}

@ArgsType()
export class UpdatePostDTO extends PartialType(CreatePostDTO) {
  @Field(() => String, { description: '文章 ID', nullable: false })
  _id: MongooseSchema.Types.ObjectId
}
