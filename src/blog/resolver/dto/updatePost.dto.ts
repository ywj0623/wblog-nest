import { CreatePostDTO } from './createPost.dto'
import { ArgsType, Field, PartialType } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose'

@ArgsType()
export class UpdatePostDTO extends PartialType(CreatePostDTO) {
  @Field((type) => String, { description: '文章 ID', nullable: false })
  _id: MongooseSchema.Types.ObjectId
}
