import { Request, Response, NextFunction } from "express";
import { isHttpError } from "http-errors";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (isHttpError(err)) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: "Internal Server Error" });
}
