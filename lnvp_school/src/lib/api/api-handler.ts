
import { ZodError } from "zod";

import { ApiError } from "./api-error";
import { ERROR_CODES } from "./error-codes";
import { errorResponse } from "./api-response";

export function handleApiError(error: unknown) {
  // Validation errors
  if (error instanceof ZodError) {
    return errorResponse(
      "Validation failed",
      ERROR_CODES.VALIDATION_ERROR,
      400,
      error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    );
  }

  // Known application errors
  if (error instanceof ApiError) {
    return errorResponse(
      error.message,
      error.code,
      error.statusCode,
      error.details,
    );
  }

  // Unknown errors: log internally, hide details from clients.
  console.error("[API_ERROR]", error);

  return errorResponse(
    "An unexpected error occurred",
    ERROR_CODES.INTERNAL_SERVER_ERROR,
    500,
  );
}
