export let nextId = 1;
export let todos = [
    {
        id: nextId++,
        text: "Learn TypeScript",
        completed: false,
        priority: "high",
        createdAt: new Date("2024-01-01"),
    },
    {
        id: nextId++,
        text: "Build API",
        completed: true,
        priority: "medium",
        createdAt: new Date("2024-01-02"),
    },
    {
        id: nextId++,
        text: "Write tests",
        completed: false,
        priority: "low",
        createdAt: new Date("2024-01-03"),
    },
];
//# sourceMappingURL=todos.js.map