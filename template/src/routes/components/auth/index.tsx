import React from 'react';
import { RootStack } from '@navigator';
import LoginScreen from '@screens/AuthScreens/Login';
import RegisterFormScreen from '@screens/AuthScreens/Register/RegisterForm';
import RegisterVerifyOTPScreen from '@screens/AuthScreens/Register/RegisterForm/VerifyOTP';
import ForgotPasswordScreen from '@screens/AuthScreens/ForgotPassword/InputPhoneNumber';
import ForgotPasswordVerifyOTPScreen from '@screens/AuthScreens/ForgotPassword/VerifyOTP';
import ForgotPasswordConfirmPasswordScreen from '@screens/AuthScreens/ForgotPassword/InputPassword';

export const renderAuthStack = () => {
  return (
    <>
      {/* Login */}
      <RootStack.Screen name="Login" component={LoginScreen} />

      {/* Reister */}
      <RootStack.Screen name="Register" component={RegisterFormScreen} />
      <RootStack.Screen
        name="RegisterVerifyOTP"
        component={RegisterVerifyOTPScreen}
      />

      {/* Forgot password */}
      <RootStack.Screen
        name="ForgotPasswordInputPhoneNumber"
        component={ForgotPasswordScreen}
      />
      <RootStack.Screen
        name="ForgotPasswordVerifyOTP"
        component={ForgotPasswordVerifyOTPScreen}
      />
      <RootStack.Screen
        name="ForgotPasswordConfirmPassword"
        component={ForgotPasswordConfirmPasswordScreen}
      />
    </>
  );
};
