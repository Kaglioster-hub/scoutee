"use client";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

export default function ServicesGrid() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/scouty_master.json")
      .then((res) => res.json())
      .then((data) => setServices(data.services || []))
      .catch((err) => console.error("❌ Error loading services:", err));
  }, []);

  return (
    <section className="section">
      <h2 className="heading-gradient text-center mb-8">🌍 Services</h2>
      <div className="grid-auto">
        {services.map((s) => (
          <ServiceCard key={s.name} service={s} />
        ))}
      </div>
    </section>
  );
}
