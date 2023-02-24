import {JwtPayload, useLogin} from '@apiCaller';
import {useAppDispatch} from './useRedux';
import {FIRST_TIME} from '@common/constants/AsyncStore';
import {SInfoOptions, SINFOR_PROFILE} from '@common/constants/Sinfo';
import SInfo from 'react-native-sensitive-info';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setIsFirstTime, setUser} from '@redux/slices/auth';

import {fragmentLogin} from '@services/auth';
import {useEffect} from 'react';

import {alertBar} from '@components/AlertBar';

export const useAuth = () => {
  const [loginAPI, {loading: loginLoading, data, error}] =
    useLogin(fragmentLogin);
  const dispatch = useAppDispatch();
  const bootstrapAsync = async () => {
    try {
      const isDoneFirstTime = await AsyncStorage.getItem(FIRST_TIME);
      const isCheck = isDoneFirstTime === 'true';
      if (isCheck) {
        dispatch(setIsFirstTime(true));
      }
      const useProfile = JSON.parse(
        await SInfo.getItem(SINFOR_PROFILE, SInfoOptions),
      );
      if (useProfile) {
        dispatch(setUser(useProfile as JwtPayload));
        dispatch(setIsFirstTime(true));
      }
    } catch (e) {
    } finally {
      SplashScreen.hide();
    }
  };

  const onHandleDoneFirstTime = async () => {
    await AsyncStorage.setItem(FIRST_TIME, 'true');
    dispatch(setIsFirstTime(true));
  };

  const loginSuccess = async (payload: JwtPayload) => {
    await SInfo.setItem(SINFOR_PROFILE, JSON.stringify(payload), SInfoOptions);
    dispatch(setUser(payload));
    alertBar('Login', {type: 'success', message: 'Đăng nhập thành công'});
  };
  const loginFailed = async (payload: JwtPayload) => {
    dispatch(setUser(null));
    alertBar('Login', {
      type: 'error',
      message: 'Vui lòng đăng nhập vào trang web của nhà tuyển dụng',
    });
  };

  const login = async (phoneNumber: string, password: string) => {
    loginAPI({
      variables: {
        user: {
          password,
          username: phoneNumber,
        },
      },
    });
  };
  const logout = async () => {
    await SInfo.deleteItem(SINFOR_PROFILE, SInfoOptions);
    dispatch(setUser(null));
    alertBar('Login', {type: 'success', message: 'Đăng xuất thành công'});
  };
  useEffect(() => {
    if (data?.login) {
      if (data?.login?.userInfo?.permission === 'CANDIDATE') {
        loginSuccess(data?.login);
      } else {
        loginFailed(data?.login);
      }
    }
  }, [data?.login]);
  useEffect(() => {
    if (error) {
      console.log('Login error', {error});
      alertBar('Login', {
        type: 'error',
        message: 'Sai tài khoản hoặc mật khẩu',
      });
    }
  }, [error]);
  return {
    bootstrapAsync,
    onHandleDoneFirstTime,
    loginLoading,
    login,
    logout,
  };
};
