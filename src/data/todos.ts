export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export let nextId = 1;

export const todos: Todo[] = [
  {
    id: nextId++,
    title: "Learn TypeScript",
    description: "Finish the TODO API",
    completed: false,
    priority: Priority.High,
    dueDate: new Date("2024-12-31"),
    createdAt: new Date("2024-01-01"),
  },
  {
    id: nextId++,
    title: "Build API",
    description: "Finish the TODO API",
    completed: true,
    priority: Priority.Medium,
    dueDate: new Date("2023-12-31"),
    createdAt: new Date("2024-01-02"),
  },
  {
    id: nextId++,
    title: "Write tests",
    description: "Finish the TODO API",
    completed: false,
    priority: Priority.Low,
    dueDate: new Date("2026-01-03"),
    createdAt: new Date("2024-01-03"),
  },
];

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
      details?: string[];
    };

export interface PaginationQuery {
  page?: string;
  limit?: string;
  completed?: string;
  priority?: Priority;
  search?: string;
  sort?: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: Date;
  completed?: string | boolean;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  priority?: Priority;
  dueDate?: Date;
  completed?: string | boolean;
}

export function getTodos(options: PaginationQuery) {
  const page = options.page ? Number(options.page) : 1;
  const limit = options.limit ? Number(options.limit) : 10;

  let completedFilter: boolean | undefined;

  if (options.completed !== undefined) {
    completedFilter = options.completed === "true";
  }

  const todo = todos.filter((item) => {
    if (completedFilter !== undefined)
      if (item.completed !== completedFilter) return false;

    if (options.priority !== undefined)
      if (item.priority !== options.priority) return false;

    if (options.search) {
      if (!item.title.toLowerCase().includes(options.search.toLowerCase()))
        return false;
    }

    return true;
  });

  if (options.sort === "createdAt" || options.sort === "dueDate") {
    todo.sort((a, b) => {
      const sortField = options.sort as "createdAt" | "dueDate";
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (!aVal) return 1;
      if (!bVal) return -1;

      if (aVal instanceof Date && bVal instanceof Date) {
        return aVal.getTime() - bVal.getTime();
      }

      return 0;
    });
  }

  const start = (page - 1) * limit;
  const paged = todo.slice(start, start + limit);

  return {
    todos: paged,
    total: todos.length,
    filtered: todo.length,
  };
}

export function getTodoById(id: number): Todo | null {
  return todos.find((todo) => todo.id === id) ?? null;
}

export function createTodo(input: CreateTodoInput): Todo {
  const newTodo: Todo = {
    id: nextId++,
    title: input.title.trim(),
    completed: typeof input.completed === "string"
    ? input.completed === "true"
    : input.completed ?? false,
    priority: input.priority ?? Priority.Low,
    createdAt: new Date(),
  };
  if (input.dueDate) {
    newTodo.dueDate = input.dueDate;
  }
  if (input.description) {
    newTodo.description = input.description?.trim();
  }
  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(id: number, input: UpdateTodoInput): Todo | null {
  const todoUpdate = todos.find((item) => item.id === id);

  if (!todoUpdate) return null;

  if (input.title !== undefined) todoUpdate.title = input.title.trim();
  if (input.description !== undefined)
    todoUpdate.description = input.description.trim();
  if (input.completed !== undefined)
    todoUpdate.completed =
      typeof input.completed === "string"
        ? input.completed === "true"
        : input.completed;

  if (input.priority !== undefined) todoUpdate.priority = input.priority;
  if (input.dueDate !== undefined) todoUpdate.dueDate = input.dueDate;

  todoUpdate.updatedAt = new Date();

  return todoUpdate;
}

export function patchTodo(id: number, input: UpdateTodoInput): Todo | null {
  const todoUpdate = todos.find((item) => item.id === id);

  if (!todoUpdate) return null;

  if (input.title !== undefined) todoUpdate.title = input.title.trim();

  if (input.completed !== undefined)
    todoUpdate.completed =
      typeof input.completed === "string"
        ? input.completed === "true"
        : input.completed;

  if (input.priority !== undefined) todoUpdate.priority = input.priority;

  todoUpdate.updatedAt = new Date();

  return todoUpdate;
}

export function deleteTodo(id: number) {
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) return false;

  todos.splice(index, 1);

  return true;
}
