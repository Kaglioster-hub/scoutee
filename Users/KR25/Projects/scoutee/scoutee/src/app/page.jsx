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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome to Scoutee 🚀</h1>

      {/* Services */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {d.services.map((s, i) => (
            <div
              key={i}
              className="p-4 rounded-xl shadow-card bg-white dark:bg-gray-900"
            >
              <div className="text-3xl">{s.icon}</div>
              <div className="font-bold">{s.name}</div>
              <a
                className="text-primary text-sm"
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
        <h2 className="text-lg font-semibold mb-2">Emergencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {d.emergencies.map((c, i) => (
            <div key={i} className="p-4 border-2 border-sos rounded-xl">
              <div className="font-bold">{c.country}</div>
              <pre className="text-xs">
                {JSON.stringify(c.numbers, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </section>

      <ChatBotAI />
    </div>
  );
}
