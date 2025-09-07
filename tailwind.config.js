// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./public/**/*.html",
  ],
  // Se usi classi costruite a runtime (es. `bg-${color}-500`) questa safelist evita che vengano "spurgate" in build.
  // Se NON le usi, puoi rimuovere l'intero blocco `safelist`.
  safelist: [
    { pattern: /(bg|text|border|from|to|via|ring)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)/ },
    { pattern: /(hover|focus):(bg|text|border)-(red|green|blue|indigo|pink|gray)-(400|500|600)/ },
    { pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/ },
    { pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/ },
    { pattern: /p[trblxy]?-(0|0\.5|1|1\.5|2|3|4|5|6|8|10|12)/ },
  ],
  theme: {
    extend: {
      colors: {
        primary: { light: "#818cf8", DEFAULT: "#6366f1", dark: "#4f46e5" },
        accent: { pink: "#ec4899", violet: "#a855f7", cyan: "#22d3ee" },
        comfort: { light: "#f8f9fa", dark: "#0b0f19" },
        sos: "#ef4444",
      },
      fontFamily: { sans: ["Inter", "Nunito", "system-ui", "sans-serif"] },
      boxShadow: {
        glow: "0 0 20px rgba(99,102,241,.35)",
        card: "0 4px 14px rgba(0,0,0,0.1)",
        soft: "0 2px 6px rgba(0,0,0,0.06)",
        strong: "0 6px 20px rgba(0,0,0,0.15)",
      },
      borderRadius: { xl: "1.25rem", "2xl": "1.75rem", "3xl": "2.25rem" },
      keyframes: {
        fadeIn: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pop: { "0%": { transform: "scale(0.96)" }, "100%": { transform: "scale(1)" } },
      },
      animation: { "fade-in": "fadeIn 0.6s ease forwards", pop: "pop 0.18s ease-out", "spin-slow": "spin 6s linear infinite" },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
