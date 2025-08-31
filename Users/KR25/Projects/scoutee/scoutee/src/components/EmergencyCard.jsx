export default function EmergencyCard({ country, iso, numbers }) {
  const flag = iso === "ALL" ? "🌍" : isoToFlag(iso);

  return (
    <div className="card-sos">
      <h3 className="flex items-center gap-2">
        <span className="text-2xl">{flag}</span> {country}
      </h3>
      <ul>
        {Object.entries(numbers).map(([type, num]) => (
          <li key={type}>
            <span>{type}</span>: <span>{num}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Funzione di supporto per convertire ISO → emoji bandiera */
function isoToFlag(iso) {
  if (!iso) return "🌍";
  return iso
    .toUpperCase()
    .replace(/./g, (c) =>
      String.fromCodePoint(127397 + c.charCodeAt())
    );
}
