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
    colors: {
      'primary-color': '#e8b810',
      'white': '#ffffff',
      'grey': '#8a92a6',
      'green': '#3aa96a',
      'blue': '#1d73e8',
      'light-blue': '#b7d9f5',
      'gray': '#f3f2f2',
      'red': '#ff0000',
      'background-white': '#ffffff',
      'gray-sideBar': '#bdbdbd',
      'border': '#f2f3f7',
      'menu_icon': '#8a92a6',
      'black': '#000000',
      'blueback': '#F8FCFF',
      'primary-colorback': '#F9DE8C',
    },
    extend: {}
  },
  plugins: [],
}

