import {StyleSheet, Text, View} from 'react-native';
import {Box} from 'native-base';
import React from 'react';
import {colors, responsive, typos} from '@common/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
      _ios={{paddingX: responsive(20)}}
      safeArea
      style={[
        styles.container,

        {
          backgroundColor: !background ? colors.WHITE : colors.LINE_GRAY_COLOR,
          paddingHorizontal: noPaddingX ? 0 : responsive(20),
          paddingVertical: noPaddingY ? 0 : responsive(20),
        },
      ]}>
      <KeyboardAwareScrollView>
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
      </KeyboardAwareScrollView>
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
