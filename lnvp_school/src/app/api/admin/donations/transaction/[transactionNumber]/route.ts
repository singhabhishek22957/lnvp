import { requireAdmin } from "@/lib/api/require-admin";
import { handleApiError } from "@/lib/api/api-handler";
import { successResponse } from "@/lib/api/api-response";

import { getDonationByTransactionNumber } from "@/features/donations/donations.service";

interface RouteContext {
  params: Promise<{ transactionNumber: string }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { transactionNumber } = await context.params;

    const donation = await getDonationByTransactionNumber(
      transactionNumber
    );

    return successResponse(
      donation,
      "Donation retrieved successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}