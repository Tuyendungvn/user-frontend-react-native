import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IRootStackParamList} from '@navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenWithBackLayout from '@layouts/ScreenWithBackLayout';
import Spinner from '@components/Spinner';

//redux
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {setCurrentNotify, setReloadNotify} from '@redux/slices/notify';

//api
import {Notify, useGetNotifyById, useSetOneSeenNotify} from '@apiCaller';
import {fragmentGetNotifyById} from '@services/notify';

//locals
import ApprovedTab from './Approved';
import EvaluatedTab from './Evaluated';
import InvitationTab from './Invitation';
import ScheduleTab from './Schedule';
import AppliedTab from './Applied';
import ExpiredTab from './Expired';
import CanceledTab from './Canceled';
import {IRootState} from '@redux';

type IDetailScreenProps = NativeStackScreenProps<
  IRootStackParamList,
  'NotifyDetail'
>;

const DetailScreen: React.FC<IDetailScreenProps> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const [notify, setNotify] = useState<Notify | null>(null);
  const [body, setBody] = useState<React.ReactElement | null>(null);
  const onNavigate = (recruitmentId: string) => {
    navigation.navigate('RecruitmentDetail', {id: recruitmentId});
  };
  const {userInfor} = useAppSelector((state: IRootState) => state.auth);

  //api
  const [invokeGetNotifyById, {data, loading}] = useGetNotifyById(
    fragmentGetNotifyById,
  );
  const [seeNotify, {data: seeNotifyData}] = useSetOneSeenNotify();

  useEffect(() => {
    invokeGetNotifyById({
      variables: {
        id: route.params.id,
      },
      fetchPolicy: 'no-cache',
    });
  }, []);

  useEffect(() => {
    if (data?.getNotifyById) {
      setNotify(data.getNotifyById as Notify);
    }
  }, [data?.getNotifyById]);

  useEffect(() => {
    if (notify) {
      dispatch(setCurrentNotify(notify));
      seeNotify({
        variables: {
          notifyId: notify._id || '',
          userId: userInfor?.userId?.id || '',
        },
      });
    }
  }, [notify]);

  useEffect(() => {
    if (seeNotifyData?.setOneSeenNotify === true) {
      dispatch(setReloadNotify());
    }
  }, [seeNotifyData]);

  useEffect(() => {
    if (notify?.name) {
      switch (notify.name) {
        case 'Applied':
          setBody(<AppliedTab notify={notify} />);
        case 'Invitation':
          setBody(
            <InvitationTab
              notify={notify}
              navigateToRecruiment={onNavigate}
              recruitmentId={route.params.invitedRecruitmentId}
              onSuccess={() =>
                invokeGetNotifyById({
                  variables: {id: route.params.id || ''},
                })
              }
            />,
          );
          break;
        case 'Approved':
          setBody(<ApprovedTab notify={notify} />);
          break;
        case 'Scheduled':
          setBody(
            <ScheduleTab
              notify={notify}
              onSuccess={() =>
                invokeGetNotifyById({
                  variables: {id: route.params.id || ''},
                })
              }
            />,
          );
          break;
        case 'Evaluated':
          setBody(<EvaluatedTab notify={notify} />);
          break;
        case 'Expired':
          setBody(<ExpiredTab notify={notify} />);
          break;
        case 'Canceled':
          setBody(<CanceledTab notify={notify} />);
          break;
      }
    }
  }, [notify?.name]);

  return (
    <View style={{height: '100%'}}>
      {loading ? (
        <View style={styles.loader}>
          <Spinner />
        </View>
      ) : (
        <ScreenWithBackLayout
          noPaddingX
          noPaddingY
          background
          onHandleGoBack={() => {
            navigation.goBack();
            dispatch(setReloadNotify());
          }}
          title={notify?.company?.name || 'Không rõ tên công ty'}
          subTitle={`${notify?.name}` || 'Không rõ tiêu đề'}>
          {body}
        </ScreenWithBackLayout>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default DetailScreen;
