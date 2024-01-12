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
      'light-grey': '#757780',
      'green': '#3aa96a',
      'blue': '#1d73e8',
      'navy-blue': '#1B2E6B',
      'light-blue': '#b7d9f5',
      'grey-light': '#F6F8F9',
      'gray': '#f3f2f2',
      'red': '#ff0000',
      'border': '#f2f3f7',
      'black': '#000000',
      'blueback': '#F8FCFF',
      'primary-colorback': '#F9DE8C',
      'light-gray': '#DDE2E4',
      'light-black': '#455A64',
      'shadow-color': '#C8FFFF',
      'text-color': '#404041',
      'orange': '#FFBA00',
      'yellow': '#DFD935',
      'dark-yellow': '#D47A11',
      'blacks': '#18181B',
      'greys': '#B6B6B6',
      'info': '#FFC727',
      'black-dark': '#101828',
      'shaded-blue': '#667085',
      'back-dark': '#EAECF0',
      'grey88': '#E0E0E0',
      'baby-blue': '#D8FFFF',
      'granite-gray': '#676767',
      'white-grey': '#B2B2B2',
      'gray58': '#949494',
      'gray48': '#52575C',
      'oranges': '#FF9900',
      'brown': '#834F00',
      'cyan': '#00B8B8',
      'dark-grey': '#4C4C4C',
      'peach': '#FFF0DA',
      'Gray40': '#666666',
      'pantone': '#DDDDDD',
      'Gray53': '#878787',
      'black2': '#282828',
      'Gray30': '#4D4D4D',
      'Gray49': '#7D7D7D',
      'light-red': '#E3A903',
      'light-cyan': '#F1FFFF',
      'White Smoke': '#F3F3F3',
      'light-yellow': '#FFFAE9',
      'dark-red': '#BC0000',
      'blue-light': '#E8EDF1',
      'aluminium': '#A7A9AC',
      'gray12': '#D9D9D9',
      'gray2': '#6C757D'
    },
    extend: {}
  },
  plugins: [],
}

