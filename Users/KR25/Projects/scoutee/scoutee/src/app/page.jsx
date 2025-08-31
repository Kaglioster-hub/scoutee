"use client";

import { useEffect, useState } from "react";
import ChatBotAI from "@/components/ChatBotAI";

export default function Page() {
  const [d, setD] = useState({ services: [], emergencies: [] });

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((s) => setD((p) => ({ ...p, services: s })));

    fetch("/api/emergencies")
      .then((r) => r.json())
      .then((e) => setD((p) => ({ ...p, emergencies: e })));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <header className="text-center py-16 fade-in">
        <h1 className="text-5xl font-extrabold mb-4 glow">
          Welcome to Scoutee 🚀
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Your AI-powered survival companion for rides, SIMs and emergency
          numbers worldwide.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Services */}
        <section className="fade-in">
          <h2 className="text-3xl font-bold mb-8">Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {d.services.map((s, i) => (
              <div key={i} className="card">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3>{s.name}</h3>
                <a
                  href={s.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Emergencies */}
        <section className="fade-in">
          <h2 className="text-3xl font-bold mb-8 text-red-500">
            Emergencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {d.emergencies.map((c, i) => (
              <div key={i} className="card-sos">
                <h3>{c.country}</h3>
                <ul>
                  {Object.entries(c.numbers).map(([service, num], j) => (
                    <li key={j}>
                      <span>{service}:</span>{" "}
                      <span className="text-red-500 dark:text-red-300">
                        {num}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Chatbot */}
      <ChatBotAI />
    </div>
  );
}
