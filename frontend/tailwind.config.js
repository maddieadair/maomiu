/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        paper: '#f4f2e6',
        cozyWhite: '#FBF9F8',
        snowWhite: '#f5f7f7',
        toastedWhite: '#f4f1ea',
        milkyWhite: '#f4f2ed',
        sesame: '#151515',
        lightGrey: '#7A7A7A',
      },
      fontFamily: {
        walsheim: ['var(--font-walsheim)'],
        walsheimMed: ['var(--font-walsheimMed)'],
        walsheimBold: ['var(--font-walsheimBold)'],
        walsheimBlack: ['var(--font-walsheimBlack)'],

        takeoffBold: ['var(--font-takeoffBold)'],
        takeoffSlim: ['var(--font-takeoffSlim)'],
        takeoffBlack: ['var(--font-takeoffBlack)'],
        goodnight: ['var(--font-goodnight)'],

      },
    },
  },
  plugins: [],
}
