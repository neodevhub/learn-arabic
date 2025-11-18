import express from "express";
import ContentModel, { IContent } from "../models/Content";

const router = express.Router();

// Get all content
router.get("/", async (req, res) => {
  try {
    const contents = await ContentModel.find().sort({ createdAt: -1 }).lean<IContent>();
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get content by ID
router.get("/:id", async (req, res) => {
  try {
    const content = await ContentModel.findById(req.params.id).lean<IContent>();
    if (!content) return res.status(404).json({ message: "Not found" });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
