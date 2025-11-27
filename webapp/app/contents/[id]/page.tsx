// webapp/app/contents/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

interface Content {
  _id: string;
  title: string;
  description?: string;
  youtubeUrl?: string;
  fileUrl: string;
  createdAt: string;
}

export default function ContentDetailPage() {
  const params = useParams();
  const id = params?.id
    ? Array.isArray(params.id)
      ? params.id[0]
      : params.id
    : null;
  const [content, setContent] = useState<Content | null>(null);

  const fetchContent = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/content/${id}`
      );

      if (!res.ok) throw new Error("Content not found");
      const data = await res.json();
      setContent(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) fetchContent(id);
  }, [id]);

  if (!content) return <p>Loading...</p>;

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
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/99 pointer-events-none"></div>

        <div className="relative w-full max-w-7xl px-6 flex flex-col md:flex-row gap-10">
          {/* Left side: Title, description, button, date */}
          <div className="flex-1 flex flex-col items-start">
            <h1 className="text-3xl font-bold mb-4">{content.title}</h1>

            {content.description && (
              <p className="mb-6 text-left">{content.description}</p>
            )}

            {content.fileUrl && (
              <a
                href={content.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 px-5 py-2 bg-blue-600 text-white rounded"
              >
                Download File
              </a>
            )}

            <small className="text-gray-600">
              Created at: {new Date(content.createdAt).toLocaleString()}
            </small>
          </div>

          {/* Right side: Video */}
          {content.youtubeUrl && (
            <div className="flex-1 flex justify-end items-start">
              <iframe
                width="100%"
                height="400"
                className="rounded shadow"
                src={content.youtubeUrl.replace("watch?v=", "embed/")}
                title={content.title}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
