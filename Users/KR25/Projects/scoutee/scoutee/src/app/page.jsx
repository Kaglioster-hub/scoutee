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
      {/* Hero */}
      <header className="hero fade-in">
        <h1 className="heading-gradient glow mb-4">
          Welcome to Scoutee 🚀
        </h1>
        <p className="muted text-lg max-w-2xl mx-auto">
          Your AI-powered survival companion for rides, eSIMs and emergency numbers worldwide.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="#services" className="btn btn-primary pop">Explore Services</a>
          <a href="#emergencies" className="btn btn-ghost pop">Emergency Numbers</a>
        </div>
      </header>

      <main className="space-y-16">
        {/* Error state */}
        {!!err && (
          <section className="section">
            <div className="surface p-5">
              <p role="alert">{err}</p>
            </div>
          </section>
        )}

        {/* Services */}
        <section id="services" className="section fade-in">
          <h2>Services</h2>

          {loading ? (
            <div className="grid-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-7 w-20 rounded bg-gray-200/70 dark:bg-white/10 mb-3" />
                  <div className="h-5 w-32 rounded bg-gray-200/70 dark:bg-white/10 mb-2" />
                  <div className="h-4 w-16 rounded bg-gray-200/70 dark:bg.white/10" />
                </div>
              ))}
            </div>
          ) : d.services.length === 0 ? (
            <div className="surface p-5">
              <p className="muted">No services available right now.</p>
            </div>
          ) : (
            <div className="grid-auto">
              {d.services.map((s, i) => (
                <article key={`${s.name}-${i}`} className="card pop">
                  <div className="text-4xl mb-3" aria-hidden>
                    {s.icon}
                  </div>
                  <h3 className="mb-1">{s.name}</h3>
                  {s.description && (
                    <p className="muted text-sm mb-3">{s.description}</p>
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

        {/* Emergencies */}
        <section id="emergencies" className="section fade-in">
          <h2 className="text-red-500">Emergencies</h2>

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
            <div className="surface p-5">
              <p className="muted">Emergency numbers unavailable at the moment.</p>
            </div>
          ) : (
            <div className="grid-auto">
              {d.emergencies.map((c, i) => (
                <article key={`${c.country}-${i}`} className="card-sos pop">
                  <h3>{c.country}</h3>
                  <ul>
                    {Object.entries(c.numbers).map(([service, num], j) => (
                      <li key={`${service}-${num}-${j}`}>
                        <span>{service}:</span>{" "}
                        <span className="text-red-600 dark:text-red-300">{num}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Chatbot */}
      <ChatBotAI />
    </div>
  );
}
