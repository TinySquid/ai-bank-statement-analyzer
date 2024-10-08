import { Request, Response, NextFunction } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.status || 500;

  console.error(err);

  const response = {
    error: true,
    message: errorMessage(err),
  };

  res.status(statusCode).json(response);
}

function errorMessage(err: any) {
  if (process.env.NODE_ENV === "development") {
    return `${err.message}\n ${err.stack}`;
  }
  return "An error occurred.";
}

export default errorHandler;
