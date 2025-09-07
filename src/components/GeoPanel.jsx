"use client";
import { useEffect, useState } from "react";
import data from "@/data/scoutee_master"; // ✅ statico
import BrandIcon from "./BrandIcon";

// helper ISO → emoji bandiera
function isoToFlag(iso) {
  if (!iso || iso === "ALL") return "🌍";
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt()));
}

// semplice spinner
function Spinner() {
  return (
    <span
      role="status"
      className="ml-2 inline-block w-4 h-4 border-2 border-t-transparent border-blue-400 rounded-full animate-spin"
    ></span>
  );
}

export default function GeoPanel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState({
    countryCode: "ALL",
    city: "Unknown",
  });
  const [emergency, setEmergency] = useState(
    data.emergencies.find((e) => e.iso === "ALL")
  );
  const [ads, setAds] = useState([]);
  const [services, setServices] = useState(
    data.services.filter((s) => s.countries.includes("ALL"))
  );

  const detectLocation = () => {
    setLoading(true);
    setError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
              {
                headers: {
                  "User-Agent":
                    "Scoutee/1.0 (https://scoutee.vrabo.it) contact: support@vrabo.it",
                },
              }
            );
            const geo = await res.json();

            const countryCode = geo.address?.country_code?.toUpperCase() || "ALL";
            const city =
              geo.address?.city ||
              geo.address?.town ||
              geo.address?.village ||
              geo.address?.municipality ||
              geo.display_name?.split(",")[0] ||
              "Unknown";

            setLocation({ countryCode, city });

            const foundEmergency =
              data.emergencies.find((e) => e.iso === countryCode) ||
              data.emergencies.find((e) => e.iso === "ALL");
            setEmergency(foundEmergency);

            const foundAds = data.ads.filter(
              (a) => a.city.toLowerCase() === (city || "").toLowerCase()
            );
            setAds(foundAds);

            const foundServices = data.services.filter(
              (s) =>
                s.countries.includes("ALL") ||
                s.countries.includes(countryCode)
            );
            setServices(foundServices);

            setLoading(false);
          } catch (err) {
            console.error("Geo fetch error:", err);
            setError(
              "⚠️ Impossibile recuperare i dettagli della posizione, mostro i dati globali."
            );
            setLoading(false);
          }
        },
        (err) => {
          console.warn("Geo denied:", err);
          setError("⚠️ Posizione negata. Puoi attivarla manualmente qui sotto.");
          setLoading(false);
        }
      );
    } else {
      setError("⚠️ Geolocalizzazione non supportata da questo browser.");
      setLoading(false);
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg space-y-6">
      <h2 className="text-xl font-bold flex items-center">
        📍 Local Scoutee Panel {loading && <Spinner />}
      </h2>

      {error && (
        <div className="space-y-3" aria-live="polite">
          <p className="text-sm text-yellow-500 bg-yellow-900/20 p-3 rounded-lg">
            {error}
          </p>
          <button
            onClick={detectLocation}
            disabled={loading}
            className="btn btn-primary pop disabled:opacity-50"
          >
            📍 Attiva posizione e scopri i servizi vicino a te
          </button>
        </div>
      )}

      <p aria-live="polite">
        You are in <strong>{location.city}</strong>, {isoToFlag(location.countryCode)}{" "}
        <strong>{location.countryCode}</strong>
      </p>

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

      {services.length > 0 && (
        <div aria-live="polite">
          <h3 className="font-semibold mb-2">🛠 Available Services</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {services.map((s, i) => {
              const domain = (() => {
                try {
                  return new URL(s.affiliate_url || s.url).hostname.replace(/^www\./, "");
                } catch {
                  return (s.slug || "").replace(/^https?:\/\//, "").replace(/^www\./, "");
                }
              })();
              const id =
                s.id ||
                s.slug ||
                s.name?.toLowerCase().replace(/\s+/g, "-") ||
                `svc-${i}`;
              const href = s.affiliate_url || s.url || (domain ? `https://${domain}` : "#");
              return (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-[var(--bg)] rounded-lg hover:shadow-md transition"
                >
                  <BrandIcon id={id} name={s.name} domain={domain} className="w-5 h-5" />
                  <span>{s.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

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
                  rel="noopener noreferrer"
                >
                  {a.title} ({a.category})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
