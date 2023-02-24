import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {colors, responsive, typos} from '@common/styles';
import {Box} from 'native-base';

interface IProps {
  title: string;
  noPaddingX?: boolean;
  noPaddingY?: boolean;
  background?: boolean;
}
const ScreenWithoutBackLayout: React.FC<IProps> = ({
  children,
  title,
  noPaddingX = false,
  noPaddingY = false,
  background = false,
}) => {
  return (
    <Box
      safeArea
      _ios={{paddingX: responsive(20)}}
      style={[
        styles.container,

        {
          backgroundColor: !background ? colors.WHITE : colors.LINE_GRAY_COLOR,
          paddingHorizontal: noPaddingX ? 0 : responsive(20),
          paddingVertical: noPaddingY ? 0 : responsive(20),
        },
      ]}>
      <View style={{height: '100%', flex: 1}}>
        <View
          style={[
            styles.BackContainer,
            {
              paddingHorizontal: noPaddingX ? responsive(20) : 0,
              paddingVertical: noPaddingY ? responsive(20) : 0,
            },
          ]}>
          <Text style={styles.Title}>{title}</Text>
        </View>
        <View style={styles.MainContent}>{children}</View>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  BackContainer: {
    marginTop: responsive(0),
    flexDirection: 'row',
    alignItems: 'center',
  },
  Title: {
    ...typos.xxl.bold,
  },
  MainContent: {
    flex: 1,
    marginTop: responsive(0),
  },
});

export default ScreenWithoutBackLayout;
