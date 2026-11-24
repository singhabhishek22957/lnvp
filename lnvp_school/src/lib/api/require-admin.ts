import { auth } from "@/auth";
import { ApiError } from "@/lib/api/api-error";
import { ERROR_CODES } from "@/lib/api/error-codes";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    throw new ApiError("Authentication required", {
      statusCode: 401,
      code: ERROR_CODES.UNAUTHORIZED,
    });
  }

  if (session.user.role !== "admin") {
    throw new ApiError("You are not authorized", {
      statusCode: 403,
      code: ERROR_CODES.FORBIDDEN,
    });
  }

  return session.user;
}