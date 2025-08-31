import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ✅ Metadata gestito solo qui (non nei client components)
export const metadata = {
  title: "Scoutee 🚀 — Survival Companion",
  description: "Find services, SOS & AI help based on where you are.",
  metadataBase: new URL("https://scoutee.vrabo.it"),
  openGraph: {
    type: "website",
    url: "https://scoutee.vrabo.it",
    siteName: "Scoutee",
    title: "Scoutee 🚀 — Survival Companion",
    description: "Find services, SOS & AI help based on where you are.",
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
    title: "Scoutee 🚀 — Survival Companion",
    description: "Find services, SOS & AI help based on where you are.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-comfort-light dark:bg-comfort-dark text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
