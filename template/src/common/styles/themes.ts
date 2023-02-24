import { extendTheme } from 'native-base';

export const themes = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#EA4E1B',
      100: '#EA4E1B',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    secondary: {
      100: '#A2D4EC',
    },
    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      100: 'rgba(234, 78, 27, 0.06)',
    },
    body: {
      100: '#8A8A8A',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
  sizes: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    15: 15,
    20: 20,
    25: 25,
    30: 30,
    35: 35,
    40: 40,
    45: 45,
    55: 55,
    60: 60,
    65: 65,
    70: 70,
    75: 75,
    80: 80,
    90: 90,
    100: 100,
    105: 105,
    110: 110,
    115: 115,
    200: 200,
    300: 300,
    400: 400,
    500: 500,
    600: 600,
    700: 700,
    800: 800,
    900: 900,
    950: 950,
  },
});
