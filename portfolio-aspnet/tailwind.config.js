/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Pages/**/*.cshtml", "./Pages/**/*.cs"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        den: {
          wall: "#1f1c2c",
          dark: "#15131f",
          light: "#2d2844",
        },
        lamp: "#f4a261",
        "lamp-deep": "#e76f51",
        copper: "#c87a3a",
        crt: "#2a9d8f",
        amber: "#e9c46a",
        kitchen: "#f4a261",
        arcade: "#e9c46a",
        control: "#2a9d8f",
      },
      fontFamily: {
        hero: ["\"Chakra Petch\"", "sans-serif"],
        display: ["\"Chakra Petch\"", "sans-serif"],
        body: ["\"DM Sans\"", "sans-serif"],
        mono: ["\"JetBrains Mono\"", "monospace"],
      },
      animation: {
        "lamp-drift": "lamp-drift 8s ease-in-out infinite alternate",
        "crt-flicker": "crt-flicker 0.12s steps(2) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite alternate",
      },
      keyframes: {
        "lamp-drift": {
          "0%": { opacity: "0.7", transform: "scale(1)" },
          "100%": { opacity: "0.9", transform: "scale(1.05)" },
        },
        "crt-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.97" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse": {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
