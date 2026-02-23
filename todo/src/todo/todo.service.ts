import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.dto';
import { UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Primer todo', done: false },
    { id: 2, description: 'Segundo todo', done: true },
    { id: 3, description: 'Tercer todo', done: false },
    { id: 4, description: 'Cuarto todo', done: true },
  ];

  getTotalTodos(): number {
    return this.todos.length;
  }

  getCompletedTodos(): number {
    return this.todos.filter((todo) => todo.done).length;
  }

  getPendingTodos(): number {
    return this.todos.filter((todo) => !todo.done).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    if (statusArgs.done !== undefined) {
      return this.todos.filter((todo) => todo.done === statusArgs.done);
    }
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.id = this.todos.length + 1;
    todo.description = createTodoInput.description;
    todo.done = false;
    this.todos.push(todo);

    return todo;
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;
    const todo = this.findOne(id);
    if (description) {
      todo.description = description;
    }
    if (done !== undefined) {
      todo.done = done;
    }
    this.todos = this.todos.map((t) => (t.id === id ? todo : t));
    return todo;
  }

  delete(id: number): boolean {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return true;
  }
}
