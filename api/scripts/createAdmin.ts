import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import AdminUser from "../models/AdminUser";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://neodevhub_db_user:fyma3XzyIkf1e34B@cluster0.jjkxwuz.mongodb.net/?appName=Cluster0");

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

// To run this script that adds admin to the DB:
// 1- cd api
// 2- npx ts-node scripts/createAdmin.ts
// check the connectd database