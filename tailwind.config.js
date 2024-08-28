/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bakbak: ['Bakbak One', 'sans-serif'],
        gothic: ['League Gothic', 'sans-serif'],
        spartan: ['League Spartan', 'sans-serif'],
      },
      colors: {
        yellow: {
          DEFAULT: "#ffeb39",
          50: "#fefde8",
          100: "#fffec2",
          200: "#fff889",
          300: "#ffeb39",
          400: "#fddc12",
          500: "#ecc106",
          600: "#cc9702",
          700: "#a36b05",
          800: "#86540d",
          900: "#724511",
          950: "#432405",

        }
      }
    },
  },
  plugins: [],
}

