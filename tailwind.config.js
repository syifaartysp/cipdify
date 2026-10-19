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
        'powder-blue': '#DCE7F7',
        'lavender': '#C9C2E5',
        'soft-bg': '#F8F9FF',
        'slate-text': '#55536F',
      },
      animation: {
        'spin-slow': 'spinSlow 12s linear infinite',
      },
    },
  },
  plugins: [],
}