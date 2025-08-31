"use client";

export const metadata = {
  title: "Privacy Policy — Scoutee",
  description: "Read Scoutee's privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="section fade-in">
      <h1 className="heading-gradient glow mb-6">Privacy Policy 🔒</h1>
      <div className="surface p-6 space-y-4">
        <p>
          We respect your privacy. Scoutee does not sell your data, and
          minimizes the collection of personal information.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Only essential data is collected to run the app.</li>
          <li>No third-party sharing without your consent.</li>
          <li>You may request deletion at any time.</li>
        </ul>
        <p className="muted text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
