import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/api/require-admin";
import { readJsonBody } from "@/lib/api/read-json-body";
import { handleApiError } from "@/lib/api/api-handler";
import { successResponse } from "@/lib/api/api-response";

import { createDonationSchema } from "@/features/donations/donations.validation";
import { createDonation } from "@/features/donations/donations.service";

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await readJsonBody(request);
    const input = createDonationSchema.parse(body);

    const donation = await createDonation(input);

    return successResponse(
      donation,
      "Donation created successfully",
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}