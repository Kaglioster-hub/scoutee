"use client";

export default function ServiceCard({ service }) {
  return (
    <div className="card pop flex flex-col items-center text-center p-4">
      {/* Logo servizio */}
      <div className="w-10 h-10 flex items-center justify-center mb-2">
        {service.icon ? (
          <img
            src={service.icon}
            alt={`${service.name} logo`}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <span className="text-2xl">🌐</span>
        )}
      </div>

      {/* Nome e categoria */}
      <h3 className="font-semibold text-base">{service.name}</h3>
      <p className="muted text-xs mb-3">{service.category || "Service"}</p>

      {/* Bottone */}
      <a
        href={service.affiliate_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary w-full text-sm py-1.5"
      >
        Open →
      </a>
    </div>
  );
}
