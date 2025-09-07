"use client";

export default function EmergencyCard({ country, iso, numbers }) {
  const flag = iso === "ALL" ? "🌍" : isoToFlag(iso);

  return (
    <div className="card-sos pop p-4 flex flex-col gap-3">
      {/* Intestazione */}
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <span className="text-2xl">{flag}</span>
        {country}
      </h3>

      {/* Lista numeri di emergenza */}
      <ul className="space-y-1 text-sm">
        {Object.entries(numbers).map(([type, num]) => (
          <li
            key={type}
            className="flex justify-between items-center border-b border-gray-700/30 pb-1 last:border-0"
          >
            <span className="capitalize text-gray-400 dark:text-gray-300">{type}</span>
            <span className="font-bold text-red-600 dark:text-red-400">
              {num}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Funzione di supporto ISO → emoji bandiera */
function isoToFlag(iso) {
  if (!iso) return "🌍";
  return iso
    .toUpperCase()
    .replace(/./g, (c) =>
      String.fromCodePoint(127397 + c.charCodeAt())
    );
}
