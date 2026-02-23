import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => String, { description: 'Título del todo', nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  description?: string;

  @Field(() => Boolean, { description: 'estado de concluido', nullable: true })
  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @Field(() => Int, { description: 'ID del todo' })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
