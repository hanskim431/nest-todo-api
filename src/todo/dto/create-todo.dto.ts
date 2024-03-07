import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: '$property 은 문자열 형식입니다.' })
  @MinLength(2, {
    message: '$property 은 최소 $constraint1 글자입니다.',
  })
  @MaxLength(50, {
    message: '$property 은 최대 $constraint1 글자입니다.',
  })
  title: string;

  @IsBoolean({
    message: '$property 은 불리언 형식입니다. 입력된 값 : $value',
  })
  isDone: boolean;
}
