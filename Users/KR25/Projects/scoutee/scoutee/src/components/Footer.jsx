"use client";

export default function Footer() {
  return (
    <footer className="mt-20 backdrop-blur-lg bg-[var(--card-bg)]/80 border-t border-[var(--card-border)] shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        {/* Left: Brand */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} <span className="font-semibold">Scoutee 🚀</span>. All rights reserved.
        </p>

        {/* Center: Links */}
        <div className="flex space-x-6 text-sm font-medium">
          {["privacy", "terms"].map((link) => (
            <a
              key={link}
              href={`/${link}`}
              className="relative group"
            >
              <span className="hover:text-[var(--primary)] capitalize transition">
                {link}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right: Social */}
        <div className="flex space-x-4 text-lg">
          <a
            href="https://twitter.com/scoutee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary)] transition"
            title="Twitter"
          >
            🐦
          </a>
          <a
            href="https://github.com/kaglioster-hub/scoutee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary)] transition"
            title="GitHub"
          >
            💻
          </a>
        </div>
      </div>
    </footer>
  );
}
