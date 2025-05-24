import { ArgsType, Field } from '@nestjs/graphql'
import { IsString, IsEmail, MinLength, MaxLength, Validate } from 'class-validator'

// 自定義驗證器來檢查密碼是否一致
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'

@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class PasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as CreateUserDTO
    return object.password === confirmPassword
  }

  defaultMessage() {
    return '密碼不一致'
  }
}

@ArgsType()
export class CreateUserDTO {
  @Field(() => String, { description: 'email', nullable: false })
  @IsEmail()
  @IsString()
  email: string

  @Field(() => String, { description: '密碼', nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string

  @Field(() => String, { description: '確認密碼', nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Validate(PasswordMatchConstraint)
  confirmPassword: string
}
