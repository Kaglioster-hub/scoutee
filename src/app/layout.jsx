import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Scoutee 🚀 — Survival Companion",
  description: "Find services, SOS & AI help based on where you are.",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
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
          <main id="content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
