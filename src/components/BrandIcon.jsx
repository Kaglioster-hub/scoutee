'use client';
import { useMemo, useState } from 'react';

export default function BrandIcon({ id, name, domain, className = '' }) {
  // 1) logo locale (se presente in /public/logos/{id}.svg) - Rimosso, non più necessario
  const local = id ? `/logos/${id}.svg` : undefined;

  // 2) favicon Google S2, 3) Clearbit, 4) DuckDuckGo
  const google = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : undefined;
  const clearbit = domain ? `https://logo.clearbit.com/${domain}` : undefined;
  const duck = domain ? `https://icons.duckduckgo.com/ip3/${domain}.ico` : undefined;

  // Costruzione della catena di fallback per le icone
  const chain = useMemo(() => [google, clearbit, duck].filter(Boolean), [google, clearbit, duck]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  function onError() {
    setIdx((i) => (i + 1 < chain.length ? i + 1 : i));
  }

  const src = chain[idx] || '';  // Se non ci sono più fallback, si avrà una stringa vuota

  // Placeholder finale (iniziale del brand) quando la catena di fallback termina
  if (!src || idx === chain.length - 1) {
    return (
      <div
        className={`w-12 h-12 md:w-14 md:h-14 rounded-md bg-white/80 dark:bg-white/10 grid place-items-center shadow ${className}`}
        aria-label={`${name} logo`}
        title={name}
      >
        <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
          {(name?.[0] || '?').toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      onError={onError}  // Fallback nel caso in cui l'icona non si carichi
      onLoad={() => setLoading(false)}  // Quando l'icona è caricata, setta lo stato a non più carico
      loading="lazy"  // Caricamento pigro per ottimizzare la performance
      decoding="async"  // Decodifica asincrona per il caricamento delle immagini
      className={`w-12 h-12 md:w-14 md:h-14 rounded-md object-contain bg-white/80 dark:bg-white/10 p-1 shadow ${className}`}
      style={{ opacity: loading ? 0.5 : 1 }}  // Opacità al 50% durante il caricamento
    />
  );
}
