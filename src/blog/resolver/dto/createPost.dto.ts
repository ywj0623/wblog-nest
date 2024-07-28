import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreatePostDTO {
  @Field((type) => String, {
    description: '文章標題',
  })
  title: string

  @Field((type) => String, {
    description: '文章簡介',
  })
  description?: string

  @Field((type) => String, {
    description: '內文',
  })
  body: string

  @Field((type) => String, {
    description: '作者',
  })
  author: string

  @Field((type) => Date, {
    description: '刊登日',
  })
  date_posted: Date
}
