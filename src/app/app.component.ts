import { TodoDataService } from './Todos/todo-data.service';
import { Component } from '@angular/core';
import { Todo } from './Todos/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [TodoDataService]
})
export class AppComponent {

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoDataService`
  // and assign it to a property called `todoDataService`
  constructor(private todoDataService: TodoDataService) {
  }

  newTodo: Todo = new Todo(null);

  // Service is now available as this.todoDataService
  toggleTodoComplete(todo: Todo) {
    this.todoDataService.toggle(todo.id);
  }

  addTodo() {
    this.todoDataService.add(this.newTodo);
    this.newTodo = new Todo(null);
  }

  removeTodo(todo: Todo) {
    this.todoDataService.delete(todo.id);
  }

  get todos() {
    return this.todoDataService.getAll();
  }
}
