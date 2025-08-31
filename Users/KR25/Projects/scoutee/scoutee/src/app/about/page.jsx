"use client";

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
          <strong>Scoutee</strong> is your AI-powered survival companion for
          rides, SIMs and global emergency numbers.
        </p>
        <p>
          Our mission: <em>make traveling and everyday life safer and smarter</em>.
        </p>
        <p className="muted text-sm">
          Built with ❤️ by Kaglioster Hub.
        </p>
      </div>
    </div>
  );
}
