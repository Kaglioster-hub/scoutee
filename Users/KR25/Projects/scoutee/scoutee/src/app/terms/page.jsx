export const metadata = {
  title: "Terms of Service — Scoutee 🚀",
  description: "Review the terms and conditions for using Scoutee.",
  openGraph: {
    type: "website",
    url: "https://scoutee.vrabo.it/terms",
    siteName: "Scoutee",
    title: "Terms of Service — Scoutee 🚀",
    description: "Review the terms and conditions for using Scoutee.",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Scoutee Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@scoutee",
    title: "Terms of Service — Scoutee 🚀",
    description: "Review the terms and conditions for using Scoutee.",
    images: ["/logo.svg"],
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="text-gray-300 leading-relaxed">
        By using Scoutee, you agree to follow local regulations, respect the
        services integrated into the platform, and use the tool responsibly.
      </p>
    </div>
  );
}
