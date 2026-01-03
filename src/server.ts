import express from "express";
import todosRouter from "./routes/todos";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/todos", todosRouter);

app.get("/", (_req, res) => {
  res.json({
    name: "TODO API",
    version: "1.0.0",
    links: {
      api: "/api",
      health: "api/health",
      todos: "/api/todos",
    },
  });
});

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
