import { Schema, model, Document, models } from "mongoose";

export interface IContent extends Document {
  title: string;
  description?: string;
  youtubeUrl?: string;
  fileUrl: string;
  createdAt: Date;
}

const ContentSchema = new Schema<IContent>({
  title: { type: String, required: true },
  description: { type: String },
  youtubeUrl: { type: String },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Content || model<IContent>("Content", ContentSchema);
