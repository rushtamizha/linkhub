import { connectDB } from "../lib/db.js";
import Link from "../models/link.js";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
 const { slug } = await params;
  await connectDB();
  const link = await Link.findOne({ slug }).lean();

  return {
    title: link?.seoTitle || "Redirect",
    description: link?.seoDescription || "",
  };
}

export default async function Page({ params }) {
const { slug } = await params;
  await connectDB();

  const link = await Link.findOne({ slug }).lean();

  if (!link) {
    return <h1>404 – Link Not Found</h1>;
  }

  redirect(link.url);
}
