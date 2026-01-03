import { Router } from 'express';
import { validateAndHandle, validateTodoQuery } from "@/middleware/validation";
const router = Router();
router.get('/', validateAndHandle([validateTodoQuery]));
//# sourceMappingURL=todos.js.map