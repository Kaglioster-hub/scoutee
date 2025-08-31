// tailwind.config.js
module.exports = {
  darkMode: "class", // usa classi per dark mode toggle
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // basta questa, copre app+components
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#818cf8",
          DEFAULT: "#6366f1",
          dark: "#4f46e5",
        },
        accent: {
          pink: "#ec4899",
          violet: "#a855f7",
          cyan: "#22d3ee",
        },
        comfort: {
          light: "#f8f9fa",
          dark: "#0b0f19",
        },
        sos: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "Nunito", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(99,102,241,.35)",
        card: "0 4px 14px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.96)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        pop: "pop 0.18s ease-out",
      },
    },
  },
  plugins: [],
};
