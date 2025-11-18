import { useEffect, useState } from "react";
import Link from "next/link";

interface Content {
  _id: string;
  title: string;
  description?: string;
  youtubeUrl?: string;
  fileUrl?: string;
  createdAt: string;
}

export default function Contents() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/content");
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

  if (loading) return <p>Loading contents...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "50px auto" }}>
      <h1>All Contents</h1>

      {contents.length === 0 && <p>No contents available.</p>}

      {contents.map((content) => (
        <Link
          key={content._id}
          href={`/contents/${content._id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 20,
              borderRadius: 8,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.1s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2>{content.title}</h2>
            {content.description && <p>{content.description}</p>}
            <small>
              Created at: {new Date(content.createdAt).toLocaleDateString()}
            </small>
          </div>
        </Link>
      ))}
    </div>
  );
}
