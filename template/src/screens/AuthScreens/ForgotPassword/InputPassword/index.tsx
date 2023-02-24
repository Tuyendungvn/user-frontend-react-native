import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IRootStackParamList} from '@navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import ForgotPasswordLayout from '@layouts/ScreenWithBackLayout';
import Input from '@designs/Input';
import Button from '@components/ButtonSubmit';
import AlertBar, {alertBar} from '@components/AlertBar';

import {CONFIRM_PASSWORD, PASSWORD_REQUIRE} from '@common/constants/validate';
import {responsive} from '@common/styles';

import {Formik} from 'formik';
import * as yup from 'yup';

//api
import {useResetPasswordOtpVoice} from '@apiCaller';

interface IFormValue {
  password: string;
  confirmPassword: string;
}

interface IProps
  extends NativeStackScreenProps<
    IRootStackParamList,
    'ForgotPasswordConfirmPassword'
  > {}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  password: yup.string().required(PASSWORD_REQUIRE),
  confirmPassword: yup
    .string()
    .required(PASSWORD_REQUIRE)
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], CONFIRM_PASSWORD),
    }),
});

const InputPassword: React.FC<IProps> = ({navigation, route}) => {
  const [initialValues] = useState<IFormValue>({
    confirmPassword: '',
    password: '',
  });
  const [resetPassword, {loading, data, called}] = useResetPasswordOtpVoice();

  const onSubmit = (values: IFormValue) => {
    const input = {
      newPassword: values.password,
      otpCode: route.params.otpCode,
      permission: 'CANDIDATE',
      phoneNumber: route.params.phoneNumber,
    };
    resetPassword({
      variables: {
        input,
      },
    });
  };

  useEffect(() => {
    if (data?.resetPasswordOtpVoice === true) {
      navigation.navigate('Login');
      alertBar('Login', {
        type: 'success',
        message: 'Bạn đã thay đổi mật khẩu thành công',
      });
    } else if (data?.resetPasswordOtpVoice === false && called === true) {
      alertBar('ForgotPasswordResetPassword', {
        type: 'error',
        message: 'Đã xảy ra lỗi, hãy thử lại sau',
      });
    }
  }, [data]);

  return (
    <ForgotPasswordLayout
      onHandleGoBack={() => {
        navigation.goBack();
      }}
      title="Đặt lại mật khẩu"
      subTitle="Hãy đặt lại mật khẩu mới cho tài khoản của bạn">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize>
        {({errors}) => {
          return (
            <View style={styles.container}>
              <AlertBar id="ForgotPasswordResetPassword" />
              <View style={styles.fieldMargin}>
                <Input
                  type="password"
                  name="password"
                  label="Mật khẩu"
                  placeholder="Mật khẩu của bạn"
                  require
                />
              </View>
              <View style={styles.fieldMargin}>
                <Input
                  type="password"
                  name="confirmPassword"
                  label="Nhập lại mật khẩu"
                  placeholder="Nhập lại mật khẩu của bạn"
                  require
                />
              </View>
              <Button
                loading={loading}
                type="primary"
                stylesCustom={{
                  marginTop: responsive(40),
                }}
                title="Đăng ký"
              />
            </View>
          );
        }}
      </Formik>
    </ForgotPasswordLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: responsive(10),
  },
  fieldMargin: {
    marginTop: responsive(12),
  },
});

export default InputPassword;
