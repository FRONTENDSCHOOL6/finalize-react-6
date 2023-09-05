/ @type {import('tailwindcss').Config} */;
export default {
  content: ['./index.html', './src//*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        suit: ['SUIT Variable'],
      },
      colors: {
        darkblue: '#013F4E',
        blue: '#00718F',
        lightblue: '#0BA5BE',
        sand: '#CFCBC8',
        green: '#576319',
        lightsand: '#EDF0F7',
      },
      screens: {
        sm: { min: '320px', max: '819px' },
        lg: { min: '820px' },
      },
    },
  },
  plugins: [],
};
