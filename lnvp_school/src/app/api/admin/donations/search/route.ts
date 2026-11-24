import { requireAdmin } from "@/lib/api/require-admin";
import { readJsonBody } from "@/lib/api/read-json-body";
import { handleApiError } from "@/lib/api/api-handler";
import { successResponse } from "@/lib/api/api-response";

import { searchDonationsSchema } from "@/features/donations/donations.validation";
import { searchDonations } from "@/features/donations/donations.service";

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await readJsonBody(request);
    const input = searchDonationsSchema.parse(body);

    const donations = await searchDonations(
      input.transactionNumbers
    );

    return successResponse(
      {
        donations,
        total: donations.length,
      },
      "Donation search completed"
    );
  } catch (error) {
    return handleApiError(error);
  }
}