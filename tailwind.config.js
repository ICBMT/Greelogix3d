/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#060606",
        coal: "#0c0c0c",
        smoke: "#131311",
        line: "rgba(255,255,255,0.09)",
        orange: { DEFAULT: "#ff4d1c", soft: "#ff6a3d", dim: "#3a150b" },
        cream: "#f4f1ea",
        mute: "#9b978e",
      },
      fontFamily: {
        display: ["Archivo", "sans-serif"],
        body: ["Archivo", "sans-serif"],
      },
      letterSpacing: { widest2: "0.32em" },
    },
  },
  plugins: [],
};
