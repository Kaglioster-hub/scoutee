"use client";
import { useState } from "react";

export default function ServiceCard({ service }) {
  const [imgError, setImgError] = useState(false);

  // fallback icona
  const renderIcon = () => {
    if (!imgError && service.icon?.startsWith("http")) {
      return (
        <img
          src={service.icon}
          alt={`${service.name} logo`}
          className="w-10 h-10 object-contain"
          onError={() => setImgError(true)}
        />
      );
    }
    return (
      <span className="text-3xl">
        {service.icon || "🌐"}
      </span>
    );
  };

  return (
    <a
      href={service.affiliate_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition"
      aria-label={`Open ${service.name}`}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-white/10">
        {renderIcon()}
      </div>

      <h3 className="font-semibold text-lg">{service.name}</h3>
      <p className="muted text-sm">{service.category}</p>

      <div className="mt-4 w-full">
        <span className="btn btn-primary w-full block">Open →</span>
      </div>
    </a>
  );
}
