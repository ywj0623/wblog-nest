import { ArgsType, Field, PartialType } from '@nestjs/graphql'
import { Schema } from 'mongoose'

@ArgsType()
export class CreateStaticDataDTO {
  @Field((type) => String, { description: '資料類別', nullable: false })
  type: string

  @Field((type) => String, { description: '識別 Key', nullable: false })
  key: string

  @Field((type) => String, { description: '顯示值', nullable: false })
  value: string

  @Field((type) => String, { description: '備註', nullable: true })
  description?: string
}

@ArgsType()
export class UpdateStaticDataDTO extends PartialType(CreateStaticDataDTO) {
  @Field((type) => String, { description: '分類 ID', nullable: false })
  _id: Schema.Types.ObjectId
}
