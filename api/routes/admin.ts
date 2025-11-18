import express, { Request, Response, NextFunction } from "express";
import AdminUser from "../models/AdminUser"; // استخدم اسم الموديل الصحيح
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ContentModel from "../models/Content"; // استخدم اسم الموديل الصحيح


const router = express.Router();

interface AdminRequest extends Request {
  admin?: any;
}

// Middleware للتحقق من الأدمن
export const verifyAdmin = (req: AdminRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Add new content
router.post("/content", verifyAdmin, async (req, res) => {
  try {
    const { title, description, youtubeUrl, fileUrl } = req.body;
    const content = await ContentModel.create({ title, description, youtubeUrl, fileUrl });
    res.json({ message: "Content added", content });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// تسجيل دخول الأدمن
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const admin = await AdminUser.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
