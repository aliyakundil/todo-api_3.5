import type { Request, Response, NextFunction, RequestHandler } from 'express';
export declare function validateCreateTodo(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function validateUpdateTodo(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function validateTodoId(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function validateTodoQuery(req: Request, res: Response, next: NextFunction): void;
export declare const validateAndHandle: (validators: RequestHandler[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validation.d.ts.map