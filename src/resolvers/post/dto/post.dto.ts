import { ArgsType, Field, PartialType } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose'

@ArgsType()
export class CreatePostDTO {
  @Field((type) => String, { description: '文章標題', nullable: false })
  title: string

  @Field((type) => String, { description: '文章簡介', nullable: true })
  description?: string

  @Field((type) => String, { description: '文章分類', nullable: false })
  category: string

  @Field((type) => String, { description: '內文', nullable: true })
  body: string

  @Field((type) => String, { description: '作者', nullable: false })
  author: string

  @Field((type) => Date, { description: '刊登日', nullable: false })
  date_posted: Date
}

@ArgsType()
export class UpdatePostDTO extends PartialType(CreatePostDTO) {
  @Field((type) => String, { description: '文章 ID', nullable: false })
  _id: MongooseSchema.Types.ObjectId
}
