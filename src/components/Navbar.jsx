"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  // init theme from localStorage / class on <html>
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    const initial = saved ? saved === "dark" : root.classList.contains("dark");
    setIsDark(initial);
    root.classList.toggle("dark", initial);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const linkCls = (href) =>
    `px-2 py-1 transition ${
      pathname === href ? "text-primary font-semibold" : "opacity-90 hover:opacity-100"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-xl">
      <div className="container-app h-14 flex items-center justify-between">
        {/* Brand solo testo (niente logo qui) */}
        <Link href="/" className="text-lg md:text-xl font-extrabold tracking-tight">
          Scoutee
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/about" className={linkCls("/about")}>About</Link>
          <Link href="/privacy" className={linkCls("/privacy")}>Privacy</Link>
          <Link href="/terms" className={linkCls("/terms")}>Terms</Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:shadow-md transition"
          >
            {/* icona inline, niente dipendenze */}
            {isDark ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
                <path fill="currentColor" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/><path fill="currentColor" d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5L19 19M5 19l-1.5 1.5M20.5 3.5L19 5"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
