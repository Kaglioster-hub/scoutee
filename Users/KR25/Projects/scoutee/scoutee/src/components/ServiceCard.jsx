"use client";
import { useState } from "react";

export default function ServiceCard({ service }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={service.affiliate_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card flex flex-col items-center justify-between text-center"
    >
      <div className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-white/10">
        {!imgError && service.icon.startsWith("http") ? (
          <img
            src={service.icon}
            alt={service.name}
            className="w-10 h-10 object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-3xl">{service.icon}</span>
        )}
      </div>
      <h3 className="font-semibold text-lg">{service.name}</h3>
      <p className="muted text-sm">{service.category}</p>
      <button className="btn btn-primary mt-3 w-full">Open →</button>
    </a>
  );
}
