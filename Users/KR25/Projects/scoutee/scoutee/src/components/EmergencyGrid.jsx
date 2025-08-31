"use client";
import { useEffect, useState } from "react";
import EmergencyCard from "./EmergencyCard";

export default function EmergencyGrid() {
  const [emergencies, setEmergencies] = useState([]);

  useEffect(() => {
    fetch("/scouty_master.json")
      .then((res) => res.json())
      .then((data) => setEmergencies(data.emergencies || []))
      .catch((err) => console.error("❌ Error loading emergencies:", err));
  }, []);

  return (
    <section className="section">
      <h2 className="heading-gradient text-center mb-8">🚨 Emergency Numbers</h2>
      <div className="grid-auto">
        {emergencies.map((e) => (
          <EmergencyCard key={e.iso} {...e} />
        ))}
      </div>
    </section>
  );
}
