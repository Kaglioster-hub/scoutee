'use client';
import { useMemo, useState } from 'react';

export default function BrandIcon({ id, name, domain, className = '' }) {
  // 1) logo locale (se presente in /public/logos/{id}.svg)
  const local = id ? `/logos/${id}.svg` : undefined;

  // 2) favicon Google S2, 3) Clearbit, 4) DuckDuckGo
  const google = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : undefined;
  const clearbit = domain ? `https://logo.clearbit.com/${domain}` : undefined;
  const duck = domain ? `https://icons.duckduckgo.com/ip3/${domain}.ico` : undefined;

  const chain = useMemo(() => [local, google, clearbit, duck].filter(Boolean), [local, google, clearbit, duck]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  function onError() {
    setIdx((i) => (i + 1 < chain.length ? i + 1 : i));
  }

  const src = chain[idx] || '';

  // placeholder finale (iniziale del brand) quando la chain termina
  if (!src || idx === chain.length - 1) {
    return (
      <div
        className={`w-10 h-10 rounded-md bg-white/80 dark:bg-white/10 grid place-items-center shadow ${className}`}
        aria-label={`${name} logo`}
        title={name}
      >
        <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
          {(name?.[0] || '?').toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      onError={onError}
      onLoad={() => setLoading(false)}
      loading="lazy"
      decoding="async"
      className={`w-10 h-10 rounded-md object-contain bg-white/80 dark:bg-white/10 p-1 shadow ${className}`}
      style={{ opacity: loading ? 0.5 : 1 }}
    />
  );
}
