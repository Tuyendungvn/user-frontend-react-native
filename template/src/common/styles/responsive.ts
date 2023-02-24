import { Platform, PixelRatio, Dimensions } from 'react-native';
export const responsive = (size: number) => {
  // based on iPhone X's scale
  const { width } = Dimensions.get('window');
  const SCALE_FACTOR = width / 375;

  const newSize = size * SCALE_FACTOR;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};
export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;

export const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height >= 812 || width >= 812 || height >= 896 || width >= 896)
  );
};
export const StatusBarHeight = Platform.select({
  ios: isIphoneX() ? 44 : 20,
  android: 0,
  default: 0,
});
export const responsiveByHeight = (size: number) => {
  // based on iPhone X's scale
  const SCALE_FACTOR = height / 812;

  const newSize = size * SCALE_FACTOR;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};
