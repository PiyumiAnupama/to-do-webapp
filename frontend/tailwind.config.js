// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // Scan all React components and TSX files for Tailwind classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Define custom colors for a clean, modern palette
      colors: {
        'primary-blue': '#4F46E5', // Indigo (used for accents/buttons)
        'primary-text': '#1F2937', // Dark gray (main text)
        'light-bg': '#f9fafb', // Very light gray (background)
      }
    },
  },
  plugins: [],
}