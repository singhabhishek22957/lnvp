import { hash } from "bcryptjs";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

import mongoose from "mongoose";

import { connectDB } from "../src/lib/mongodb";
import User from "../src/features/auth/user.model";

async function readHiddenPassword(): Promise<string> {
  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    throw new Error(
      "Password input requires an interactive terminal. Run with docker exec -it."
    );
  }

  stdout.write("Admin password: ");

  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");

  return new Promise((resolve, reject) => {
    let password = "";

    function cleanup() {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onData);
    }

    function onData(key: string) {
      if (key === "\u0003") {
        cleanup();
        stdout.write("\n");
        reject(new Error("Cancelled."));
        return;
      }

      if (key === "\r" || key === "\n") {
        cleanup();
        stdout.write("\n");
        resolve(password);
        return;
      }

      if (key === "\u007f" || key === "\b") {
        password = password.slice(0, -1);
        return;
      }

      if (key >= " ") {
        password += key;
      }
    }

    stdin.on("data", onData);
  });
}

async function main() {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  let name = "";
  let email = "";

  try {
    name = await rl.question("Admin name: ");
    email = (
      await rl.question("Admin email: ")
    ).trim().toLowerCase();
  } finally {
    rl.close();
  }

  const password = await readHiddenPassword();

  if (!name.trim() || !email || password.length < 12) {
    throw new Error(
      "Name and email are required; password must be at least 12 characters."
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  await connectDB();

  // Ensure the unique email index exists.
  await User.createIndexes();

  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await hash(password, 12);

  await User.create({
    name: name.trim(),
    email,
    passwordHash,
    role: "admin",
    isActive: true,
  });

  console.log("Admin account created successfully.");
}

main()
  .catch((error: unknown) => {
    console.error(
      "Admin creation failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });