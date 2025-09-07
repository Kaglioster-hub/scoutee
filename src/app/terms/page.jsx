export const metadata = {
  title: "Terms of Service — Scoutee",
  description: "Read the terms of service for using Scoutee.",
};

export default function TermsPage() {
  return (
    <div className="section">
      <h1 className="heading-gradient glow mb-4">Terms of Service</h1>
      <p className="muted">
        By using Scoutee, you agree to use the app responsibly. We provide
        access to third-party services (rides, eSIMs, payments) but we are not
        responsible for their terms and conditions.
      </p>
    </div>
  );
}
