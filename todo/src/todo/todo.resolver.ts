import { TodoService } from './todo.service';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './args/status.args';
import { AgregationType } from './types/agregation.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], {
    description: 'Devolver todos los todo',
    name: 'todos',
  })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, {
    description: 'Devolver un todo por su ID',
    name: 'todoById',
  })
  findOne(@Args('id', { type: () => Int }) id: number): Todo | null {
    return this.todoService.findOne(id);
  }
  @Mutation(() => Todo, {
    description: 'Crear un nuevo todo',
    name: 'createTodo',
  })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, {
    description: 'Actualizar un todo',
    name: 'updateTodo',
  })
  updatedTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean, {
    description: 'Eliminar un todo',
    name: 'deleteTodo',
  })
  deleteTodo(@Args('id', { type: () => Int }) id: number): boolean {
    return this.todoService.delete(id);
  }

  //Agregations
  @Query(() => Int, {
    description: 'Contar el número total de todos',
    name: 'totalTodos',
  })
  totalTodos(): number {
    return this.todoService.getTotalTodos();
  }

  @Query(() => Int, {
    description: 'Contar el número de todos completados',
    name: 'completedTodos',
  })
  completedTodos(): number {
    return this.todoService.getCompletedTodos();
  }

  @Query(() => Int, {
    description: 'Contar el número de todos pendientes',
    name: 'pendingTodos',
  })
  pendingTodos(): number {
    return this.todoService.getPendingTodos();
  }

  @Query(() => AgregationType, {
    description: 'Obtener estadísticas de todos',
    name: 'todosAgregation',
  })
  todosAgregation(): AgregationType {
    return {
      total: this.todoService.getTotalTodos(),
      completed: this.todoService.getCompletedTodos(),
      pending: this.todoService.getPendingTodos(),
      totalTodoCompleted: this.todoService.getCompletedTodos(),
    };
  }
}
