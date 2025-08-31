export const metadata = {
  title: "Terms of Service — Scoutee",
  description: "Read Scoutee's terms of service.",
};

export default function TermsPage() {
  return (
    <div className="section fade-in">
      <h1 className="heading-gradient glow mb-6">Terms of Service 📜</h1>
      <div className="surface p-6 space-y-4">
        <p>
          By using Scoutee, you agree to the following terms. Please read them
          carefully:
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Scoutee provides information “as is” — we are not responsible for
            errors or outdated data.
          </li>
          <li>
            You are responsible for how you use the services and links provided.
          </li>
          <li>
            We may update these terms from time to time — continued use implies
            acceptance.
          </li>
        </ol>
        <p className="muted text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
