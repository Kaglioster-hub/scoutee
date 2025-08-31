// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}" // <- aggiunto
  ],
  theme: {
    extend: {
      colors: {
        primary: { light: "#818cf8", DEFAULT: "#6366f1", dark: "#4f46e5" },
        accent: { pink: "#ec4899", violet: "#a855f7", cyan: "#22d3ee" },
        comfort: { light: "#f8f9fa", dark: "#0b0f19" },
        sos: "#ef4444"
      },
      fontFamily: {
        sans: ["Inter", "Nunito", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 20px rgba(99,102,241,.35)",
        card: "0 4px 14px rgba(0,0,0,0.1)"
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem"
      }
    }
  },
  plugins: []
};
