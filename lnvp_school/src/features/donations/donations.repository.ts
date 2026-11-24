// donations.repository.ts

import Donation from "./donations.model";

export async function createDonationRecord(data: {
  amount: number;
  transactionNumber: string;
  date: string;
}) {
  return Donation.create(data);
}

export async function findByTransactionNumber(
  transactionNumber: string
) {
  return Donation.findOne({ transactionNumber }).lean();
}

export async function findByTransactionNumbers(
  transactionNumbers: string[]
) {
  return Donation.find({
    transactionNumber: { $in: transactionNumbers },
  })
    .sort({ date: -1 })
    .lean();
}

export async function updateDonationRecord(
  id: string,
  data: Partial<{
    amount: number;
    transactionNumber: string;
    date: string;
  }>
) {
  return Donation.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
}