"use client";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

export default function ServicesGrid() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/scoutee_master.json") // ✅ assicurati che il file sia in /public
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setServices(data.services || []);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Error loading services:", err);
        setError("Unable to load services at the moment.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section">
      <h2 className="heading-gradient text-center mb-8">🌍 Services</h2>

      {loading && (
        <div className="surface p-6 text-center muted">Loading services...</div>
      )}

      {error && (
        <div className="surface p-6 text-center text-red-500">{error}</div>
      )}

      {!loading && !error && services.length === 0 && (
        <div className="surface p-6 text-center muted">
          No services available right now.
        </div>
      )}

      <div className="grid-auto">
        {services.map((s) => (
          <ServiceCard key={s.name} service={s} />
        ))}
      </div>
    </section>
  );
}
