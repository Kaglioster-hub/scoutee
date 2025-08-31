"use client";

import { useEffect, useState } from "react";
import ChatBotAI from "@/components/ChatBotAI";

export default function Page() {
  const [d, setD] = useState({ services: [], emergencies: [] });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [s, e] = await Promise.all([
          fetch("/api/services").then((r) => r.json()),
          fetch("/api/emergencies").then((r) => r.json()),
        ]);
        if (!alive) return;
        setD({ services: s || [], emergencies: e || [] });
      } catch (e) {
        setErr("⚠️ Could not load data. Please refresh.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* 🌟 Hero */}
      <header className="hero fade-in text-center py-20">
        <h1 className="heading-gradient glow mb-6">
          Welcome to <span className="text-primary">Scoutee 🚀</span>
        </h1>
        <p className="muted text-lg max-w-2xl mx-auto leading-relaxed">
          Your <span className="font-semibold text-primary">AI-powered</span>{" "}
          survival companion for <strong>rides, eSIMs</strong> and{" "}
          <strong>emergency numbers</strong> worldwide.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#services" className="btn btn-primary pop">
            🚖 Explore Services
          </a>
          <a href="#emergencies" className="btn btn-ghost pop">
            🚨 Emergency Numbers
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-20">
        {/* ⚠️ Error State */}
        {!!err && (
          <section className="section">
            <div className="surface p-5 text-center text-red-600 dark:text-red-400 font-semibold">
              {err}
            </div>
          </section>
        )}

        {/* 🚖 Services */}
        <section id="services" className="section fade-in">
          <h2 className="text-3xl font-bold mb-10 text-center">
            🌍 Services
          </h2>

          {loading ? (
            <div className="grid-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-7 w-20 rounded bg-gray-200/70 dark:bg-white/10 mb-3" />
                  <div className="h-5 w-32 rounded bg-gray-200/70 dark:bg-white/10 mb-2" />
                  <div className="h-4 w-16 rounded bg-gray-200/70 dark:bg-white/10" />
                </div>
              ))}
            </div>
          ) : d.services.length === 0 ? (
            <div className="surface p-5 text-center">
              <p className="muted">No services available right now.</p>
            </div>
          ) : (
            <div className="grid-auto">
              {d.services.map((s, i) => (
                <article
                  key={`${s.name}-${i}`}
                  className="card pop flex flex-col items-start"
                >
                  <div className="text-5xl mb-4" aria-hidden>
                    {s.icon}
                  </div>
                  <h3 className="mb-1 text-lg font-semibold">{s.name}</h3>
                  {s.description && (
                    <p className="muted text-sm mb-4">{s.description}</p>
                  )}
                  <a
                    className="btn btn-primary mt-auto"
                    href={s.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer"
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
          <h2 className="text-3xl font-bold mb-10 text-center text-red-500">
            🚨 Emergency Numbers
          </h2>

          {loading ? (
            <div className="grid-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-sos animate-pulse">
                  <div className="h-6 w-28 rounded bg-red-200/60 dark:bg-red-900/30 mb-3" />
                  <div className="space-y-2">
                    <div className="h-4 w-40 rounded bg-red-200/60 dark:bg-red-900/30" />
                    <div className="h-4 w-36 rounded bg-red-200/60 dark:bg-red-900/30" />
                    <div className="h-4 w-28 rounded bg-red-200/60 dark:bg-red-900/30" />
                  </div>
                </div>
              ))}
            </div>
          ) : d.emergencies.length === 0 ? (
            <div className="surface p-5 text-center">
              <p className="muted">
                Emergency numbers unavailable at the moment.
              </p>
            </div>
          ) : (
            <div className="grid-auto">
              {d.emergencies.map((c, i) => (
                <article
                  key={`${c.country}-${i}`}
                  className="card-sos pop flex flex-col"
                >
                  <h3 className="mb-3 text-lg font-semibold">{c.country}</h3>
                  <ul className="space-y-1">
                    {Object.entries(c.numbers).map(([service, num], j) => (
                      <li
                        key={`${service}-${num}-${j}`}
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
      </main>

      {/* 🤖 Chatbot */}
      <ChatBotAI />
    </div>
  );
}
