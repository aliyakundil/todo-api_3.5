import express from 'express';
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";
import { compose } from 'node:stream';
const app = express();
const PORT = 3000;
app.get('/', (_req, res) => {
    res.json({
        name: 'TODO API',
        version: '1.0.0',
        links: {
            api: "/api",
            health: "api/health",
            todos: "/api/todos"
        }
    });
});
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log("Server started on port 3000");
});
//# sourceMappingURL=server.js.map