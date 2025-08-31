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
          We respect your privacy. Scoutee does not sell your data, and we
          minimize the collection of personal information.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>We collect only what’s necessary to run our services.</li>
          <li>We never share your information with third parties without consent.</li>
          <li>You can request deletion of your data at any time.</li>
        </ul>
        <p className="muted text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
