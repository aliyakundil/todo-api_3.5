export interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export let nextId = 1;

export const todos: Todo[] = [
  {
    id: nextId++,
    text: "Learn TypeScript",
    description: "Finish the TODO API",
    completed: false,
    priority: "high",
    dueDate: new Date("2024-12-31"),
    createdAt: new Date("2024-01-01"),
  },
  {
    id: nextId++,
    text: "Build API",
    description: "Finish the TODO API",
    completed: true,
    priority: "medium",
    dueDate: new Date("2023-12-31"),
    createdAt: new Date("2024-01-02"),
  },
  {
    id: nextId++,
    text: "Write tests",
    description: "Finish the TODO API",
    completed: false,
    priority: "low",
    dueDate: new Date("2026-01-03"),
    createdAt: new Date("2024-01-03"),
  },
];

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      meta?: {
        total: number;
        page: number;
        limit: number;
        totalPage: number;
      };
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
  priority?: string;
  search?: string;
  sort?: string;
}

export interface CreateTodoInput {
  text: string;
  description: string;
  priority?: "low" | "medium" | "high";
  dueDate: Date;
  completed?: string | boolean;
}

export interface UpdateTodoInput {
  text: string;
  description: string;
  priority?: "low" | "medium" | "high";
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
      if (!item.text.toLowerCase().includes(options.search.toLowerCase()))
        return false;
    }

    return true;
  });

  if (options.sort) {
    const sortField = options.sort as keyof Todo;
    todo.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === undefined) return 1;
      if (bVal === undefined) return -1;

      if (sortField === "priority") {
        const order = { low: 1, medium: 2, high: 3 };
        return (
          order[aVal as keyof typeof order] - order[bVal as keyof typeof order]
        );
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return aVal - bVal;
      }

      if (aVal instanceof Date && bVal instanceof Date) {
        return aVal.getTime() - bVal.getTime();
      }

      return 0;
    });
  }

  const start = (page - 1) * limit;
  const paged = todo.slice(start, start + limit);

  return {
    todo: paged,
    meta: {
      total: todo.length,
      page: page,
      limit: limit,
      totalPage: Math.ceil(todo.length / limit),
    },
  };
}

export function getTodoById(id: number): Todo | null {
  return todos.find((todo) => todo.id === id) ?? null;
}

export function createTodo(input: CreateTodoInput): Todo {
  const newTodo = {
    id: nextId++,
    text: input.text.trim(),
    description: input.description.trim(),
    completed: input.completed === "true" || input.completed === "false",
    priority: input.priority ?? "low",
    dueDate: input.dueDate,
    createdAt: new Date(),
  };
  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(id: number, input: UpdateTodoInput): Todo | null {
  const todoUpdate = todos.find((item) => item.id === id);

  if (!todoUpdate) return null;

  if (input.text !== undefined) todoUpdate.text = input.text.trim();

  if (input.completed !== undefined)
    todoUpdate.completed =
      typeof input.completed === "string"
        ? input.completed === "true"
        : input.completed;

  if (input.priority !== undefined) todoUpdate.priority = input.priority;

  todoUpdate.updatedAt = new Date();

  return todoUpdate;
}

export function patchTodo(id: number, input: UpdateTodoInput): Todo | null {
  const todoUpdate = todos.find((item) => item.id === id);

  if (!todoUpdate) return null;

  if (input.text !== undefined) todoUpdate.text = input.text.trim();

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
