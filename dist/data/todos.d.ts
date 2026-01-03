interface Todo {
    id: number;
    text: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    createdAt: Date;
    updatedAt?: Date;
}
export declare let nextId: number;
export declare let todos: Todo[];
export type ApiResponse<T> = {
    success: true;
    date: T;
    meta?: {
        total: number;
        page: number;
        limit: number;
        totalPage: number;
    };
} | {
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
}
export {};
//# sourceMappingURL=todos.d.ts.map