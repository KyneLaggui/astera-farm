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
        galindo: ['Galindo', 'sans-serif'],
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
        },
        green: {
          DEFAULT: "#475900",
          50: "#fffce0",
          100: "#fffbbb",
          200: "#fffb80",
          300: "#feff37",
          400: "#f3ff00",
          500: "#d2ff00",
          600: "#a3d300",
          700: "#7b9f00",
          800: "#627b00",
          900: "#475900",
          950: "#293b00",
        },
        orange: {
          DEFAULT: "#e39a1f",
          50: "#fdfaed",
          100: "#faf0cb",
          200: "#f4e193",
          300: "#eecc5b",
          400: "#eab835",
          500: "#e39a1f",
          600: "#c97616",
          700: "#a75516",
          800: "#884218",
          900: "#703717",
          950: "#401c08",
        }
      }
    },
  },
  plugins: [],
}

