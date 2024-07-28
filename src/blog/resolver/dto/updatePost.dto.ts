import { CreatePostDTO } from './createPost.dto'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { Schema as MongooseSchema } from 'mongoose'

@InputType()
export class UpdatePostDTO extends PartialType(CreatePostDTO) {
  @Field((type) => String)
  _id: MongooseSchema.Types.ObjectId
}
