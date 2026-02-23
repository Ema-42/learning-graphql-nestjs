import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  done: boolean = false;
}
