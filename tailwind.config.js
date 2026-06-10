/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          mint: '#8FBF8F',
          blue: '#4A90C4',
          navy: '#1A3A5C',
          sky: '#6AAFCF',
          teal: '#5BA8A0',
          light: '#F4F8FB',
          soft: '#EAF2F8',
          border: '#C8DFF0',
          muted: '#6B8FAA',
          text: '#1A2D3D',
          white: '#FFFFFF',
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
