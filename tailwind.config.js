/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "phone": "400px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        bakbak: ["Bakbak One", "sans-serif"],
        gothic: ["League Gothic", "sans-serif"],
        spartan: ["League Spartan", "sans-serif"],
        galindo: ["Galindo", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        shrikhand: ["Shrikhand", "sans-serif"],
        arapey: ["Arapey", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
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
          DEFAULT: "#ff5959",
          // 50: "#fdfaed",
          // 100: "#faf0cb",
          // 200: "#f4e193",
          // 300: "#eecc5b",
          // 400: "#eab835",
          // 500: "#e39a1f",
          // 600: "#c97616",
          // 700: "#a75516",
          // 800: "#884218",
          // 900: "#703717",
          // 950: "#401c08",
        },
        red: {
          DEFAULT: "#ff2b2b"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
