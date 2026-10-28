/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mach: {
          black: '#080808',
          dark: '#0e0e0e',
          card: '#141414',
          border: '#242424',
          orange: '#FF5500',
          'orange-glow': '#FF6A00',
          'orange-light': '#FFA066',
          cyan: '#00E5FF'
        }
      },
      fontFamily: {
        heading: ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
