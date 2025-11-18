import { useState, useEffect } from "react";

interface Content {
  _id: string;
  title: string;
  description?: string;
  youtubeUrl?: string;
  fileUrl: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [contents, setContents] = useState<Content[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  // Fetch contents
  const fetchContents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/content");
      const data = await res.json();
      setContents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  // Add content
  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert("Not authorized");

    try {
      const res = await fetch("http://localhost:5000/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, youtubeUrl, fileUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error adding content");
        return;
      }

      // تحديث القائمة بعد الإضافة
      setContents([data.content, ...contents]);
      setTitle("");
      setDescription("");
      setYoutubeUrl("");
      setFileUrl("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  // Delete content
  const handleDelete = async (_id: string) => {
    if (!token) return alert("Not authorized");

    try {
      const res = await fetch(`http://localhost:5000/api/content/${_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return alert("Error deleting content");

      setContents(contents.filter((c) => c._id !== _id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "50px auto" }}>
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleAddContent} style={{ marginBottom: 30 }}>
        <h2>Add Content</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
        />
        <input
          type="text"
          placeholder="File URL"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Add Content
        </button>
      </form>

      <h2>Content List</h2>
      {contents.map((content) => (
        <div
          key={content._id}
          style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
        >
          <h3>{content.title}</h3>
          {content.description && <p>{content.description}</p>}
          {content.youtubeUrl && <p>Youtube: {content.youtubeUrl}</p>}
          <p>File: {content.fileUrl}</p>
          <button
            onClick={() => handleDelete(content._id)}
            style={{ color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
