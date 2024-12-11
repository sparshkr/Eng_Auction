import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '350px',
        mu: { max: '768px' },
        ms: { max: '400px' },
        msx: { max: '375px' },
        'max-h-816': { raw: '(max-height: 816px)' },
        'not-md': { raw: '(max-width: 767px)' },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        manrope: ["'Manrope'", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
