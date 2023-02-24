import { colors, responsive } from '@common/styles';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IEmptyTabProps {
  title?: string;
  subTitle?: string;
}

const EmptyTab: React.FC<IEmptyTabProps> = ({ title, subTitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

export default EmptyTab;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.BLACK,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.BLACK,
    opacity: 0.8,
    marginTop: responsive(10),
  },
});
