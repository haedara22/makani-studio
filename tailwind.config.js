/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    container: {
      padding: '15px',
    },
    screens: {
      sm: "680px",
      md: "760px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: { 
        primary: "rgb(245 245 245 / var(--tw-bg-opacity, 1))",
        secondary: "#0B2447",
        accent: {
          Default: "rgb(219 195 30)",
          hover: "#27272c",
        },
        primaryText: "#27272c"
      },
       backgroundImage: {
        "accent-gold": "linear-gradient(90deg, rgb(180,160,25) 0%, rgb(219,195,30) 0%, white 50%, rgb(219,195,30) 70%, rgb(180,160,25) 100%)"
      },
      fontFamily: {
        primary: "var(--font-jetbrainsMono)"
      },
       animation: {
        'spin-3d-complex': 'rotate-3d-cube 10s linear infinite',
      },
      keyframes: {
        'rotate-3d-cube': {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg)' },
        }
      }
    },
  },
  plugins: [],
};
