import {View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import ForgotPasswordLayout from '@layouts/ScreenWithBackLayout';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@navigator';
import OTPInput from '@components/OTPInput';
import Button from '@designs/Button';
import {responsive} from '@common/styles';

//api
import {useVerifyOtpResetPassword, useSendOtpVoice} from '@apiCaller';
import {fragmentSendOTPVoice} from '@services/auth/';
import AlertBar, {alertBar} from '@components/AlertBar';

interface IProps
  extends NativeStackScreenProps<
    IRootStackParamList,
    'ForgotPasswordVerifyOTP'
  > {}

interface IFormValue {
  otp: string;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  otp: yup.string().required('Vui lòng nhập OTP!'),
});

const COUNT_DOWN_TIME = 60;

const VerifyOTP: React.FC<IProps> = ({navigation, route}) => {
  //api
  const [sendOTP] = useSendOtpVoice(fragmentSendOTPVoice);
  const [verifyOTP, {data, loading, called}] = useVerifyOtpResetPassword();

  //local state
  const [countDown, setCountDown] = useState<number>(60);
  const [resend, setResend] = useState<boolean>(false);
  const [isSuccessVerify, setIsSuccessVerify] = useState<boolean | null>(null);
  const [initialValues] = useState<IFormValue>({
    otp: '',
  });
  const valueRef = useRef(initialValues);

  const handleSubmit = (values: IFormValue) => {
    verifyOTP({
      variables: {
        input: {
          phoneNumber: route.params.phoneNumber,
          otpCode: values.otp,
          permission: 'CANDIDATE',
        },
      },
    });
  };

  const handleResendOTP = () => {
    sendOTP({
      variables: {phoneNumber: route.params.phoneNumber},
    });
    setCountDown(COUNT_DOWN_TIME);
  };

  useEffect(() => {
    sendOTP({
      variables: {phoneNumber: route.params.phoneNumber},
    });
  }, []);

  useEffect(() => {
    if (data?.verifyOtpResetPassword === true) {
      setIsSuccessVerify(true);
    } else {
      setIsSuccessVerify(false);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccessVerify) {
      navigation.navigate('ForgotPasswordConfirmPassword', {
        otpCode: valueRef.current.otp,
        phoneNumber: route.params.phoneNumber,
      });
    }
  }, [isSuccessVerify]);

  useEffect(() => {
    if (data?.verifyOtpResetPassword === false && called) {
      alertBar('ForgotPasswordVerifyOTP', {
        type: 'error',
        message: 'Mã OTP không hợp lệ, vui lòng thử lại',
      });
    }
  }, [data, called]);

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

  return (
    <ForgotPasswordLayout
      title="Xác nhận OTP"
      subTitle={`Chúng tôi đã gửi một mã OTP đến số điện thoại ${route.params.phoneNumber}`}
      onHandleGoBack={() => {
        navigation.goBack();
      }}>
      <AlertBar id="ForgotPasswordVerifyOTP" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={validationSchema}>
        {({handleSubmit, setFieldValue, values, errors, touched}) => {
          valueRef.current = values;
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
                loading={loading}
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
                onPress={() => (resend ? handleResendOTP() : () => {})}
                stylesCustom={{
                  marginTop: responsive(10),
                }}
              />
            </View>
          );
        }}
      </Formik>
    </ForgotPasswordLayout>
  );
};

export default VerifyOTP;
