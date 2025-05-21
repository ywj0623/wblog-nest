import { ArgsType, Field } from '@nestjs/graphql'
import { IsString, IsEmail, MinLength, MaxLength, Equals } from 'class-validator'

@ArgsType()
export class CreateUserDTO {
  @Field((type) => String, { description: 'email', nullable: false })
  @IsEmail()
  @IsString()
  email: string

  @Field((type) => String, { description: '密碼', nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string

  @Field((type) => String, { description: '確認密碼', nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Equals('password', { message: '密碼不一致' })
  confirmPassword: string
}
