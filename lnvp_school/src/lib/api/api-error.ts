
import type { ErrorCode } from "./error-codes";

interface ApiErrorOptions {
  statusCode: number;
  code: ErrorCode;
  details?: unknown;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: unknown;

  constructor(
    message: string,
    options: ApiErrorOptions,
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = options.statusCode;
    this.code = options.code;
    this.details = options.details;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
