/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        smoke: "#6f6f6f",
        dune: "#333333",
        ash: "#C7C7C7",
        silver: "#a8a8a8",
        granite: "#646464",
        pearl: "#fafafa",
        carbon: "#e5e5e5"

      },

      fontFamily: {
        sans: ['var(--font-inter)'],
        newsreader: ['var(--font-newsreader)'],
        fanwood: ['var(--font-fanwood)'],
        SMGoudy: ['var(--font-SMGoudy)'],
      },

    },
  },
  plugins: [],
};
