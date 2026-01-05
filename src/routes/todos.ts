import { Router } from "express";
import type { Request, Response } from "express";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
  type Todo,
  type ApiResponse,
  type PaginationQuery,
} from "@/data/todos";
import {
  validateAndHandle,
  validateTodoQuery,
  validateTodoId,
  validateCreateTodo,
  validateUpdateTodo,
} from "@/middleware/validation";

const router = Router();

router.get(
  "/",
  validateAndHandle([validateTodoQuery]),
  (req: Request, res: Response) => {
    const { todos, total, filtered } = getTodos(
      req.query as unknown as PaginationQuery,
    );
    res.json({
      todos,
      total,
      filtered,
    });
  },
);

router.get(
  "/:id",
  validateAndHandle([validateTodoId]),
  (req: Request, res: Response<ApiResponse<Todo>>) => {
    const id = Number(req.params.id);
    const todo = getTodoById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    res.json({
      success: true,
      data: todo,
    });
  },
);

router.post(
  "/",
  validateAndHandle([validateCreateTodo]),
  (req: Request, res: Response<ApiResponse<Todo>>) => {
    const todo = createTodo(req.body);

    res.status(201).json({
      success: true,

      data: todo,
    });
  },
);

router.put(
  "/:id",
  validateAndHandle([validateTodoId, validateUpdateTodo]),
  (req: Request, res: Response<ApiResponse<Todo>>) => {
    const id = Number(req.params.id);
    const update = updateTodo(id, req.body);

    if (!update) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    res.json({
      success: true,
      data: update,
    });
  },
);

router.patch(
  "/:id",
  validateAndHandle([validateUpdateTodo]),
  (req: Request, res: Response<ApiResponse<Todo>>) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid id",
      });
    }

    const update = patchTodo(id, req.body);

    if (!update) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    res.json({
      success: true,
      data: update,
    });
  },
);

router.delete(
  "/:id",
  validateAndHandle([validateTodoId]),
  (req: Request, res: Response<ApiResponse<null>>) => {
    const id = Number(req.params.id);
    const deleted = deleteTodo(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    res.status(204).json({
      success: true,
      data: null,
    });
  },
);

export default router;
