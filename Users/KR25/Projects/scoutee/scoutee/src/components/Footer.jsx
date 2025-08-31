"use client";

export default function Footer() {
  return (
    <footer className="mt-20 backdrop-blur-lg bg-[var(--card-bg)]/80 border-t border-[var(--card-border)] shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* ⬅️ Brand */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[var(--primary)]">Scoutee 🚀</span>.
          All rights reserved.
        </p>

        {/* 📑 Links */}
        <div className="flex space-x-8 text-sm font-medium">
          {["privacy", "terms"].map((link) => (
            <a
              key={link}
              href={`/${link}`}
              className="relative group"
            >
              <span className="hover:text-[var(--primary)] capitalize transition">
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
      <div className="text-center py-4 text-xs text-gray-500 dark:text-gray-500 border-t border-[var(--card-border)]">
        Made with ❤️ for explorers worldwide 🌍
      </div>
    </footer>
  );
}
