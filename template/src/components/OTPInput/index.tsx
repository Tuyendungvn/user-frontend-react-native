import React from 'react';
import {TextInputProps, StyleSheet, View, Text} from 'react-native';
import {ISetFieldValues} from '@typings';
import {FormikErrors, FormikTouched} from 'formik';
import {responsive, typos, colors} from '@common/styles';

import OTPInputView from '@twotalltotems/react-native-otp-input';

interface IInputProps<T = any> extends TextInputProps {
  setFieldValue: ISetFieldValues;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  values: T;
  name: string;
}

const OTPInput = <T,>(props: IInputProps<T>) => {
  const {setFieldValue, name, errors, touched, values} = props;

  const isError: boolean = touched[name] && errors[name];

  return (
    <View style={styles.wrapper}>
      <OTPInputView
        style={{width: '100%', height: responsive(40)}}
        pinCount={4}
        onCodeChanged={code => {
          setFieldValue(name, code);
        }}
        codeInputFieldStyle={{
          ...typos.lg.bold,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: !isError ? colors.LINE : colors.ERROR,
          color: !isError ? colors.BLACK : colors.ERROR,
          height: responsive(50),
        }}
        codeInputHighlightStyle={{
          borderColor: colors.SECONDARY,
        }}
      />
      {isError && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{errors[name]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  messageContainer: {
    marginTop: responsive(8),
  },
  messageText: {
    ...typos.xs.normal,
    color: colors.ERROR,
  },
  underlineStyleBase: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.LINE,
    color: colors.BLACK,
  },
});

export default OTPInput;
