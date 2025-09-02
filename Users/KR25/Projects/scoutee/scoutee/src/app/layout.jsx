import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Scoutee 🚀 — Survival Companion",
  description: "Find services, SOS & AI help based on where you are.",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicons e PWA */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased transition-colors duration-300">
        <Navbar />
        <main id="content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
