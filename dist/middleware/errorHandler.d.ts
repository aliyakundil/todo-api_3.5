import type { Request, Response, NextFunction } from 'express';
interface ApiError extends Error {
    status?: number;
}
export declare function errorHandler(err: ApiError, req: Request, res: Response, next: NextFunction): void;
export declare function notFoundHandler(req: Request, res: Response): void;
export {};
//# sourceMappingURL=errorHandler.d.ts.map