import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Título del todo' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  description: string;
}
