import mongoose, { Schema, Model } from "mongoose";

export interface IDonation {
  amount: number;
  transactionNumber: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new Schema<IDonation>(
  {
    amount: {
      type: Number,
      required: true,
      min: 0.01,
      max: 10_000_000,
    },

    transactionNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index 1: Unique transaction number
donationSchema.index(
  { transactionNumber: 1 },
  {
    unique: true,
    name: "unique_transaction_number",
  }
);

// Index 2: Sort donations by date
donationSchema.index(
  { date: -1 },
  {
    name: "donation_date_desc",
  }
);

const Donation: Model<IDonation> =
  mongoose.models.Donation ||
  mongoose.model<IDonation>("Donation", donationSchema);

export default Donation;