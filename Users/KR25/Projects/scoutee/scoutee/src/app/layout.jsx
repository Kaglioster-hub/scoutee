import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ✅ Metadata gestito solo qui
export const metadata = {
  title: "Scoutee 🚀 — Survival Companion",
  description: "Find rides, SOS numbers & AI help wherever you are.",
  metadataBase: new URL("https://scoutee.vrabo.it"),
  openGraph: {
    type: "website",
    url: "https://scoutee.vrabo.it",
    siteName: "Scoutee",
    title: "Scoutee 🚀 — Survival Companion",
    description: "Find rides, SOS numbers & AI help wherever you are.",
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
    description: "Find rides, SOS numbers & AI help wherever you are.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-500 antialiased">
        {/* 🧭 Navbar */}
        <Navbar />

        {/* 📦 Contenuto */}
        <main className="pt-6">{children}</main>

        {/* ⚓ Footer */}
        <Footer />
      </body>
    </html>
  );
}
