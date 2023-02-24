import { colors } from '@common/styles';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner: React.FC = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
      }}>
      <ActivityIndicator size="large" color={colors.PRIMARY} />
    </View>
  );
};

export default Spinner;
