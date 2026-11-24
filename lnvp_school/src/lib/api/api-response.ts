
import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api-response";
import type { ErrorCode } from "./error-codes";

export function successResponse<T>(
  data: T,
  message = "Request successful",
  statusCode = 200,
) {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };

  return NextResponse.json(response, {
    status: statusCode,
  });
}

export function errorResponse(
  message: string,
  code: ErrorCode,
  statusCode = 500,
  details?: unknown,
) {
  const response: ApiResponse<never> = {
    success: false,
    message,
    error: {
      code,
      ...(details !== undefined ? { details } : {}),
    },
  };

  return NextResponse.json(response, {
    status: statusCode,
  });
}
