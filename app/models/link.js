import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    url: String,
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

export default mongoose.models.Link ||
  mongoose.model("Link", LinkSchema);
