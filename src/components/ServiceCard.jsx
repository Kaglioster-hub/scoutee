"use client";
import BrandIcon from "./BrandIcon";

function extractDomain(service) {
  try {
    const url = new URL(service.affiliate_url || service.url);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return (service.slug || "").replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
}

export default function ServiceCard({ service }) {
  const id =
    service.id ||
    service.slug ||
    (service.name ? service.name.toLowerCase().replace(/\s+/g, "-") : "brand");

  const domain = service.domain || extractDomain(service) || null;
  const href =
    service.affiliate_url ||
    service.url ||
    (domain ? `https://${domain}` : "#");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition"
      aria-label={`Open ${service.name}`}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-3 rounded-lg">
        <BrandIcon id={id} name={service.name} domain={domain} />
      </div>

      <h3 className="font-semibold text-lg">{service.name}</h3>
      <p className="muted text-sm">{service.category}</p>

      <div className="mt-4 w-full">
        <span className="btn btn-primary w-full block">Open →</span>
      </div>
    </a>
  );
}
