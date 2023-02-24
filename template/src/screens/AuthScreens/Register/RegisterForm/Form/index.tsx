import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {responsive} from '@common/styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import ButtonSubmit from '@components/ButtonSubmit';
import {isEmail, isPhoneNumber} from '@common/functions';
import Input from '@designs/Input';
import {
  CONFIRM_PASSWORD,
  DISPLAY_NAME_REQUIRE,
  EMAIL_INVALID,
  EMAIL_REQUIRE,
  PASSWORD_REQUIRE,
  PHONE_INVALID,
  PHONE_REQUIRE,
} from '@common/constants/validate';
import AlertBar, {alertBar} from '@components/AlertBar';

//api
import {useIsExistPhoneNumber} from '@apiCaller';

interface IFormValue {
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  displayName: yup.string().required(DISPLAY_NAME_REQUIRE),
  phoneNumber: yup
    .string()
    .required(PHONE_REQUIRE)
    .test('phoneNumber', PHONE_INVALID, value => isPhoneNumber(value || '')),
  email: yup
    .string()
    .required(EMAIL_REQUIRE)
    .test('email', EMAIL_INVALID, value => isEmail(value || '')),
  password: yup.string().required(PASSWORD_REQUIRE),
  confirmPassword: yup
    .string()
    .required(PASSWORD_REQUIRE)
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], CONFIRM_PASSWORD),
    }),
});

interface IPhoneNumberFormProps {
  onSuccess?: (
    phoneNumber: string,
    email: string,
    password: string,
    displayName: string,
  ) => void;
}

const Form: React.FC<IPhoneNumberFormProps> = ({onSuccess}) => {
  const [, {loading: checkPhoneNumberLoading, refetch: checkPhoneNumber}] =
    useIsExistPhoneNumber();

  const [initialValues] = useState<IFormValue>({
    displayName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSubmit = async (values: IFormValue) => {
    const isCheck = await checkPhoneNumber({phoneNumber: values.phoneNumber});
    if (isCheck.data.isExistPhoneNumber === false) {
      onSuccess?.(
        values.phoneNumber,
        values.email,
        values.password,
        values.displayName,
      );
    } else {
      alertBar('Register', {
        type: 'error',
        message: 'Số điện thoại đã tồn tại',
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize>
      {({errors}) => {
        return (
          <View style={styles.container}>
            <AlertBar id="Register" />
            <View>
              <Input
                name="displayName"
                label="Họ và tên"
                placeholder="Nhập họ và tên của bạn"
                require
                type="text"
              />
            </View>
            <View style={styles.fieldMargin}>
              <Input
                name="phoneNumber"
                label="Số điện thoại"
                placeholder="Nhập số điện thoại của bạn"
                require
                type="number"
              />
            </View>
            <View style={styles.fieldMargin}>
              <Input
                name="email"
                label="Địa chỉ email"
                placeholder="Nhập email của bạn"
                require
              />
            </View>
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
            <ButtonSubmit
              loading={checkPhoneNumberLoading}
              onPress={() => {
                onSubmit(initialValues);
              }}
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
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    marginTop: responsive(40),
  },
  fieldMargin: {
    marginTop: responsive(12),
  },
});
