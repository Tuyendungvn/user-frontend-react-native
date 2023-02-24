import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ConfirmOTPLayout from '@layouts/ScreenWithBackLayout';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@navigator';
import OTPInput from '@components/OTPInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import Button from '@designs/Button';
import {responsive} from '@common/styles';

//api
import {
  AbenlaApiResponse,
  useRegisterOtpVoice,
  useVerifyOtpVoice,
} from '@apiCaller';
import {fragmentRegister} from '@services/auth';
import AlertBar, {alertBar} from '@components/AlertBar';

interface IProps
  extends NativeStackScreenProps<IRootStackParamList, 'RegisterVerifyOTP'> {}

interface IFormValue {
  otp: string;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  otp: yup.string().required('Vui lòng nhập OTP!'),
});

const COUNT_DOWN_TIME = 60;

const VerifyOTP: React.FC<IProps> = ({navigation, route}) => {
  const [register] = useRegisterOtpVoice(fragmentRegister);
  const [verifyOTP, {loading: verifyLoading, data: verifyData, called, error}] =
    useVerifyOtpVoice();
  const [resend, setResend] = useState<boolean>(false);
  const [countDown, setCountDown] = useState(COUNT_DOWN_TIME);
  const [isSuccess, setIsSuccess] = useState<boolean>();

  const [initialValues] = useState<IFormValue>({
    otp: '',
  });

  const onHandleSubmit = (values: IFormValue) => {
    verifyOTP({
      variables: {
        input: {
          otpCode: values.otp,
          permission: 'CANDIDATE',
          phoneNumber: route.params.phoneNumber,
        },
      },
    });
  };

  const handleResendOTP = () => {
    register({
      variables: {
        input: {
          password: route.params.password,
          permission: 'CANDIDATE',
          phoneNumber: route.params.phoneNumber,
          displayName: route.params.displayName,
          email: route.params.email,
        },
      },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countDown >= 1) {
        setCountDown(countDown - 1);
      }
    }, 1000);
    if (countDown === 0) {
      setResend(true);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countDown]);

  useEffect(() => {
    register({
      variables: {
        input: {
          password: route.params.password,
          permission: 'CANDIDATE',
          phoneNumber: route.params.phoneNumber,
          displayName: route.params.displayName,
          email: route.params.email,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (verifyData) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [verifyData]);

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('Login');
      alertBar('Login', {
        type: 'success',
        message: 'Bạn đã tạo tài khoản thành công',
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (verifyData?.verifyOtpVoice === false && error) {
      alertBar('RegisterVerifyOTP', {
        type: 'error',
        message: 'Mã OTP không hợp lệ, xin hãy thử lại sau',
      });
    }
  }, [error, verifyData]);

  return (
    <>
      <ConfirmOTPLayout
        title="Xác nhận OTP"
        subTitle={`Chúng tôi đã gửi mã OTP đến số điện thoại ${route.params.phoneNumber}`}
        onHandleGoBack={() => {
          navigation.goBack();
        }}>
        <AlertBar id="RegisterVerifyOTP" />
        <Formik
          initialValues={initialValues}
          onSubmit={onHandleSubmit}
          enableReinitialize
          validationSchema={validationSchema}>
          {({handleSubmit, setFieldValue, values, errors, touched}) => {
            return (
              <View>
                <OTPInput
                  name="otp"
                  errors={errors}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  values={values}
                />
                <Button
                  loading={verifyLoading}
                  title="Xác nhận"
                  type={values.otp.length === 4 ? 'primary' : 'disabled'}
                  onPress={handleSubmit}
                  stylesCustom={{
                    marginTop: responsive(40),
                  }}
                />
                <Button
                  title={
                    countDown >= 1
                      ? `Gửi OTP lại sau ${countDown} giây`
                      : 'Gửi lại OTP'
                  }
                  type={countDown === 0 ? 'outline' : 'outline_disable'}
                  disabled={countDown !== 0}
                  onPress={() =>
                    resend === true ? handleResendOTP() : () => {}
                  }
                  stylesCustom={{
                    marginTop: responsive(10),
                  }}
                />
              </View>
            );
          }}
        </Formik>
      </ConfirmOTPLayout>
    </>
  );
};

const styles = StyleSheet.create({});

export default VerifyOTP;
