import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import AdminUser from "../models/AdminUser";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/learn-arabic");

  const username = "admin";
  const password = "admin123";

  const existing = await AdminUser.findOne({ username });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = new AdminUser({ username, passwordHash });
  await admin.save();

  console.log("Admin created:", username);
  process.exit(0);
};

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
