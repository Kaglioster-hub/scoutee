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
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">
        Welcome to Scoutee 🚀
      </h1>

      {/* Services */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {d.services.map((s, i) => (
            <div
              key={i}
              className="p-5 rounded-xl shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition"
            >
              <div className="text-3xl">{s.icon}</div>
              <div className="font-bold text-lg mt-2">{s.name}</div>
              <a
                className="text-primary text-sm hover:underline"
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
        <h2 className="text-xl font-semibold mb-4 text-red-400">Emergencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {d.emergencies.map((c, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-gray-900 shadow-inner"
            >
              <h3 className="font-bold text-lg mb-2 text-red-600">
                {c.country}
              </h3>
              <ul className="space-y-1 text-sm">
                {Object.entries(c.numbers).map(([service, num], j) => (
                  <li key={j}>
                    <span className="capitalize font-semibold">
                      {service}:
                    </span>{" "}
                    <span className="text-red-500">{num}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ChatBotAI />
    </div>
  );
}
