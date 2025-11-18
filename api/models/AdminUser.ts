import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const AdminUserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

// Method لمقارنة كلمة السر
AdminUserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.passwordHash);
};

export default models.AdminUser || model("AdminUser", AdminUserSchema);
