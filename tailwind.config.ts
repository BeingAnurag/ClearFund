import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F14',
        surface: '#121820',
        border: 'rgba(255,255,255,0.08)',
        accent: {
          DEFAULT: '#1DD1B8',
          hover: '#15A894', // Added for hover states
        },
        accentSoft: 'rgba(29,209,184,0.15)',
        textPrimary: '#FFFFFF',
        textSecondary: '#9BA4B0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;