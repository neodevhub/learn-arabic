// app/components/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="w-full fixed top-0 left-0 p-4 z-50"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, lab(50 -25.42 -20.1), lab(12 2.81 -30.77))",
      }}
    >
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link
            href="/"
            className={`px-4 py-2 rounded transition ${
              pathname === "/"
                ? "bg-white/20 text-white font-bold"
                : "bg-transparent text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`px-4 py-2 rounded transition ${
              pathname === "/about"
                ? "bg-white/20 text-white font-bold"
                : "bg-transparent text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contents"
            className={`px-4 py-2 rounded transition ${
              pathname === "/contents"
                ? "bg-white/20 text-white font-bold"
                : "bg-transparent text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            Contents
          </Link>
        </li>
      </ul>
    </nav>
  );
}
