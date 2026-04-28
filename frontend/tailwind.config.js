/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The signature JobGrids palette
        'jg-blue': {
          DEFAULT: '#2042e3',
          light: '#eef2ff', // For light backgrounds/badges
          dark: '#1a35b8',  // For hover states
        },
        'jg-dark': {
          DEFAULT: '#081828', // The deep navy text from the video
          muted: '#5d6d7e',   // For secondary text/descriptions
        },
        'jg-bg': '#ffffff',   // Pure white background
      },
      fontFamily: {
        // JobGrids uses a clean, modern sans-serif
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // The specific 'soft' corners seen in the template cards
        'jg': '10px',
        'jg-lg': '20px',
      },
      boxShadow: {
        // The soft blue glow seen behind the search bar and cards
        'jg-card': '0 10px 30px rgba(32, 66, 227, 0.08)',
        'jg-hero': '0 20px 50px rgba(32, 66, 227, 0.12)',
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
}