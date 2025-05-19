/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          400: '#6366f1', // indigo-400
          500: '#4f46e5', // indigo-500
          600: '#4338ca', // indigo-600
        },
        'secondary': {
          400: '#a855f7', // purple-400
          500: '#9333ea', // purple-500
          600: '#7e22ce', // purple-600
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      boxShadow: {
        'glow': '0 0 15px -2px rgba(167, 139, 250, 0.4)',
      },
    },
  },
  plugins: [],
};