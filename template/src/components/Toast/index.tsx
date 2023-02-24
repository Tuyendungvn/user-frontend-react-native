import { colors, responsive, typos } from '@common/styles';
import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';

import { Success, ArrowRight, Error } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';

interface IProps {}
const toastConfig: ToastConfig = {
  success: ({ text1, hide }) => {
    return (
      <View
        style={{
          paddingHorizontal: responsive(20),
          width: '100%',
        }}>
        <View
          style={{
            backgroundColor: colors.SUCCESS,
            flex: 1,
            padding: responsive(10),
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Success
            {...genSVGProps(responsive(30), responsive(30), undefined, {
              marginRight: responsive(10),
            })}
          />
          <Text
            style={{
              ...typos.xs.regular,
              color: colors.WHITE,
              flex: 1,
            }}>
            {text1}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              hide();
            }}>
            <ArrowRight
              {...genSVGProps(responsive(20), responsive(20), undefined, {
                marginLeft: responsive(10),
              })}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  },
  error: ({ text1, hide }) => {
    return (
      <View
        style={{
          paddingHorizontal: responsive(20),
          width: '100%',
        }}>
        <View
          style={{
            backgroundColor: colors.ERROR,
            flex: 1,
            padding: responsive(10),
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Error
            {...genSVGProps(responsive(30), responsive(30), undefined, {
              marginRight: responsive(10),
            })}
          />
          <Text
            style={{
              ...typos.xs.regular,
              color: colors.WHITE,
              flex: 1,
            }}>
            {text1}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              hide();
            }}>
            <ArrowRight
              {...genSVGProps(responsive(20), responsive(20), undefined, {
                marginLeft: responsive(10),
              })}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  },
};
const ToastComponent: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Toast config={toastConfig} />
      {children}
    </>
  );
};

export default ToastComponent;
