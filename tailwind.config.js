/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        gray: {
          DEFAULT: "hsla(var(--gray), <alpha-value>)",
          foreground: "hsla(var(--gray-foreground), <alpha-value>)",
          50: "hsla(var(--gray-50), <alpha-value>)",
          100: "hsla(var(--gray-100), <alpha-value>)",
          200: "hsla(var(--gray-200), <alpha-value>)",
          300: "hsla(var(--gray-300), <alpha-value>)",
          400: "hsla(var(--gray-400), <alpha-value>)",
          500: "hsla(var(--gray-500), <alpha-value>)",
          600: "hsla(var(--gray-600), <alpha-value>)",
          700: "hsla(var(--gray-700), <alpha-value>)",
          800: "hsla(var(--gray-800), <alpha-value>)",
          900: "hsla(var(--gray-900), <alpha-value>)",
        },

        primary: {
          DEFAULT: "hsla(var(--primary), <alpha-value>)",
          foreground: "hsla(var(--primary-foreground), <alpha-value>)",
          50: "hsla(var(--primary-50), <alpha-value>)",
          100: "hsla(var(--primary-100), <alpha-value>)",
          200: "hsla(var(--primary-200), <alpha-value>)",
          300: "hsla(var(--primary-300), <alpha-value>)",
          400: "hsla(var(--primary-400), <alpha-value>)",
          500: "hsla(var(--primary-500), <alpha-value>)",
          600: "hsla(var(--primary-600), <alpha-value>)",
          700: "hsla(var(--primary-700), <alpha-value>)",
          800: "hsla(var(--primary-800), <alpha-value>)",
          900: "hsla(var(--primary-900), <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          300: "hsla(var(--secondary-300), <alpha-value>)",
        },

        blue: {
          400: "#C7E8F4",
        },

        mivro: {
          red: "#DF5757",
          green: "#8CC54B",
          orange: "#F8A830",
          yellow: "#FED65A",
          blue: "#90D0FE",
        },
        white: {
          50: "#FCFDFD",
          main: "#FFFFFF",
        },
        spacing: {
          "9/16": "56.25%",
          "3/4": "75%",
          "1/1": "100%",
        },

        fontSize: {
          xs: "0.75rem",
          sm: "0.875rem",
          base: "1rem",
          lg: "1.125rem",
          xl: "1.25rem",
          "2xl": "1.5rem",
          "3xl": "2rem",
          "4xl": "2.5rem",
          "5xl": "3.25rem",
          "6xl": "4rem",
        },
        inset: {
          full: "100%",
        },
        letterSpacing: {
          tighter: "-0.02em",
          tight: "-0.01em",
          normal: "0",
          wide: "0.01em",
          wider: "0.02em",
          widest: "0.4em",
        },
        minWidth: {
          10: "2.5rem",
        },
        scale: {
          98: ".98",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        "fadein-opacity": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fadein-opacity": "fadein-opacity 0.6s ease-in-out",
        spin: "spin .5s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities, theme, e }) {
      const colors = theme("colors");
      const utilities = {};

      const colorList = ["gray", "primary", "secondary", "blue", "white"];
      const shadeList = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

      colorList.forEach((color) => {
        shadeList.forEach((shade) => {
          const colorValue = colors[color] && colors[color][shade];
          if (typeof colorValue === "string") {
            for (let i = 0; i <= 100; i += 5) {
              utilities[`.shadow-inset-${color}-${shade}-${i}`] = {
                boxShadow: colorValue.includes("<alpha-value>")
                  ? `inset 0 -1.5px 0 0 ${colorValue.replace(
                      "<alpha-value>",
                      i / 100,
                    )}`
                  : `inset 0 -1.5px 0 0 ${colorValue}`,
              };
            }
          }
        });
      });

      addUtilities(utilities, ["responsive", "hover"]);
    }),
  ],
};
