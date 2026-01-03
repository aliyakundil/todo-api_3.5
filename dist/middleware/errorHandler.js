export function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    console.error("Error", {
        message: err.message,
        status,
        stack: err.stack
    });
    res.status(status).json({
        success: false,
        error: err.message
    });
}
export function notFoundHandler(req, res) {
    res.status(404).json({
        success: false,
        error: "Not Found!",
        message: `Route ${req.originalUrl} does not exist`,
    });
}
//# sourceMappingURL=errorHandler.js.map