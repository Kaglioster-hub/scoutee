import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 📌 Metadati globali
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
  icons: {
    icon: "/favicon.ico", // evita warning favicon 404
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
