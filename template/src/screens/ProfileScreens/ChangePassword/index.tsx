import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import * as yup from 'yup';
import {IRootStackParamList} from '@navigator';
import {useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';

import {
  NEW_PASSWORD_REQUIRE,
  CURRENT_PASSWORD_REQUIRE,
  CONFIRM_NEW_PASSWORD,
} from '@common/constants/validate/password';

import {responsive} from '@common/styles';
import {View, StyleSheet} from 'react-native';
import Input from '@designs/Input';
import Button from '@components/ButtonSubmit';
import ChangePasswordLayout from '@layouts/ScreenWithBackLayout';
import AlertBar, {alertBar} from '@components/AlertBar';

//api
import {useResetPassword} from '@apiCaller';

interface IFormValue {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type INavigationProps = NativeStackNavigationProp<
  IRootStackParamList,
  'ChangePassword'
>;

interface IChangePassword extends INavigationProps {
  navigation: INavigationProps;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  currentPassword: yup.string().required(CURRENT_PASSWORD_REQUIRE),
  newPassword: yup.string().required(NEW_PASSWORD_REQUIRE),
  confirmPassword: yup.string().required(CONFIRM_NEW_PASSWORD),
});

const ChangePassword: React.FC<IChangePassword> = ({navigation}) => {
  const [initialValues] = useState<IFormValue>({
    confirmPassword: '',
    newPassword: '',
    currentPassword: '',
  });
  const userInfo = useAppSelector((state: IRootState) => state.auth.userInfor);
  const [resetPassword, {data, loading, error}] = useResetPassword();

  const onSubmit = (values: IFormValue) => {
    const {currentPassword: oldPassword, newPassword} = values;
    userInfo &&
      resetPassword({
        variables: {
          oldPassword,
          newPassword,
          username: userInfo?.userInfo?.username || '',
        },
      });
  };

  useEffect(() => {
    if (data?.resetPassword === true) {
      navigation.navigate('Main');
    }
  }, [data]);

  useEffect(() => {
    error &&
      alertBar('ChangePassword', {type: 'error', message: error?.message});
  }, [error]);

  return (
    <ChangePasswordLayout
      onHandleGoBack={() => {
        navigation.goBack();
      }}
      title="Đặt lại mật khẩu"
      subTitle="Cài đặt mật khẩu mới cho tài khoản của bạn">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize>
        {({errors}) => {
          return (
            <View style={styles.container}>
              <AlertBar id="ChangePassword" />
              <View style={styles.fieldMargin}>
                <Input
                  type="password"
                  name="currentPassword"
                  label="Mật khẩu hiện tại"
                  placeholder="Nhập mật khẩu hiện tại của bạn"
                  require
                />
              </View>
              <View style={styles.fieldMargin}>
                <Input
                  type="password"
                  name="newPassword"
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới của bạn"
                  require
                />
              </View>
              <View style={styles.fieldMargin}>
                <Input
                  type="password"
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  placeholder="Xác nhận mật khẩu mới của bạn"
                  require
                />
              </View>
              <Button
                loading={loading}
                onPress={() => {
                  onSubmit(initialValues);
                }}
                type="primary"
                stylesCustom={{
                  marginTop: responsive(40),
                }}
                title="Xác nhận"
              />
            </View>
          );
        }}
      </Formik>
    </ChangePasswordLayout>
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

export default ChangePassword;
