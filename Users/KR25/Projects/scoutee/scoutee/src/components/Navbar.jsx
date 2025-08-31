"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <nav className="p-4 shadow-md bg-comfort-light dark:bg-comfort-dark sticky top-0 z-50 flex justify-between items-center">
      {/* Logo / brand */}
      <Link href="/" className="font-bold text-xl hover:text-primary transition">
        🦊 Scoutee
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center space-x-6 text-sm">
        <Link href="/about" className="hover:text-primary transition">
          About
        </Link>
        <Link href="/privacy" className="hover:text-primary transition">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-primary transition">
          Terms
        </Link>
      </div>

      {/* Dark/Light toggle */}
      <button
        onClick={toggleTheme}
        className="ml-4 px-3 py-1 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-glow transition"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}
