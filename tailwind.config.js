/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'Bright-Blue': 'hsl(220, 98%, 61%)',
        'light-Very-Light-Gray': 'hsl(0, 0%, 98%)',
        'light-Very-Light-Grayish-Blue': 'hsl(236, 33%, 92%)',
        'light-Grayish-Blue': 'hsl(233, 11%, 84%)',
        'light-Dark-Grayish-Blue': 'hsl(236, 9%, 61%)',
        'light-Very-Dark-Grayish-Blue': 'hsl(235, 19%, 35%)',
        'dark-Very-Dark-Blue': 'hsl(235, 21%, 11%)',
        'dark-Very-Dark-Desaturated-Blue': 'hsl(235, 24%, 19%)',
        'dark-Light-Grayish-Blue': 'hsl(234, 39%, 85%)',
        'dark-Light-Grayish-Blue-hover': 'hsl(236, 33%, 92%)',
        'dark-Dark-Grayish-Blue': 'hsl(234, 11%, 52%)',
        'dark-Very-Dark-Grayish-Blue': 'hsl(233, 14%, 35%)',
        'dark-Very-Dark-Grayish-Blue': 'hsl(237, 14%, 26%)',
        'check-background-start': 'hsl(192, 100%, 67%)',
        'check-background-end': 'hsl(280, 87%, 65%)',
      },
    },
    backgroundImage: {
      'desktop-light': 'url("/bg-desktop-light.jpg")',
      'desktop-dark': 'url("/bg-desktop-dark.jpg")',
      'mobile-light': 'url("/bg-mobile-light.jpg")',
      'mobile-dark': 'url("/bg-mobile-dark.jpg")',
    },
  },
  plugins: [],
};
