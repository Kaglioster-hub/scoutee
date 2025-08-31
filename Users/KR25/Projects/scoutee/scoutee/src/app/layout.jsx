export const metadata = {
  title: "About — Scoutee 🚀",
  description: "Learn more about Scoutee, your AI-powered survival companion.",
  openGraph: {
    type: "website",
    url: "https://scoutee.vrabo.it/about",
    siteName: "Scoutee",
    title: "About — Scoutee 🚀",
    description: "Learn more about Scoutee, your AI-powered survival companion.",
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
    title: "About — Scoutee 🚀",
    description: "Learn more about Scoutee, your AI-powered survival companion.",
    images: ["/logo.svg"],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">About Scoutee 🚀</h1>
      <p className="text-gray-300 leading-relaxed">
        Scoutee is designed to be your travel & survival companion — giving you
        fast access to mobility services, eSIMs, and emergency numbers across
        the world. Built with Next.js, Tailwind, and AI integration.
      </p>
    </div>
  );
}
