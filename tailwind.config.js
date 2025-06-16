// Project: Tailwind CSS Config for Next.js with Radix UI and Shadcn UI
/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  prefix: "",

  theme: {
    screens: {
      xs: "480px", // Small mobile and up
      md: "640px", // Mobile -> Tablet
      tab: "800px", // Medium Tablet
      lg: "961px", // Desktop
      xl: "1200px",
      "2xl": "1400px",
      "4xl": "1800px",
      "5xl": "2200px",
    },

    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "Montserrat", "system-ui", "-apple-system", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
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
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Modern utility colors
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
      },
      opacity: {
        82: "0.82",
        60: "0.58",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      boxShadow: {
        xs: "0px 3px 7px 0px rgba(27, 40, 57, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

// -- DEBUGGING -- Uncomment to utput to JSON to see the final config

// const fs = require('fs')
// const config = require('./tailwind.config.js')

// fs.writeFileSync(
// 	'tailwind-config-debug.json',
// 	JSON.stringify(tailwindConfig, null, 2),
// )

module.exports = tailwindConfig;
