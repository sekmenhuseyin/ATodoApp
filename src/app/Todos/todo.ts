export class Todo {
  id: number;
  title: string;
  complete: boolean;

  constructor(values: Todo) {
    Object.assign(this, values);
  }
}
