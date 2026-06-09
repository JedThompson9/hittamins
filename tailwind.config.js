/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        hittamins: {
          black: '#0A0A0A',
          dark: '#1A1A1A',
          green: '#8FBF8F',
          'dark-green': '#1C2A1C',
          cyan: '#3ECFCF',
          blue: '#1A8FFF',
          text: '#F0F0F0',
          muted: '#888888',
          red: '#CC2200',
          border: '#2A2A2A',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
