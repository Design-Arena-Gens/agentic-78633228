import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-yellow': '#FFEC00',
        'neo-pink': '#FF006E',
        'neo-cyan': '#00F5FF',
        'neo-green': '#00FF94',
        'neo-purple': '#9D00FF',
        'neo-orange': '#FF6B00',
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px #000',
        'brutal-lg': '12px 12px 0px 0px #000',
        'brutal-xl': '16px 16px 0px 0px #000',
      },
    },
  },
  plugins: [],
};
export default config;
