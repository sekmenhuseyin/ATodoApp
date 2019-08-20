import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  // Placeholder for last id so we can simulate automatic incrementing of ids
  lastId = 0;

  // Placeholder for todos
  todos: Todo[] = [];

  constructor() { }

  // add new Todo
  add(todo: Todo): TodoDataService {
    console.log('add todo: ' + todo.title);
    if (!todo.id) {
      todo.id = ++this.lastId;
    }

    this.todos.push(todo);
    return this;
  }

  // delete Todo
  delete(id: number): TodoDataService {
    console.log('delete id: ' + id);
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  // update Todo
  update(values: Todo): Todo {
    const todo = this.get(values.id);
    if (todo === null) {
      return null;
    }

    console.log('update values: ' + values.id);
    Object.assign(todo, values);
    return todo;
  }

  // get all Todos
  getAll(): Todo[] {
    console.log('getAll');
    return this.todos;
  }

  // get one Todo
  get(id: number): Todo {
    console.log('get id: ' + id);
    const item = this.todos.filter(todo => todo.id === id);
    if (item.length === 0)    {
    return null;
    }

    return item.pop();
  }

  // toggle todo complete
  toggle(id: number): Todo {
    const todo = this.get(id);
    if (todo === null) {
      return null;
    }

    todo.complete = !todo.complete;
    return todo;
  }
}
