export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(statusCode: number, message: string, code: string) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;

    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Conflict.") {
    super(409, message, "CONFLICT");
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad request.") {
    super(400, message, "BAD_REQUEST");
  }
}
