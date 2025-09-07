"use client";

import { useState, useMemo } from "react";
import data from "@/data/scoutee_master.json";
import ChatBotAI from "@/components/ChatBotAI";
import GeoPanel from "@/components/GeoPanel";
import ServiceCard from "@/components/ServiceCard";

function isoToFlag(iso) {
  if (!iso || iso === "ALL") return "🌍";
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt()));
}

export default function Page() {
  const { services = [], emergencies = [], ads = [] } = data || {};
  const [chatOpen, setChatOpen] = useState(false);

  // piccola metrica utile nell’hero (non cambia la logica)
  const stats = useMemo(() => {
    const countries = new Set(
      services.flatMap((s) => s.countries || [])
    );
    countries.delete("ALL");
    return { services: services.length, countries: countries.size };
  }, [services]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* 🌟 HERO unico con logo grande */}
      <header className="hero fade-in text-center py-16">
        <div className="container-app flex flex-col items-center gap-5">
          <img
            src="/logo.svg"
            alt="Scoutee logo"
            width={128}
            height={128}
            className="w-28 h-28 md:w-32 md:h-32 drop-shadow-[0_0_30px_var(--card-glow)] motion-safe:hover:scale-[1.03] transition-transform"
          />
          <h1 className="heading-gradient glow text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome to Scoutee
            <span className="ml-2 align-middle hidden sm:inline-block motion-safe:animate-bounce">🚀</span>
          </h1>
          <p id="tagline" className="muted text-lg md:text-xl max-w-2xl">
            Your AI-powered survival companion for rides, eSIMs and emergency numbers worldwide.
          </p>

          {/* piccole stats (facoltative ma utili) */}
          <p className="text-sm muted">
            {stats.services} services · {stats.countries}+ countries
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#services" className="btn btn-primary pop">Explore Services</a>
            <a href="#emergencies" className="btn btn-ghost pop">Emergency Numbers</a>
            <a href="#ads" className="btn btn-ghost pop">Local Offers</a>
            <a href="#geo" className="btn btn-ghost pop">Local Panel</a>
          </div>
        </div>
      </header>

      <main className="space-y-20 container-app">
        {/* 🚖 Services */}
        <section id="services" className="section fade-in">
          <h2 className="text-center">🌍 Services</h2>
          {services.length === 0 ? (
            <div className="surface p-6 text-center muted">No services available right now.</div>
          ) : (
            <div className="grid-auto">
              {services.map((s, i) => (
                <ServiceCard key={s.slug || s.name || `svc-${i}`} service={s} />
              ))}
            </div>
          )}
        </section>

        {/* 🚨 Emergency Numbers */}
        <section id="emergencies" className="section fade-in">
          <h2 className="text-center text-red-500">🚨 Emergency Numbers</h2>
          <div className="grid-auto">
            {emergencies.map((c, i) => (
              <article key={c.iso || `cty-${i}`} className="card-sos pop">
                <h3 className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{isoToFlag(c.iso)}</span>
                  {c.country}
                </h3>
                <ul>
                  {Object.entries(c.numbers).map(([service, num]) => (
                    <li key={`${c.iso}-${service}`} className="flex justify-between text-sm">
                      <span className="capitalize">{service}</span>
                      <span className="text-red-600 dark:text-red-300 font-semibold">{num}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* 🔥 Local Offers */}
        <section id="ads" className="section fade-in">
          <h2 className="text-center">🔥 Local Offers</h2>
          <div className="grid-auto">
            {ads.map((ad, i) => (
              <a
                key={ad.url || `${ad.city}-${i}`}
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
        aria-pressed={chatOpen}
        title={chatOpen ? "Close chat" : "Open chat"}
      >
        {chatOpen ? "✖" : "💬"}
      </button>
    </div>
  );
}
