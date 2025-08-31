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
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <header className="text-center py-12">
        <h1 className="text-4xl font-extrabold mb-3">
          Welcome to <span className="text-blue-400">Scoutee 🚀</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Your survival companion for rides, SIMs, and emergencies — anywhere
          you go.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Services */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Services</h2>
          <div className="services-grid">
            {d.services.map((s, i) => (
              <div key={i} className="card">
                <div className="text-4xl mb-2">{s.icon}</div>
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
        <section>
          <h2 className="text-2xl font-bold mb-6 text-red-400">Emergencies</h2>
          <div className="emergencies">
            {d.emergencies.map((c, i) => (
              <div key={i} className="emergency-box">
                <h3>{c.country}</h3>
                <ul>
                  {Object.entries(c.numbers).map(([service, num], j) => (
                    <li key={j}>
                      <span className="font-semibold capitalize">
                        {service}:
                      </span>{" "}
                      <span className="text-red-300">{num}</span>
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
