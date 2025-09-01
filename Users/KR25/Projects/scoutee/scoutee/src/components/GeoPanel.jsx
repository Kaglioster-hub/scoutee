"use client";
import { useState, useEffect } from "react";
import data from "@/data/scoutee_master.json";

// helper ISO → emoji bandiera
function isoToFlag(iso) {
  if (!iso || iso === "ALL") return "🌍";
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt()));
}

export default function GeoPanel() {
  const [location, setLocation] = useState(null);
  const [emergency, setEmergency] = useState(null);
  const [ads, setAds] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // Reverse geocoding con Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const geo = await res.json();

          const countryCode = geo.address?.country_code?.toUpperCase();
          const city =
            geo.address?.city ||
            geo.address?.town ||
            geo.address?.village ||
            geo.address?.municipality;

          setLocation({ countryCode, city });

          // 🔹 Emergency numbers
          const foundEmergency =
            data.emergencies.find((e) => e.iso === countryCode) ||
            data.emergencies.find((e) => e.iso === "ALL");
          setEmergency(foundEmergency);

          // 🔹 Ads per città
          const foundAds = data.ads.filter(
            (a) => a.city.toLowerCase() === (city || "").toLowerCase()
          );
          setAds(foundAds);

          // 🔹 Services per paese (o ALL)
          const foundServices = data.services.filter(
            (s) =>
              s.countries.includes("ALL") ||
              s.countries.includes(countryCode)
          );
          setServices(foundServices);
        } catch (err) {
          console.error("Geolocation/Reverse error:", err);
        }
      });
    }
  }, []);

  return (
    <div className="p-6 bg-[var(--card)] rounded-2xl shadow-lg space-y-6">
      <h2 className="text-xl font-bold">🌍 Local Scoutee Panel</h2>

      {!location ? (
        <p>Detecting location...</p>
      ) : (
        <>
          <p>
            You are in <strong>{location.city}</strong>,{" "}
            {isoToFlag(location.countryCode)}{" "}
            <strong>{location.countryCode}</strong>
          </p>

          {/* Emergency numbers */}
          {emergency && (
            <div>
              <h3 className="font-semibold mb-2">🚨 Emergency Numbers</h3>
              <ul className="list-disc pl-5">
                {Object.entries(emergency.numbers).map(([k, v]) => (
                  <li key={k}>
                    {k}: <strong>{v}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Local services */}
          {services.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">🛠 Available Services</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {services.map((s, i) => (
                  <a
                    key={i}
                    href={s.affiliate_url}
                    target="_blank"
                    className="flex items-center gap-2 p-2 bg-[var(--bg)] rounded-lg hover:shadow-md"
                  >
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Local ads */}
          {ads.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">🔥 Local Offers</h3>
              <ul className="list-disc pl-5">
                {ads.map((a, i) => (
                  <li key={i}>
                    <a
                      href={a.url}
                      className="text-blue-400 hover:underline"
                      target="_blank"
                    >
                      {a.title} ({a.category})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
