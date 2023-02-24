import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import messaging from '@react-native-firebase/messaging';

//redux
import {resetRecheckActive, setReloadNotify} from '@redux/slices/notify';
import {setActiveNotify} from '@redux/slices/notify';
import {IRootState} from '@redux';
import {resetLoadHomeScreen, setLoadHomeScreen} from '@redux/slices/home';

//api
import {Notify, useGetNotifyByUser, useUpdateUserProfile} from '@apiCaller';
import {fragmentGetNotifyByUserId} from '@services/notify';
import {fragmentUpdateUserProfile} from '@services/user';

interface INotifyComponent {}

const NotifyComponent: React.FC<INotifyComponent> = () => {
  const userInfo = useAppSelector((state: IRootState) => state.auth);
  const {recheckActive} = useAppSelector((state: IRootState) => state.notify);
  const dispatch = useAppDispatch();

  //api
  const [getNotify, {data: getNotifyData, loading: getNotifyLoading}] =
    useGetNotifyByUser(fragmentGetNotifyByUserId);
  const [updateUser] = useUpdateUserProfile(fragmentUpdateUserProfile);

  //local state
  const [listNotify, setListNotify] = useState<Notify[]>([]);
  const [deviceToken, setDeviceToken] = useState<string>('');

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status', authStatus);
    }
  };

  const returnMessage = messaging().onMessage(async remoteMessage => {
    dispatch(setActiveNotify(true));
    dispatch(setReloadNotify());
    return remoteMessage;
  });

  const getToken = async () => {
    const deviceToken = await messaging().getToken();
    setDeviceToken(deviceToken);
  };

  const firstCall = async () => {
    Promise.all([requestUserPermission(), getToken(), returnMessage()]);
  };

  useEffect(() => {
    getNotifyData && setListNotify(getNotifyData.getNotifyByUser as Notify[]);
  }, [getNotifyData]);

  useEffect(() => {
    if (getNotifyLoading === true) {
      dispatch(setLoadHomeScreen());
    } else {
      dispatch(resetLoadHomeScreen());
    }
  }, [getNotifyLoading]);

  useEffect(() => {
    if (listNotify) {
      let isExisted = listNotify.find(item => item.seen === false);
      isExisted === undefined
        ? dispatch(setActiveNotify(false))
        : dispatch(setActiveNotify(true));
    }
  }, [listNotify]);

  useEffect(() => {
    updateUser({
      variables: {
        updateUserInput: {
          tokenFirebaseNotification: deviceToken,
        },
      },
    });
  }, [deviceToken]);

  useEffect(() => {
    if (recheckActive === true) {
      setListNotify([]);
      getNotify({
        variables: {
          userId: userInfo.userInfor?.userId?.id || '',
        },
      });
      dispatch(resetRecheckActive());
    }
  }, [recheckActive]);

  useEffect(() => {
    if (userInfo) {
      firstCall();
      getNotify({
        variables: {
          userId: userInfo.userInfor?.userId?.id || '',
        },
      });
    }
  }, [userInfo]);

  return null;
};

export default NotifyComponent;
