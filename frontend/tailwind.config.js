/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",          // Required for Vite
    "./src/**/*.{js,jsx,ts,tsx}", // For React components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),  // Add this line
  ],
};
