import { connectDB } from "../src/lib/mongodb";
import { ensureDonationIndexes } from "../src/features/donations/donations.index";

async function main() {
  try {
    await connectDB();

    await ensureDonationIndexes();

    console.log("Donation index setup completed");
  } catch (error) {
    console.error("Donation index setup failed:", error);
    process.exitCode = 1;
  } finally {
    await import("mongoose").then(({ default: mongoose }) =>
      mongoose.disconnect()
    );
  }
}

main();