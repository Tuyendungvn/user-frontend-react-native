import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface ImageLoaderProps {
  width: number;
  height: number;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ width, height }) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <ActivityIndicator />
    </View>
  );
};

export default ImageLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
