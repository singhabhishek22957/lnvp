import type { Types } from "mongoose";

export interface Donation {
  _id: Types.ObjectId;
  amount: number;
  transactionNumber: string;
  date: string; // YYYY-MM-DD
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDonationInput {
  amount: number;
  transactionNumber: string;
  date: string;
}

export interface UpdateDonationInput {
  amount?: number;
  transactionNumber?: string;
  date?: string;
}

export interface VerifyDonationInput {
  transactionNumber: string;
  date: string;
}

export interface PublicDonationVerification {
  verified: boolean;
  amount?: number;
  transactionNumber?: string;
  date?: string;
}