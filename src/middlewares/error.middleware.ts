import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/api-error.js";

interface BodyParserJsonError extends SyntaxError {
  status: number;
  type: "entity.parse.failed";
}

function isBodyParserJsonError(error: unknown): error is BodyParserJsonError {
  if (!(error instanceof SyntaxError)) {
    return false;
  }

  if (typeof error !== "object" || error === null) {
    return false;
  }

  if (!("status" in error) || !("type" in error)) {
    return false;
  }

  const status = (error as { status?: unknown }).status;
  const type = (error as { type?: unknown }).type;

  return status === 400 && type === "entity.parse.failed";
}

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  /*
   * Malformed JSON request body.
   *
   * Example:
   * {
   *   "email": "test@example.com"
   *   "phone": "08000000000"
   * }
   *
   * Missing comma → body-parser rejects the request.
   */
  if (isBodyParserJsonError(error)) {
    console.warn("Invalid JSON request body.");

    res.status(400).json({
      success: false,
      code: "INVALID_JSON",
      message: "Request body contains invalid JSON.",
    });

    return;
  }

  /*
   * Zod runtime validation failure.
   */
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

  /*
   * Expected application-level errors.
   *
   * Example:
   * 409 CONFLICT
   */
  if (error instanceof ApiError) {
    console.warn(`${error.statusCode} ${error.code}: ${error.message}`);

    res.status(error.statusCode).json({
      success: false,
      code: error.code,
      message: error.message,
    });

    return;
  }

  /*
   * Anything we did not explicitly anticipate.
   *
   * This is the only category where we log
   * the complete error object.
   */
  console.error("Unhandled application error:", error);

  res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong while processing your request.",
  });
};
