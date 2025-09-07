export const metadata = {
  title: "Offline — Scoutee",
};

export default function Offline() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="heading-gradient glow text-5xl mb-6">📡 Offline</h1>
      <h2 className="text-2xl font-bold mb-4">Connection Lost</h2>
      <p className="muted max-w-lg mb-8">
        You’re currently offline. Some features may not be available — but
        Scoutee stays with you even without a connection.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <a href="/" className="btn btn-primary">
          ⬅ Back to Home
        </a>
        <a href="/#emergencies" className="btn btn-ghost">
          Emergency Numbers
        </a>
      </div>

      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">
        <p>Scoutee 🚀 — works online & offline</p>
      </footer>
    </main>
  );
}
