import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#325e19",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      accentColor: {
        primary: "#325e19",
      }
    },
  },
  plugins: [  ],
} satisfies Config;
