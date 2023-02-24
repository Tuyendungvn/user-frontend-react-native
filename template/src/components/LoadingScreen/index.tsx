import { colors, responsive } from '@common/styles';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface ILoadingScreenProps {}

const LoadingScreen: React.FC<ILoadingScreenProps> = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.PRIMARY} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsive(700),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
