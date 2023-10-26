/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '0px',
      'iphone':'440px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'mdlg':'800px',
      'lgsm':'940px',
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'night': '#131515',
        'jet': '#2B2C28',
        'jet-light': '#E1E1E1',
        'persian-green': '#339989',
        'tiffany-green': '#7DE2D1',
        'snow': '#FFFAFB',
        'purpleCTA': '#6941C6',
        'background-light':'#FFFCF4',
      }
    },
  },
  plugins: [],
}