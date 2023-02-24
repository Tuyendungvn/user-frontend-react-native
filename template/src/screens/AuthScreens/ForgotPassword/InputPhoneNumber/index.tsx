import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Input from '@designs/Input';
import ForgotPasswordLayout from '@layouts/ScreenWithBackLayout';
import ButtonSubmit from '@components/ButtonSubmit';
import AlertBar, {alertBar} from '@components/AlertBar';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@navigator';

import {PHONE_INVALID, PHONE_REQUIRE} from '@common/constants/validate';
import {isPhoneNumber} from '@common/functions';
import {responsive, colors} from '@common/styles';

//api
import {useIsExistPhoneNumber} from '@apiCaller';

interface IProps
  extends NativeStackScreenProps<
    IRootStackParamList,
    'ForgotPasswordInputPhoneNumber'
  > {}

interface IFormValue {
  phoneNumber: string;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  phoneNumber: yup
    .string()
    .required(PHONE_REQUIRE)
    .test('phoneNumber', PHONE_INVALID, value => isPhoneNumber(value || '')),
});
const InputPhoneNumber: React.FC<IProps> = ({navigation}) => {
  const [initialValues] = useState<IFormValue>({
    phoneNumber: '',
  });
  const [, {loading: checkPhoneNumberLoading, refetch: checkPhoneNumber}] =
    useIsExistPhoneNumber();

  const onSubmit = async (values: IFormValue) => {
    const isChecked = await checkPhoneNumber({
      phoneNumber: values.phoneNumber,
    });
    if (isChecked.data.isExistPhoneNumber === true) {
      navigation.navigate('ForgotPasswordVerifyOTP', {
        phoneNumber: values.phoneNumber,
      });
    } else {
      alertBar('ForgotPassword', {
        type: 'error',
        message: 'Số điện thoại không tồn tại, xin hãy đăng ký trước',
      });
    }
  };

  return (
    <ForgotPasswordLayout
      onHandleGoBack={() => {
        navigation.goBack();
      }}
      title="Quên mật khẩu"
      subTitle="Nhập số điện thoại của bạn để đặt lại mật khẩu">
      <KeyboardAwareScrollView>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize>
          <View>
            <AlertBar id="ForgotPassword" />
            <Input
              name="phoneNumber"
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              require
              type="number"
            />

            <ButtonSubmit
              title="Xác nhận"
              loading={checkPhoneNumberLoading}
              stylesCustom={{
                marginTop: responsive(40),
              }}
            />
            <View style={styles.textContainer}>
              <Text
                style={{
                  color: colors.BODY,
                  marginRight: responsive(4),
                }}>
                Không có tài khoản?
              </Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text style={{color: colors.PRIMARY}}>Đăng kí ở đây</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Formik>
      </KeyboardAwareScrollView>
    </ForgotPasswordLayout>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsive(16),
  },
});

export default InputPhoneNumber;
