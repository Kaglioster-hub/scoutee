export const metadata = {
  title: "Privacy Policy — Scoutee 🚀",
  description: "Understand how Scoutee handles your data and privacy.",
  openGraph: {
    type: "website",
    url: "https://scoutee.vrabo.it/privacy",
    siteName: "Scoutee",
    title: "Privacy Policy — Scoutee 🚀",
    description: "Understand how Scoutee handles your data and privacy.",
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
    title: "Privacy Policy — Scoutee 🚀",
    description: "Understand how Scoutee handles your data and privacy.",
    images: ["/logo.svg"],
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-gray-300 leading-relaxed">
        Scoutee does not store or sell your personal information. Any data used
        is strictly for functionality and improving the user experience.
      </p>
    </div>
  );
}
