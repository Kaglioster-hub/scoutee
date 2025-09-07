"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 backdrop-blur-lg bg-[var(--card-bg)]/80 border-t border-[var(--card-border)] shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* ⬅️ Brand */}
        <p className="text-sm text-[var(--muted)] text-center md:text-left">
          © {year}{" "}
          <span className="font-semibold text-[var(--primary)] glow">Scoutee 🚀</span>.
          All rights reserved.
        </p>

        {/* 📑 Links */}
        <div className="flex space-x-8 text-sm font-medium">
          {["about", "privacy", "terms"].map((link) => (
            <a
              key={link}
              href={`/${link}`}
              className="relative group capitalize"
            >
              <span className="hover:text-[var(--primary)] transition">
                {link}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* ➡️ Social */}
        <div className="flex space-x-6 text-lg">
          <a
            href="https://twitter.com/scoutee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-[var(--primary)] transition"
          >
            🐦
          </a>
          <a
            href="https://github.com/kaglioster-hub/scoutee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-[var(--primary)] transition"
          >
            💻
          </a>
        </div>
      </div>

      {/* ❤️ Extra bottom note */}
      <div className="text-center py-4 text-xs text-[var(--muted)] border-t border-[var(--card-border)]">
        Made with ❤️ for explorers worldwide 🌍
      </div>
    </footer>
  );
}
