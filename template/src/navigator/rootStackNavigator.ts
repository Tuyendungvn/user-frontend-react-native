import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type IRootStackParamList = {
  welcome: undefined;

  /*Auth screen*/
  Login: undefined;
  Register: undefined;
  RegisterVerifyOTP: {
    phoneNumber: string;
    password: string;
    email: string;
    displayName: string;
  };
  ForgotPasswordInputPhoneNumber: undefined;
  ForgotPasswordVerifyOTP: {
    phoneNumber: string;
  };
  ForgotPasswordConfirmPassword: {
    phoneNumber: string;
    otpCode: string;
  };

  /* Main screen */
  Main: undefined;

  /*Profile*/
  AboutAccount: undefined;
  MyJob: undefined;
  EmployerViewProfile: undefined;
  ApplyEvaluated: undefined;
  ApplyEvaluatedDetail: { id: string };
  ChangePassword: undefined;
  CreateCV: undefined;

  /*Company Screen*/
  CompanyList: undefined;
  CompanyDetail: { id: string };

  /*Job Screen*/
  RecruitmentList: undefined;
  RecruitmentDetail: { id: string };

  /*Notify Screen*/
  NotifyList: undefined;
  NotifyDetail: { id: string; invitedRecruitmentId: string };
};

export const RootStack = createNativeStackNavigator<IRootStackParamList>();
