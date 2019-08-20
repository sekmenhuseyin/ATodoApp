import { TestBed, inject } from '@angular/core/testing';

import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

describe('TodoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    console.log('should be created');
    const service: TodoDataService = TestBed.get(TodoDataService);
    expect(service).toBeTruthy();
  });

  it('should return empty by default', inject([TodoDataService], (service: TodoDataService) => {
    console.log('should return empty by default');
    expect(service.getAll()).toEqual([]);
  }));

  it('should return all todos', inject([TodoDataService], (service: TodoDataService) => {
    console.log('should return all todos');
    const todo1 = new Todo({title: 'task 1', complete: false});
    const todo2 = new Todo({title: 'task 2', complete: true});
    service.add(todo1);
    service.add(todo2);
    expect(service.getAll()).toEqual([todo1, todo2]);
  }));

  it('should remove todo with the corresponding id', inject([TodoDataService], (service: TodoDataService) => {
    console.log('should remove todo with the corresponding id');
    const todo1 = new Todo({title: 'task 1', complete: false});
    const todo2 = new Todo({title: 'task 2', complete: true});
    service.add(todo1);
    service.add(todo2);
    expect(service.getAll()).toEqual([todo1, todo2]);
    // now delete first
    service.delete(1);
    expect(service.getAll()).toEqual([todo2]);
    // delete second
    service.delete(2);
    expect(service.getAll()).toEqual([]);
  }));

  it('should not removing anything if todo with corresponding id is not found', inject([TodoDataService], (service: TodoDataService) => {
    console.log('should not removing anything if todo with corresponding id is not found');
    const todo1 = new Todo({title: 'task 1', complete: false});
    const todo2 = new Todo({title: 'task 2', complete: true});
    service.add(todo1);
    service.add(todo2);
    expect(service.getAll()).toEqual([todo1, todo2]);
    // now delete first
    service.delete(3);
    expect(service.getAll()).toEqual([todo1, todo2]);
  }));

  it('should return todo with the corresponding id and updated data', inject([TodoDataService], (service: TodoDataService) => {
    console.log('should return todo with the corresponding id and updated data');
    const todo1 = new Todo({title: 'task 1', complete: false});
    const todo2 = new Todo({title: 'task 2', complete: true});
    service.add(todo1);
    service.add(todo2);
    expect(service.getAll()).toEqual([todo1, todo2]);
    const updated = service.update(new Todo({id: 2, title: 'task old'}));
    expect(updated.title).toEqual('task old');
  }));

  it('should return null if todo is not found', inject([TodoDataService], (service: TodoDataService) => {
    console.log('should return null if todo is not found');
    const todo1 = new Todo({title: 'task 1', complete: false});
    const todo2 = new Todo({title: 'task 2', complete: true});
    service.add(todo1);
    service.add(todo2);
    expect(service.getAll()).toEqual([todo1, todo2]);
    // get
    expect(service.get(3)).toEqual(null);
    // update
    const updated = service.update(new Todo({id: 4, title: 'task old'}));
    expect(updated).toEqual(null);
  }));

  it('should return the updated todo with inverse complete status', inject([TodoDataService], (service: TodoDataService) => {
    console.log('should return the updated todo with inverse complete status');
    const todo1 = new Todo({title: 'task 1', complete: false});
    service.add(todo1);
    // toggle complete
    let updated = service.toggle(1);
    expect(updated.complete).toEqual(true);
    expect(service.get(1)).toEqual(updated);
    // toggle complete
    updated = service.toggle(1);
    expect(updated.complete).toEqual(false);
    expect(service.get(1)).toEqual(updated);
  }));
});
