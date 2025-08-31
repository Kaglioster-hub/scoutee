export const metadata = {
  title: "Terms of Service — Scoutee",
  description: "Read Scoutee’s terms of service.",
};

export default function TermsPage() {
  return (
    <main className="container-app py-16 space-y-8">
      <h1 className="heading-gradient glow">Terms of Service</h1>
      <p className="muted text-lg">
        By using Scoutee, you agree to use the platform responsibly and only for
        lawful purposes.
      </p>
      <p>
        Scoutee provides third-party links and services “as is” without
        warranties. We are not responsible for external providers.
      </p>
    </main>
  );
}
