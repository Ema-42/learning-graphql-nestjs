import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'First todo', done: false },
    { id: 2, description: 'Second todo', done: true },
    { id: 3, description: 'Third todo', done: false },
  ];

  create(createTodoDto: CreateTodoDto): Todo {
    console.log({ createTodoDto });
    const todo = new Todo();
    todo.id = this.todos.length + 1;
    todo.description = createTodoDto.description;
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.findOne(id);
    const { done, description } = updateTodoDto;
    if (done !== undefined) {
      todo.done = done;
    }
    if (description) {
      todo.description = description;
    }

    this.todos = this.todos.map((item) => (item.id === id ? todo : item));
    return todo;
  }

  remove(id: number) {
    this.findOne(id);
    this.todos = this.todos.filter((item) => item.id !== id);
  }
}
