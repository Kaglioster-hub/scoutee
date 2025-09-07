export const metadata = {
  title: "Page Not Found — Scoutee",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="heading-gradient glow text-6xl mb-6">404</h1>
      <h2 className="text-2xl font-bold mb-4">Oops! Page not found 🚧</h2>
      <p className="muted max-w-lg mb-8">
        The page you’re looking for doesn’t exist, was moved, or has been
        retired. Don’t worry — Scoutee has your back!
      </p>

      <div className="flex gap-4">
        <a
          href="/"
          className="btn btn-primary"
        >
          ⬅ Back to Home
        </a>
        <a
          href="/#services"
          className="btn btn-ghost"
        >
          Explore Services
        </a>
      </div>

      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">
        <p>Scoutee 🚀 — AI survival companion</p>
      </footer>
    </main>
  );
}
