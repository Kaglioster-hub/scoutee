export const metadata = {
  title: "About — Scoutee",
  description: "Learn more about Scoutee, your AI-powered survival companion.",
};

export default function AboutPage() {
  return (
    <div className="section fade-in">
      <h1 className="heading-gradient glow mb-6">About Scoutee 🚀</h1>
      <div className="surface p-6 space-y-4">
        <p>
          <strong>Scoutee</strong> was born as an AI-powered companion to help
          you navigate the world safely and smartly. Whether you need{" "}
          <span className="text-[var(--primary)]">emergency numbers</span>,
          rides, or quick access to essential services — Scoutee is here.
        </p>
        <p>
          Our mission is simple:{" "}
          <em>empower explorers, travelers and citizens with instant survival
          tools</em>.
        </p>
        <p className="muted text-sm">
          Built with ❤️ by the Kaglioster hub community.
        </p>
      </div>
    </div>
  );
}
