/ @type {import('tailwindcss').Config} */;
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      important: true,
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
        KakaoYellow: '#FEE500',
      },
      screens: {
        mobile: {min: '62.5em'}
      },
      boxShadow: {
        content:
          'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
        comment:
          'rgba(27, 31, 35, 0.07) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
      },
    },
  },
  plugins: [],
};
