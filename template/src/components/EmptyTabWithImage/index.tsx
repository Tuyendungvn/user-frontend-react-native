import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import EmptyImage from '@assets/images/Empty-Saved-Job.png';

import StaticInsideTabLayout from '@layouts/StaticInsdieTabLayout';
import { colors, responsive } from '@common/styles';

interface IEmptyTabWithImageProps {
  image: typeof EmptyImage;
  title: string;
}

const EmptyTabWithImage: React.FC<IEmptyTabWithImageProps> = ({
  image,
  title,
}) => {
  return (
    <StaticInsideTabLayout>
      <Image source={image} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </StaticInsideTabLayout>
  );
};

export default EmptyTabWithImage;

const styles = StyleSheet.create({
  container: {},
  image: {
    marginTop: responsive(20),
    height: responsive(250),
    width: responsive(300),
  },
  textWrapper: {
    marginTop: responsive(20),

    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: colors.BLACK,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
});
