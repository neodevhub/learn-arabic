import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // حفظ الـ token في localStorage
      localStorage.setItem("adminToken", data.token);

      // إعادة التوجيه لصفحة إدارة المحتوى
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
}
