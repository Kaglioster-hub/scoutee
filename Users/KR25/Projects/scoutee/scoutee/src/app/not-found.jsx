export const metadata = {
  title: "Page Not Found – Scoutee",
  description: "The page you are looking for could not be found.",
};

export default function NotFoundPage() {
  return (
    <section className="p-6 text-center space-y-4">
      <h1 className="text-4xl font-bold text-sos">404 – Not Found</h1>
      <p>La pagina che cerchi non esiste o è stata rimossa.</p>
      <a
        href="/"
        className="inline-block px-4 py-2 bg-primary text-white rounded-lg shadow-glow"
      >
        Torna alla Home
      </a>
    </section>
  );
}
