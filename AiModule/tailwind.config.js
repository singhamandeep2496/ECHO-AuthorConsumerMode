/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#f97316',
          hover: '#ea580c',
          light: '#fed7aa',
        },
        sidebar: {
          bg: '#fafafa',
          border: '#e5e7eb',
        }
      },
    },
  },
  plugins: [],
}
