
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/admin-model.js";

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD;

    if (!mongoUri) {
      throw new Error("MONGO_URI is missing from your environment variables.");
    }

    if (!name || !email || !password) {
      throw new Error(
        "Missing ADMIN_NAME, ADMIN_EMAIL or ADMIN_PASSWORD."
      );
    }

    await mongoose.connect(mongoUri);

    console.log("Connected to MongoDB.");

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists. No changes made.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(`Admin created successfully: ${email}`);
  } catch (error) {
    console.error("Admin seeding failed:", error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

seedAdmin();
