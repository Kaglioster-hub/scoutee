"use client";

import { useState } from "react";
import data from "@/data/scoutee_master"; // ✅ fixato import JS
import ChatBotAI from "@/components/ChatBotAI";
import GeoPanel from "@/components/GeoPanel";
import ServiceCard from "@/components/ServiceCard";

// Funzione helper → ISO code → emoji bandiera
function isoToFlag(iso) {
  if (!iso || iso === "ALL") return "🌍";
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt()));
}

export default function Page() {
  const { services = [], emergencies = [], ads = [] } = data || {};
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* 🌟 Hero con logo responsive */}
      <header className="hero fade-in flex flex-col items-center text-center md:flex-row md:text-left md:justify-center md:gap-6">
        <img
          src="/logo.png"
          alt="Scoutee Logo"
          className="w-20 h-20 md:w-16 md:h-16 drop-shadow-lg animate-spin-slow"
        />
        <div className="flex flex-col items-center md:items-start">
          <h1 className="heading-gradient glow mb-4 flex items-center gap-2">
            Welcome to Scoutee <span className="animate-bounce">🚀</span>
          </h1>
          <p className="muted text-lg max-w-2xl">
            Your AI-powered survival companion for rides, eSIMs and emergency
            numbers worldwide.
          </p>
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
            <a href="#services" className="btn btn-primary pop">
              Explore Services
            </a>
            <a href="#emergencies" className="btn btn-ghost pop">
              Emergency Numbers
            </a>
            <a href="#ads" className="btn btn-ghost pop">
              Local Offers
            </a>
            <a href="#geo" className="btn btn-ghost pop">
              Local Panel
            </a>
          </div>
        </div>
      </header>

      <main className="space-y-20 container-app">
        {/* 🚖 Services */}
        <section id="services" className="section fade-in">
          <h2 className="text-center">🌍 Services</h2>
          {services.length === 0 ? (
            <div className="surface p-6 text-center muted">
              No services available right now.
            </div>
          ) : (
            <div className="grid-auto">
              {services.map((s, i) => (
                <ServiceCard key={`${s.name}-${i}`} service={s} />
              ))}
            </div>
          )}
        </section>

        {/* 🚨 Emergency Numbers */}
        <section id="emergencies" className="section fade-in">
          <h2 className="text-center text-red-500">🚨 Emergency Numbers</h2>
          {emergencies.length === 0 ? (
            <div className="surface p-6 text-center muted">
              Emergency numbers unavailable.
            </div>
          ) : (
            <div className="grid-auto">
              {emergencies.map((c, i) => (
                <article key={`${c.iso}-${i}`} className="card-sos pop">
                  <h3 className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{isoToFlag(c.iso)}</span>
                    {c.country}
                  </h3>
                  <ul>
                    {Object.entries(c.numbers).map(([service, num], j) => (
                      <li
                        key={`${c.iso}-${service}-${j}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="capitalize">{service}</span>
                        <span className="text-red-600 dark:text-red-300 font-semibold">
                          {num}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 🔥 Local Offers */}
        <section id="ads" className="section fade-in">
          <h2 className="text-center">🔥 Local Offers</h2>
          {ads.length === 0 ? (
            <div className="surface p-6 text-center muted">
              No offers available.
            </div>
          ) : (
            <div className="grid-auto">
              {ads.map((ad, i) => (
                <a
                  key={`${ad.city}-${i}`}
                  href={ad.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card pop flex flex-col"
                >
                  <h3 className="mb-1">{ad.title}</h3>
                  <p className="muted text-sm">
                    {ad.city} — {ad.category}
                  </p>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* 📍 GeoPanel */}
        <section id="geo" className="section fade-in">
          <h2 className="text-center">📍 Localized Panel</h2>
          <GeoPanel />
        </section>
      </main>

      {/* 💬 Floating Chatbot */}
      {chatOpen && <ChatBotAI />}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[var(--primary)] text-white shadow-lg hover:bg-[var(--primary-hover)] transition text-xl"
        aria-label="Toggle chat"
      >
        {chatOpen ? "✖" : "💬"}
      </button>
    </div>
  );
}
