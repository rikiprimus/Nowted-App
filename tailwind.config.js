/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      'purple': '#312EB5',
      'white': '#FFFFFF',
      'light-background': '#f3f6f4',
      'light-1': '#E6EBEA',
      'light-3': 'rgba(024, 024, 024, 0.03)',
      'light-10': 'rgba(024, 024, 024, 0.10)',
      'light-20': 'rgba(024, 024, 024, 0.20)',
      'light-40': 'rgba(024, 024, 024, 0.40)',
      'light-60': 'rgba(024, 024, 024, 0.60)',
      'dark-background': '#181818',
      'dark-1': '#1C1C1C',
      'dark-3' : 'rgba(255, 255, 255, 0.03)',
      'dark-10' : 'rgba(255, 255, 255, 0.10)',
      'dark-20' : 'rgba(255, 255, 255, 0.20)',
      'dark-40' : 'rgba(255, 255, 255, 0.40)',
      'dark-60' : 'rgba(255, 255, 255, 0.60)',
    },
    screens: {
      desktop: '1560px',
    },
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif']
      },
      backgroundImage: {
        'button-gradient': 'radial-gradient(circle at 68.3% -18.3%, #b5b5f2 0, #b5b5f2 50%, #b5b5f2 100%)',
      }
    },
  },
  plugins: [],
}