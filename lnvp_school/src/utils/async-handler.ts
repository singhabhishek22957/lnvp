
import { handleApiError } from "@/lib/api/api-handler";

type AsyncRouteHandler<T extends unknown[]> = (
  ...args: T
) => Promise<Response>;

export function asyncHandler<T extends unknown[]>(
  handler: AsyncRouteHandler<T>,
): (...args: T) => Promise<Response> {
  return async (...args: T) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
