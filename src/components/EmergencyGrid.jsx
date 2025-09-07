"use client";
import { useEffect, useState } from "react";
import EmergencyCard from "./EmergencyCard";

export default function EmergencyGrid() {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/scoutee_master.json") // 🔧 assicurati che il file sia in /public
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEmergencies(data.emergencies || []);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Error loading emergencies:", err);
        setError("Unable to load emergency numbers.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section fade-in">
      <h2 className="heading-gradient text-center mb-8">🚨 Emergency Numbers</h2>

      {loading && (
        <div className="surface p-6 text-center muted">
          Loading emergency numbers...
        </div>
      )}

      {error && (
        <div className="surface p-6 text-center text-red-500">{error}</div>
      )}

      {!loading && !error && emergencies.length === 0 && (
        <div className="surface p-6 text-center muted">
          No emergency numbers available right now.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {emergencies.map((e) => (
          <EmergencyCard key={e.iso} {...e} />
        ))}
      </div>
    </section>
  );
}
