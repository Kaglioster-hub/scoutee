export const metadata = {
  title: "Privacy Policy — Scoutee",
  description: "Read Scoutee’s privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main className="container-app py-16 space-y-8">
      <h1 className="heading-gradient glow">Privacy Policy</h1>
      <p className="muted text-lg">
        Your privacy is important to us. Scoutee does not sell your data and
        only stores minimal information required for functionality.
      </p>
      <p>
        We may collect anonymized usage analytics to improve the platform.  
        By using Scoutee, you agree to this policy.
      </p>
    </main>
  );
}
