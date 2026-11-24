import { requireAdmin } from "@/lib/api/require-admin";
import { readJsonBody } from "@/lib/api/read-json-body";
import { handleApiError } from "@/lib/api/api-handler";
import { successResponse } from "@/lib/api/api-response";

import { updateDonationSchema } from "@/features/donations/donations.validation";
import { updateDonation } from "@/features/donations/donations.service";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await context.params;
    const body = await readJsonBody(request);
    const input = updateDonationSchema.parse(body);

    const donation = await updateDonation(id, input);

    return successResponse(
      donation,
      "Donation updated successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}