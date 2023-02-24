import { StatusBar, useColorScheme } from 'react-native';
import React from 'react';
import { colors } from '@common/styles';

export default function StatusBarComponent() {


  return (
    <>
      <StatusBar backgroundColor={colors.LINE_GRAY_COLOR} barStyle={'dark-content'} />
    </>
  );
}
