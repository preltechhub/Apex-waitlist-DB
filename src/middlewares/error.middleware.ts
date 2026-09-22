import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/api-error.js";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  if (error instanceof ZodError) {
    console.warn("Validation error:", error.flatten());

    res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      message: "Invalid request data.",
      errors: error.flatten(),
    });

    return;
  }

  if (error instanceof ApiError) {
    console.warn(`${error.statusCode} ${error.code}: ${error.message}`);

    res.status(error.statusCode).json({
      success: false,
      code: error.code,
      message: error.message,
    });

    return;
  }

  console.error("Unhandled application error:", error);

  res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong while processing your request.",
  });
};
