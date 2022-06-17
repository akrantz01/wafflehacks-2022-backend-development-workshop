export interface ReducedList {
  id: number;
  name: string;
}

export interface List extends ReducedList {
  todos: ReducedTodo[];
}

export type TagList = string[];

export interface Tag {
  name: string;
  todos: ReducedTodo[];
}

export interface ReducedTodo {
  id: number;
  summary: string;
  complete: boolean;
  tags: string[];
}

export interface Todo extends ReducedTodo {
  description: string;
  list_id: number | null;
}
