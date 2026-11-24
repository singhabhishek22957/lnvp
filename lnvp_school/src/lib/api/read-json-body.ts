import { ApiError } from "@/lib/api/api-error";
import { ERROR_CODES } from "@/lib/api/error-codes";

export async function readJsonBody<T = unknown>(
  request: Request
): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new ApiError("Invalid JSON request body", {
      statusCode: 400,
      code: ERROR_CODES.BAD_REQUEST,
    });
  }
}