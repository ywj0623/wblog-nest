import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreatePostDTO {
  @Field((type) => String, { description: '文章標題', nullable: false })
  title: string

  @Field((type) => String, { description: '文章簡介', nullable: true })
  description?: string

  @Field((type) => String, { description: '內文', nullable: true })
  body: string

  @Field((type) => String, { description: '作者', nullable: false })
  author: string

  @Field((type) => Date, { description: '刊登日', nullable: false })
  date_posted: Date
}
