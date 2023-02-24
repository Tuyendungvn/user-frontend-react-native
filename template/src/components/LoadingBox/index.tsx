import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { responsive, colors } from '@common/styles';

type ISpinnerSize = 'large' | 'small';
interface ILoadingBox {
  height: number;
  width: number;
  spinnerSize: ISpinnerSize;
}

const LoadingBox: React.FC<ILoadingBox> = ({ height, width, spinnerSize }) => {
  return (
    <View
      style={{
        width: responsive(width),
        height: responsive(height),
        backgroundColor: colors.GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: responsive(10),
      }}>
      <ActivityIndicator
        size={spinnerSize}
        color={colors.PRIMARY}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      />
    </View>
  );
};

export default LoadingBox;
