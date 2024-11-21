/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(178.6deg, rgb(232, 245, 253) 3.3%, rgb(252, 253, 255) 109.6%)',
      },
      colors: {
        'custom-cyan': 'rgb(0, 212, 212)', 
      },
    },
  },
  plugins: [],
}