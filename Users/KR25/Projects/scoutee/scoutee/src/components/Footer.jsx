"use client";

export default function Footer() {
  return (
    <footer className="p-6 text-center text-sm bg-comfort-light dark:bg-comfort-dark text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
      <p>© 2025 Scoutee. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <a
          href="/privacy"
          className="hover:text-primary transition"
        >
          Privacy
        </a>
        <a
          href="/terms"
          className="hover:text-primary transition"
        >
          Terms
        </a>
      </div>
    </footer>
  );
}
