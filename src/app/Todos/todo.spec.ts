import { Todo } from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo(null)).toBeTruthy();
  });

  it('should accept values from constructor', () => {
    const todo = new Todo({
      title: 'hello world',
      complete: true
    });
    expect(todo).toBeTruthy();
    expect(todo.title).toEqual('hello world');
    expect(todo.complete).toEqual(true);
  });

});
