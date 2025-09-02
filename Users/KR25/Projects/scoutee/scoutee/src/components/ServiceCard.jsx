"use client";
import { useState } from "react";

// Import da @icons-pack/react-simple-icons
import {
  // 🚖 Mobility
  SiUber,
  SiLyft,
  SiBolt,
  SiBlablacar,
  // 🏨 Travel & booking
  SiAirbnb,
  SiBookingdotcom,
  SiExpedia,
  SiSkyscanner,
  // 💳 Fintech & payments
  SiRevolut,
  SiWise,
  SiPaypal,
  SiStripe,
  SiVisa,
  SiMastercard,
  SiN26,
  SiMonzo,
  SiCurve,
  // 🌍 Maps & tools
  SiGooglemaps,
  SiWaze,
  SiOpenstreetmap,
  // 📱 Communication
  SiWhatsapp,
  SiTelegram,
  SiSignal,
  // 🛒 Shopping & lifestyle
  SiAmazon,
  SiEbay,
} from "@icons-pack/react-simple-icons";

// 🔗 Brand mapping coerente con scoutee_master.json
function getBrandIcon(name) {
  const map = {
    // Mobility
    Uber: SiUber,
    Lyft: SiLyft,
    Bolt: SiBolt,
    BlaBlaCar: SiBlablacar,
    "FREE NOW": SiUber, // fallback → usa Uber
    Enjoy: SiUber,      // fallback → stessa categoria

    // Travel
    Airbnb: SiAirbnb,
    "Booking.com": SiBookingdotcom,
    Expedia: SiExpedia,
    Skyscanner: SiSkyscanner,
    "Hotels.com": SiBookingdotcom, // fallback booking
    Hostelworld: SiAirbnb,         // fallback generico

    // Fintech
    Revolut: SiRevolut,
    "Revolut Business": SiRevolut,
    Wise: SiWise,
    "Wise Business": SiWise,
    PayPal: SiPaypal,
    Stripe: SiStripe,
    Visa: SiVisa,
    Mastercard: SiMastercard,
    N26: SiN26,
    Monzo: SiMonzo,
    Curve: SiCurve,
    Lydia: SiPaypal, // fallback

    // Maps
    Citymapper: SiGooglemaps,
    Moovit: SiGooglemaps,
    "Google Maps": SiGooglemaps,
    Waze: SiWaze,
    OpenStreetMap: SiOpenstreetmap,

    // Messaging
    WhatsApp: SiWhatsapp,
    Telegram: SiTelegram,
    Signal: SiSignal,

    // Shopping & lifestyle
    Amazon: SiAmazon,
    eBay: SiEbay,
  };

  return map[name] || null;
}

export default function ServiceCard({ service }) {
  const [imgError, setImgError] = useState(false);

  const renderIcon = () => {
    // 1. icona libreria se disponibile
    const BrandIcon = getBrandIcon(service.name);
    if (BrandIcon) {
      return <BrandIcon size={40} title={service.name} />;
    }

    // 2. immagine custom se URL (tipo clearbit logos)
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

    // 3. fallback emoji definita nel JSON o 🌐
    return <span className="text-3xl">{service.icon || "🌐"}</span>;
  };

  return (
    <a
      href={service.affiliate_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition"
      aria-label={`Open ${service.name}`}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-3 rounded-lg bg-white/10">
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
