"use client";

export const metadata = {
  title: "Terms of Service — Scoutee",
  description: "Read Scoutee's terms of service.",
};

export default function TermsPage() {
  return (
    <div className="section fade-in">
      <h1 className="heading-gradient glow mb-6">Terms of Service 📜</h1>
      <div className="surface p-6 space-y-4">
        <ol className="list-decimal list-inside space-y-2">
          <li>Scoutee provides information “as is”, without guarantees.</li>
          <li>Users are responsible for how they use links and numbers.</li>
          <li>Terms may change — continued use means acceptance.</li>
        </ol>
        <p className="muted text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
