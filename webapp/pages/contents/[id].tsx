import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Content {
  _id: string;
  title: string;
  description?: string;
  youtubeUrl?: string;
  fileUrl: string;
  createdAt: string;
}

export default function ContentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState<Content | null>(null);

  const fetchContent = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/content/${id}`);
      if (!res.ok) throw new Error("Content not found");
      const data = await res.json();
      setContent(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchContent(id);
    }
  }, [id]);

  if (!content) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "50px auto" }}>
      <h1>{content.title}</h1>
      {content.description && <p>{content.description}</p>}

      {content.youtubeUrl && (
        <div style={{ margin: "20px 0" }}>
          <iframe
            width="560"
            height="315"
            src={content.youtubeUrl.replace("watch?v=", "embed/")}
            title={content.title}
            allowFullScreen
          ></iframe>
        </div>
      )}

      <p>
        <a
          href={content.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: 5,
          }}
        >
          Download File
        </a>
      </p>

      <small>Created at: {new Date(content.createdAt).toLocaleString()}</small>
    </div>
  );
}
