import { ArgsType, Field } from '@nestjs/graphql'
import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator'

@ArgsType()
export class CreateUserDTO {
  @Field((type) => String, { description: '使用者名稱', nullable: false })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string

  @Field((type) => String, { description: 'email', nullable: false })
  @IsEmail()
  @IsString()
  email: string

  @Field((type) => String, { description: '密碼', nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string
}
