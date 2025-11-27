"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    // <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-green-400 to-blue-300 flex flex-col items-center justify-center">
    <div className="relative min-h-screen w-full overflow-hidden custom-gradient flex flex-col items-center justify-center">
      {/* طبقة الزخارف على كامل الخلفية */}
      <div className="absolute inset-0">
        <Image
          src="/islamic-pattern.gif" // زخرفة باهتة تغطي كامل الشاشة
          alt="Islamic Pattern"
          layout="fill"
          objectFit="cover"
          className="opacity-2 animate-slow-spin mix-blend-overlay"
        />
      </div>

      {/* الشعار أو النص في المنتصف */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* الصورة فوق النص */}
        <Image
          src="/islamic-pattern.svg"
          alt="Islamic Pattern"
          width={180}
          height={180}
          className="opacity-80 animate-slow-spin"
        />

        <h1 className="text-5xl font-extrabold text-white text-shadow-md">
          Learn Arabic
        </h1>

        <p className="text-xl text-white/80">
          Nah... <span className="text-amber-300">Maybe!</span>
        </p>

        {/* الأزرار */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {[
            { label: "Contents", href: "/contents" },
            { label: "Excercises", href: "/excercise" },
            { label: "Letters", href: "/letters" },
            { label: "Greetings", href: "/greetings" },
          ].map((btn) => (
            <Link
              key={btn.label}
              href={btn.href}
              className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/40 hover:scale-105 hover:shadow-lg transition-transform transition-colors"
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Chatbot */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-end gap-2">
        <div
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <Image
            src="/arab-character.jpg"
            alt="Hamoud"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-medium text-gray-800">Ask Hammoud</span>
        </div>

        {chatOpen && (
          <div className="mt-2 w-72 max-w-xs bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-4 flex flex-col gap-2">
            <div className="text-gray-700 font-semibold">Hammoud:</div>
            <div className="text-gray-600 text-sm">
              Hello! How can I help you learn Arabic today?
            </div>
            <input
              type="text"
              placeholder="Write your question here..."
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="mt-2 w-full bg-[#4899b6] text-white rounded-md py-1 hover:bg-[#3a7f9f] transition">
              Send
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-gradient {
          background-image: linear-gradient(
            to bottom right,
            lab(50 -25.42 -20.1),
            lab(12 2.81 -30.77)
          );
        }
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-slow-spin {
          animation: slow-spin 120s linear infinite;
        }

        @keyframes subtle-spin {
          0% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
          100% {
            transform: rotate(-3deg);
          }
        }
        .animate-subtle-spin {
          animation: subtle-spin 5s ease-in-out infinite;
        }

        .text-shadow-md {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}
