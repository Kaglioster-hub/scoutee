"use client";

import { useState } from "react";
import data from "@/data/scoutee_master.json";
import ChatBotAI from "@/components/ChatBotAI";
import GeoPanel from "@/components/GeoPanel"; // 🔥 nuovo

// Funzione helper per convertire codice ISO → bandiera emoji
function isoToFlag(iso) {
  if (!iso || iso === "ALL") return "🌍";
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt()));
}

// ✅ Componente service con fallback logo sicuro
function ServiceCard({ service }) {
  const [imgError, setImgError] = useState(false);

  const logoUrl = service.affiliate_url
    ? `https://logo.clearbit.com/${new URL(service.affiliate_url).hostname}`
    : null;

  return (
    <article className="card flex flex-col items-center pop text-center">
      <div className="mb-3 flex items-center justify-center">
        {!imgError && logoUrl ? (
          <img
            src={logoUrl}
            alt={`${service.name} logo`}
            className="w-12 h-12 object-contain rounded-md"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-5xl">{service.icon}</span>
        )}
      </div>
      <h3 className="mb-1">{service.name}</h3>
      <p className="muted text-sm mb-4">{service.category}</p>
      <a
        href={service.affiliate_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary mt-auto"
        aria-label={`Open ${service.name}`}
      >
        Open →
      </a>
    </article>
  );
}

export default function Page() {
  const { services = [], emergencies = [], ads = [] } = data || {};

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* 🌟 Hero */}
      <header className="hero fade-in">
        <h1 className="heading-gradient glow mb-6">Welcome to Scoutee 🚀</h1>
        <p className="muted text-lg max-w-2xl mx-auto">
          Your AI-powered survival companion for rides, eSIMs and emergency
          numbers worldwide.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
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
      </header>

      <main className="space-y-20 container-app">
        {/* 🚖 Services (globali da JSON) */}
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

        {/* 🚨 Emergencies (globali da JSON) */}
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

        {/* 🔥 Local Offers (globali da JSON) */}
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

        {/* 📍 GeoPanel = versione personalizzata in base a dove sei */}
        <section id="geo" className="section fade-in">
          <h2 className="text-center">📍 Localized Panel</h2>
          <GeoPanel />
        </section>
      </main>

      {/* 🤖 Chatbot */}
      <ChatBotAI />
    </div>
  );
}
