import {TextStyle} from 'react-native';

import {colors} from './colors';
import {responsive} from './responsive';

const bold: TextStyle = {
  color: colors.BLACK,
  fontWeight: '700',
};
const regular: TextStyle = {
  color: colors.BLACK,
  fontWeight: '600',
};
const medium: TextStyle = {
  color: colors.BLACK,
  fontWeight: '500',
};
const normal: TextStyle = {
  color: colors.BLACK,
  fontWeight: '400',
};

export const typos = {
  xl4: {...bold, fontSize: responsive(48), lineHeight: responsive(50)},
  xl3: {...bold, fontSize: responsive(36), lineHeight: responsive(38)},
  xl2: {...bold, fontSize: responsive(32), lineHeight: responsive(34)},
  xxl: {
    regular: {
      ...regular,
      fontSize: responsive(26),
      // lineHeight: responsive(27),
    },
    medium: {
      ...medium,
      fontSize: responsive(26),
      // lineHeight: responsive(27)
    },
    bold: {
      ...bold,
      fontSize: responsive(26),
      // lineHeight: responsive(27.3)
    },
    normal: {
      ...normal,
      fontSize: responsive(26),
      //  lineHeight: responsive(27)
    },
  },
  xl: {
    regular: {
      ...regular,
      fontSize: responsive(20),
      // lineHeight: responsive(21),
    },
    medium: {
      ...medium,
      fontSize: responsive(20),
      // lineHeight: responsive(21),
    },
    bold: {
      ...bold,
      fontSize: responsive(20),
      // lineHeight: responsive(21)
    },
    normal: {
      ...normal,
      fontSize: responsive(20),
      // lineHeight: responsive(21),
    },
  },
  lg: {
    regular: {
      ...regular,
      fontSize: responsive(16),
      // lineHeight: responsive(17),
    },
    medium: {
      ...medium,
      fontSize: responsive(16),
      // lineHeight: responsive(17),
    },
    bold: {
      ...bold,
      fontSize: responsive(16),
      //  lineHeight: responsive(17)
    },
    normal: {
      ...normal,
      fontSize: responsive(16),
      // lineHeight: responsive(17),
    },
  },
  sm: {
    regular: {
      ...regular,
      fontSize: responsive(14),
      // lineHeight: responsive(14.7),
    },
    medium: {
      ...medium,
      fontSize: responsive(14),
      // lineHeight: responsive(15),
    },
    normal: {
      ...normal,
      fontSize: responsive(14),
      // lineHeight: responsive(15),
    },
    bold: {
      ...bold,
      fontSize: responsive(14),
      //  lineHeight: responsive(15)
    },
  },
  xs: {
    regular: {
      ...regular,
      fontSize: responsive(13),
      // lineHeight: responsive(14),
    },
    medium: {
      ...medium,
      fontSize: responsive(13),
      // lineHeight: responsive(14),
    },
    bold: {
      ...bold,
      fontSize: responsive(13),
      //  lineHeight: responsive(14)
    },
    normal: {
      ...normal,
      fontSize: responsive(13),
      // lineHeight: responsive(14),
    },
  },
  xs2: {
    ...regular,
    fontSize: responsive(11),

    // lineHeight: responsive(12)
  },
};
