/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xs': '480px', // Custom extra small breakpoint
      'sm': '640px', // Custom small breakpoint
      'md': '876px', // Custom medium breakpoint
      'lg': '1024px', // Custom large breakpoint
      'xl': '1280px', // Custom extra-large breakpoint
    },
    extend: {},
  },
  plugins: [],
}
