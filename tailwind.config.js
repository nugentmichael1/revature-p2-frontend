/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff0e9',
          100: '#fed0ba',
          200: '#feb998',
          300: '#fe9869',
          400: '#fd854c',
          500: '#fd661f',
          600: '#e65d1c',
          700: '#b44816',
          800: '#8b3811',
          900: '#6a2b0d',
        },
        secondary: {
          50: '#f0f5fe',
          100: '#d0e0fa',
          200: '#bad1f8',
          300: '#9abdf5',
          400: '#86b0f3',
          500: '#689cf0',
          600: '#5f8eda',
          700: '#4a6faa',
          800: '#395684',
          900: '#2c4265',
        },
        status: { success: '#00B087', error: '#FFC5C5' },
      },
    },
  },
  plugins: [],
};
