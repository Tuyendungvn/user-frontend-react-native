import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { responsive, colors } from '@common/styles';

interface IScrollableLayout {
  horizontal?: boolean;
  isEmpty?: boolean;
  emptyComponent?: React.ReactElement;
}

const ScrollableTabLayout: React.FC<IScrollableLayout> = ({
  horizontal,
  children,
  isEmpty,
  emptyComponent,
}) => {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollViewContainer,
        {
          flexDirection: horizontal ? 'row' : 'column',
          justifyContent: horizontal ? 'space-between' : 'center',
        },
      ]}
      style={styles.container}>
      {isEmpty ? emptyComponent : children}
    </ScrollView>
  );
};

export default ScrollableTabLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    height: '100%',
  },
  scrollViewContainer: {
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(20),
    maxWidth: responsive(380),
    width: responsive(380),
    flexWrap: 'wrap',
  },
});
