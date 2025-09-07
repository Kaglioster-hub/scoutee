// src/app/layout.jsx
import "./globals.css";  // <-- percorso corretto
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport = {
  themeColor: "#2563eb",
};

export const metadata = {
  title: "Scoutee 🚀 — Survival Companion",
  description: "Find services, SOS & AI help based on where you are.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "Scoutee",
    statusBarStyle: "default",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased transition-colors duration-300">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main id="content" className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
