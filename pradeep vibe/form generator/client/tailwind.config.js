/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fffbf9',
          100: '#ffefe6',
          200: '#ffd0b8',
          300: '#ffaf85',
          400: '#ff8c57',
          500: '#ff6b2b',
          600: '#f04f0a',
          700: '#c73e05',
          800: '#9e330a',
          900: '#7e2d0f',
          950: '#451505',
        },
        vibe: {
          teal: '#008080',
          dark: '#1a1a1a',
          light: '#f5f5f5',
          official: '#003366', // Dark official blue
          saffron: '#FF9933',  // Indian Flag Saffron
          festival: '#FF3366', // Vibrant Pink/Red
          marigold: '#FFB700', // Marigold Yellow
        }
      },
      fontFamily: {
        // We can add Google Fonts later here
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
