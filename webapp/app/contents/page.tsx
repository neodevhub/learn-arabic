// webapp/app/contents/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

interface Content {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
}

export default function ContentsPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContents = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content`);
      if (!res.ok) throw new Error("Failed to fetch contents");
      const data = await res.json();
      setContents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading contents...</p>;

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen w-full flex flex-col items-center py-10 mt-12"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: 'url("/islamic-pattern.gif")',
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay خفيف للصفحة */}
        <div className="absolute inset-0 bg-white/99 pointer-events-none"></div>

        <div className="relative w-full max-w-7xl px-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
            All Contents
          </h1>

          {contents.length === 0 && (
            <p className="text-center text-gray-600">No contents available.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contents.map((content) => (
              <div
                key={content._id}
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition transform duration-300"
                style={{
                  backgroundImage: 'url("/islamic-pattern-small.png")',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom right",
                  backgroundSize: "80px 80px",
                }}
              >
                {/* العنوان */}
                <h2 className="text-xl font-semibold text-gray-800 p-4 border-b border-gray-200">
                  {content.title}
                </h2>

                {/* الصورة */}
                {/* {content.imageUrl && ( */}
                <img
                  src="/islamic-pattern.svg"
                  alt={content.title}
                  className="w-24 h-24 mx-auto my-4 object-contain"
                />
                {/* )} */}

                {/* الوصف */}
                {content.description && (
                  <p className="p-4 flex-1 text-gray-700 line-clamp-3">
                    {content.description}
                  </p>
                )}

                {/* تاريخ الإنشاء */}
                <small className="text-gray-500 px-4 pb-2">
                  Created at: {new Date(content.createdAt).toLocaleDateString()}
                </small>

                {/* زر Read More */}
                <div className="p-4">
                  <Link
                    href={`/contents/${content._id}`}
                    className="inline-block w-full text-center bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
