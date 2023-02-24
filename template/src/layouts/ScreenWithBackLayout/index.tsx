import {StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {colors, responsive, typos} from '@common/styles';
import {genSVGProps} from '@common/utils/base';
import {Back} from '@assets/svg';
import {Box, View} from 'native-base';

interface IScreenWithBackLayoutProps {
  onHandleGoBack: () => void;
  title: string;
  subTitle?: string;
  noPaddingX?: boolean;
  noPaddingY?: boolean;
  background?: boolean;
}
const ScreenWithBackLayout: React.FC<IScreenWithBackLayoutProps> = ({
  children,
  onHandleGoBack,
  title,
  subTitle,
  noPaddingX = false,
  noPaddingY = false,
  background = false,
}) => {
  return (
    <Box
      safeArea
      style={[
        styles.container,

        {
          backgroundColor: !background ? colors.WHITE : colors.LINE_GRAY_COLOR,
          paddingHorizontal: noPaddingX ? 0 : responsive(20),
          paddingVertical: noPaddingY ? 0 : responsive(20),
        },
      ]}>
      <View
        style={[
          styles.BackContainer,
          {
            paddingHorizontal: noPaddingX ? responsive(20) : 0,
            paddingVertical: noPaddingY ? responsive(20) : 0,
          },
        ]}>
        <TouchableWithoutFeedback
          style={styles.BackButtonWrapper}
          onPress={() => {
            onHandleGoBack();
          }}>
          <Back {...genSVGProps(responsive(25), responsive(25))} />
        </TouchableWithoutFeedback>
        <View>
          <Text style={styles.Title}>{title}</Text>
          <Text style={styles.SubTitle}>{subTitle}</Text>
        </View>
      </View>
      <View style={styles.MainContent}>{children}</View>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BackContainer: {
    marginTop: responsive(0),
    flexDirection: 'row',
    alignItems: 'center',
  },

  Title: {
    ...typos.xxl.bold,
    marginHorizontal: responsive(14),
  },
  SubTitle: {
    ...typos.sm.regular,
    marginHorizontal: responsive(14),
  },
  MainContent: {
    flex: 1,
    marginTop: responsive(20),
  },

  BackButtonWrapper: {
    width: responsive(50),
    height: responsive(100),
  },
});

export default ScreenWithBackLayout;
