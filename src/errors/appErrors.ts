import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "./appError";

export function appErrors(
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Middleware Error - ", error);

  if (error instanceof ZodError) {
    return res
      .status(error.status || 400)
      .json({ message: JSON.parse(error.message)[0].message || "Server Error!" });
  }

  return res
    .status(error.status || 400)
    .json({ message: error.message || "Something went wrong!" });
}
