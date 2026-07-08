/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf6ec',
          100: '#f9e7cd',
          200: '#f2cd97',
          300: '#eaad5c',
          400: '#e39236',
          500: '#d47a22',
          600: '#bb601b',
          700: '#96461a',
          800: '#79381c',
          900: '#632f1a',
        },
        cream: '#fdfaf4',
        ink: '#2c2420',
      },
      fontFamily: {
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -8px rgba(120, 72, 28, 0.25)',
        card: '0 2px 12px -4px rgba(44, 36, 32, 0.12)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
};
