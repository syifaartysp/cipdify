/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cherry-pink': '#D93678',
        'bubblegum-pink': '#F8C3D9',
        'berry': '#8F2856',
        'lavender': '#E4D5FF',
        'blush-bg': '#FFF0F5',
        'dark-plum': '#48243A',
        'dark-bg': '#1A1218',
        'dark-card': '#281C25',
        'dark-border': '#3D2838',
      },
      animation: {
        'spin-slow': 'spinSlow 12s linear infinite',
      },
    },
  },
  plugins: [],
}