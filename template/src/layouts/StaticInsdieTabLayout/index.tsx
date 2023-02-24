import React from 'react';
import { View, StyleSheet } from 'react-native';
import { responsive, colors } from '@common/styles';

interface IStaticInsideTabLayoutProps {
  isEmpty?: boolean;
  emptyComponent?: React.ReactElement;
}

const StaticInsideTabLayout: React.FC<IStaticInsideTabLayoutProps> = ({
  isEmpty,
  emptyComponent,
  children,
}) => {
  return (
    <View style={styles.container}>{isEmpty ? emptyComponent : children}</View>
  );
};

export default StaticInsideTabLayout;

const styles = StyleSheet.create({
  container: {
    height: responsive(700),
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(20),
    backgroundColor: colors.WHITE,
  },
});
