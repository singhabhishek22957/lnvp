import { z } from "zod";

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);

    return (
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    );
  }, "Invalid calendar date");

const transactionNumberSchema = z
  .string()
  .trim()
  .min(6, "Transaction number must contain at least 6 characters")
  .max(100, "Transaction number is too long");

export const createDonationSchema = z.object({
  amount: z.number().positive().max(10_000_000),
  transactionNumber: transactionNumberSchema,
  date: dateSchema,
});

export const updateDonationSchema = z
  .object({
    amount: z.number().positive().max(10_000_000).optional(),
    transactionNumber: transactionNumberSchema.optional(),
    date: dateSchema.optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field is required"
  );

export const verifyDonationSchema = z.object({
  transactionNumber: transactionNumberSchema,
  date: dateSchema,
});

export const searchDonationsSchema = z.object({
  transactionNumbers: z
    .array(transactionNumberSchema)
    .min(1, "Provide at least one transaction number")
    .max(100, "You can search up to 100 transaction numbers at once"),
});

export type CreateDonationInput = z.infer<
  typeof createDonationSchema
>;

export type UpdateDonationInput = z.infer<
  typeof updateDonationSchema
>;

export type VerifyDonationInput = z.infer<
  typeof verifyDonationSchema
>;

export type SearchDonationsInput = z.infer<
  typeof searchDonationsSchema
>;