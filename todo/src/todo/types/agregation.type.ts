import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AgregationType {
  @Field(() => Number)
  total: number;
  @Field(() => Number)
  completed: number;
  @Field(() => Number)
  pending: number;
  @Field(() => Number, { deprecationReason: 'totalTodoCompleted no debe usarse ' })
  totalTodoCompleted: number;
}
