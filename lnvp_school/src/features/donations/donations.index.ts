import Donation from "./donations.model";

export async function ensureDonationIndexes() {
  await Donation.createIndexes();

  console.log("Donation indexes ensured successfully");
}