
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
  return(
    <div className="p-2 bg-white min-h-screen" style={{ fontFamily: "var(--font-tamil)" }}>
      {link.content&& <div dangerouslySetInnerHTML={{ __html: link.content }} />}
      <div className="fixed p-2 w-full bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center">
          <a className="bg-blue-500 text-xl  text-center p-3 w-full text-white   rounded" href={link.url} target="_blank" rel="noopener noreferrer">Open Link</a>
        </div>
      </div>
    </div>
  )
}
