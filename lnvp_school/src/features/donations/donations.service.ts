import { connectDB } from "@/lib/mongodb";
import { ApiError } from "@/lib/api/api-error";
import { ERROR_CODES } from "@/lib/api/error-codes";

import { findByTransactionNumber } from "./donations.repository";

export async function getDonationByTransactionNumber(
  transactionNumber: string
) {
  await connectDB();

  const donation = await findByTransactionNumber(transactionNumber);

  if (!donation) {
    throw new ApiError("Donation not found", {
      statusCode: 404,
      code: ERROR_CODES.DONATION_NOT_FOUND,
    });
  }

  return donation;
}