"use client";

import data from "@/data/scoutee_master.json";
import ChatBotAI from "@/components/ChatBotAI";

export default function Page() {
  const { services, emergencies, ads } = data;

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
                <article
                  key={`${s.name}-${i}`}
                  className="card flex flex-col pop"
                >
                  <div className="text-4xl mb-3" aria-hidden>
                    {s.icon}
                  </div>
                  <h3 className="mb-2">{s.name}</h3>
                  <p className="muted text-sm mb-4">{s.category}</p>
                  <a
                    href={s.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-auto"
                    aria-label={`Open ${s.name}`}
                  >
                    Open →
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 🚨 Emergencies */}
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
                  <h3>{c.country}</h3>
                  <ul>
                    {Object.entries(c.numbers).map(([service, num], j) => (
                      <li
                        key={`${c.iso}-${service}-${j}`}
                        className="flex justify-between"
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
      </main>

      {/* 🤖 Chatbot */}
      <ChatBotAI />
    </div>
  );
}
