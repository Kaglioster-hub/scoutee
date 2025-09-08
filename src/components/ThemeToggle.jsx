"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);

  // inizializza da <html> class
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className={`btn btn-ghost pop text-sm ${className}`}
      title={dark ? "Switch to light" : "Switch to dark"}
      aria-label="Toggle theme"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
