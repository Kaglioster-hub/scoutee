"use client";

import { useEffect, useState } from "react";
import ChatBotAI from "@/components/ChatBotAI";

export default function Page() {
  const [data, setData] = useState({ services: [], emergencies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [servicesRes, emergenciesRes] = await Promise.all([
          fetch("/api/services").then((r) => r.json()),
          fetch("/api/emergencies").then((r) => r.json()),
        ]);
        if (alive) {
          setData({
            services: servicesRes || [],
            emergencies: emergenciesRes || [],
          });
        }
      } catch (e) {
        setError("⚠️ Could not load data. Please refresh.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <div className="min-h-screen">
      {/* 🌟 Hero */}
      <header className="hero fade-in">
        <h1 className="heading-gradient glow mb-6">
          Welcome to Scoutee 🚀
        </h1>
        <p className="muted text-lg max-w-2xl mx-auto">
          Your AI-powered survival companion for rides, eSIMs and emergency
          numbers worldwide.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a href="#services" className="btn btn-primary pop">Explore Services</a>
          <a href="#emergencies" className="btn btn-ghost pop">Emergency Numbers</a>
        </div>
      </header>

      <main className="space-y-20">
        {/* ⚠️ Error */}
        {error && (
          <section className="section">
            <div className="surface p-6 text-center text-red-600 dark:text-red-400 font-semibold">
              {error}
            </div>
          </section>
        )}

        {/* 🚖 Services */}
        <section id="services" className="section fade-in">
          <h2 className="text-center">🌍 Services</h2>

          {loading ? (
            <div className="grid-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card animate-pulse h-28" />
              ))}
            </div>
          ) : data.services.length === 0 ? (
            <div className="surface p-6 text-center muted">
              No services available right now.
            </div>
          ) : (
            <div className="grid-auto">
              {data.services.map((s, i) => (
                <article key={i} className="card flex flex-col">
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h3 className="mb-2">{s.name}</h3>
                  {s.description && (
                    <p className="muted text-sm mb-4">{s.description}</p>
                  )}
                  <a
                    href={s.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-auto"
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

          {loading ? (
            <div className="grid-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="card-sos animate-pulse h-32" />
              ))}
            </div>
          ) : data.emergencies.length === 0 ? (
            <div className="surface p-6 text-center muted">
              Emergency numbers unavailable.
            </div>
          ) : (
            <div className="grid-auto">
              {data.emergencies.map((c, i) => (
                <article key={i} className="card-sos">
                  <h3>{c.country}</h3>
                  <ul>
                    {Object.entries(c.numbers).map(([service, num], j) => (
                      <li key={j} className="flex justify-between">
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
      </main>

      {/* 🤖 Chatbot */}
      <ChatBotAI />
    </div>
  );
}
