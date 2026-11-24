import { readJsonBody } from "@/lib/api/read-json-body";
import { handleApiError } from "@/lib/api/api-handler";
import { successResponse } from "@/lib/api/api-response";

import { verifyDonationSchema } from "@/features/donations/donations.validation";
import { verifyDonation } from "@/features/donations/donations.service";

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request);
    const input = verifyDonationSchema.parse(body);

    const result = await verifyDonation(input);

    return successResponse(
      result,
      result.verified
        ? "Donation record found"
        : "No matching donation record found"
    );
  } catch (error) {
    return handleApiError(error);
  }
}