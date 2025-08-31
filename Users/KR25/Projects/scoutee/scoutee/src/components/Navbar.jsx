"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Gestione tema con localStorage + prefers-color-scheme
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

  // ✅ Link principali
  const links = [
    { href: "/about", label: "About" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--card-bg)]/80 border-b border-[var(--card-border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 🦊 Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight glow hover:text-[var(--primary)] transition"
        >
          🦊 Scoutee
        </Link>

        {/* 📑 Links Desktop */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="relative group transition">
              <span className="hover:text-[var(--primary)]">{label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* ⚡ Actions */}
        <div className="flex items-center space-x-4">
          {/* Toggle Theme */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:shadow-glow transition text-lg"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--card-bg)]/95 border-t border-[var(--card-border)] px-6 py-4 space-y-4 animate-fade-in">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-sm font-medium hover:text-[var(--primary)]"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
