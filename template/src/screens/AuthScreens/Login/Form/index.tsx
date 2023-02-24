import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IRootStackParamList } from '@typings';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Linking,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';

//components
import Input from '@designs/Input';
import ButtonSubmit from '@components/ButtonSubmit';
import AlertBar from '@components/AlertBar';
import Button from '@designs/Button';

//common
import {
  PHONE_INVALID,
  PHONE_REQUIRE,
  PASSWORD_REQUIRE,
} from '@common/constants/validate';
import { isPhoneNumber } from '@common/functions';
import { responsive, typos } from '@common/styles';

//hooks
import { useAuth } from '@hooks/useAuth';

interface ILoginScreenProps
  extends NativeStackScreenProps<IRootStackParamList, 'Login'> {}

interface IFormValue {
  phoneNumber: string;
  password: string;
}

const validationSchema = yup.object().shape<{ [k in keyof IFormValue]: any }>({
  phoneNumber: yup
    .string()
    .required(PHONE_REQUIRE)
    .test('phoneNumber', PHONE_INVALID, value => isPhoneNumber(value || '')),
  password: yup.string().required(PASSWORD_REQUIRE),
});

export default function FormComponent({ navigation }: ILoginScreenProps) {
  const { login, loginLoading } = useAuth();
  const [initialValues] = useState<IFormValue>({
    phoneNumber: '',
    password: '',
  });

  const handleSubmit = (values: IFormValue) => {
    login(values.phoneNumber, values.password);
  };

  const handleOpenUrl = async (url: string) => {
    if (url.isValidUrl()) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Không thể thực hiện hành động vào lúc này ');
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      <View style={styles.formContainer}>
        <AlertBar id="Login" />
        <View>
          <Input
            name="phoneNumber"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            require
            type="number"
          />
        </View>
        <View style={styles.fieldMargin}>
          <Input
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            require
            type="password"
          />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('ForgotPasswordInputPhoneNumber');
            }}>
            <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
          </TouchableWithoutFeedback>
        </View>
        <ButtonSubmit
          loading={loginLoading}
          stylesCustom={styles.buttonMargin}
          title="Người tìm việc đăng nhập"
          activeOpacity={0.8}
        />
        <Button
          type="outline"
          title="Nhà tuyển dụng đăng nhập"
          stylesCustom={styles.buttonSmallMargin}
          onPress={() =>
            handleOpenUrl('https://employer.tuyendungvn.com/dang-nhap')
          }
        />
      </View>
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: responsive(40),
  },
  fieldMargin: {
    marginTop: responsive(10),
  },
  forgotPasswordContainer: {
    marginTop: responsive(8),
    alignItems: 'flex-end',
  },
  forgotPassword: {
    ...typos.sm.normal,
  },
  buttonMargin: {
    marginTop: responsive(40),
  },
  buttonSmallMargin: {
    marginTop: responsive(15),
  },
});
