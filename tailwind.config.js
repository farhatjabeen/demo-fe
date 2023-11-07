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
    },
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite',
        marquee2: 'marquee2 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}

