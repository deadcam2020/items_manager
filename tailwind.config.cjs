/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#3A00B0",
          300: "#16006c",
          900: "#06001e",
        },
      },
    },
  },
  plugins: [],
};