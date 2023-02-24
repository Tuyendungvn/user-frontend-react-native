import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Notify, ScheduleInterviewStatusEnum} from '@apiCaller';
import {responsive, colors} from '@common/styles';
import Button from '@designs/Button';

//api
import {
  useConfirmTheScheduleInterview,
  useCancelTheScheduleInterview,
} from '@apiCaller';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//redux
import {useAppDispatch} from '@hooks/useRedux';
import {setReloadNotify} from '@redux/slices/notify';

interface IScheduleTabProps {
  notify: Notify;
  onSuccess: () => void;
}

const ScheduleTab: React.FC<IScheduleTabProps> = ({notify, onSuccess}) => {
  const [confirmSchedule, {data: confirmData, loading: confirmLoading}] =
    useConfirmTheScheduleInterview();
  const [cancelSchedule, {data: cancelData, loading: cancelLoading}] =
    useCancelTheScheduleInterview();
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isCanceled, setIsCanceled] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (confirmData?.confirmTheScheduleInterview === true) {
      setIsConfirmed(true);
      onSuccess();
      dispatch(setReloadNotify());
    } else {
      setIsConfirmed(false);
    }
  }, [confirmData]);

  useEffect(() => {
    if (cancelData?.cancelTheScheduleInterview === true) {
      setIsCanceled(true);
      onSuccess();
      dispatch(setReloadNotify());
    } else {
      setIsCanceled(false);
    }
  }, [cancelData]);

  useEffect(() => {
    notify.scheduleInterview?.isConfirmFromReceiver === true
      ? setIsConfirmed(true)
      : setIsConfirmed(false);
    notify.scheduleInterview?.status === ScheduleInterviewStatusEnum.Canceled
      ? setIsCanceled(true)
      : setIsCanceled(false);
  }, [notify]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.header}>Lịch phỏng vấn</Text>
      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Vị trí phỏng vấn</Text>
        <Text style={styles.itemContent}>
          {notify.scheduleInterview?.positionInterview ||
            'Không rõ vi trí phỏng vấn'}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Hình thức phỏng vấn</Text>
        <Text style={styles.itemContent}>
          {notify.scheduleInterview?.scheduleType ||
            'Chưa rõ hình thức phỏng vấn'}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Ngày phỏng vấn</Text>
        <Text style={styles.itemContent}>
          {notify.scheduleInterview?.scheduleTime?.toString().prettyDate() ||
            'Địa điểm làm việc'}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Thời gian</Text>
        <Text style={styles.itemContent}>
          {notify.scheduleInterview?.scheduleTime?.toString().prettyHour()}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Địa điểm</Text>
        <Text style={styles.itemContent}>
          {notify.scheduleInterview?.scheduleLocation || 'Không rõ địa điểm'}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Người phỏng vấn</Text>
        <Text style={styles.itemContent}>
          {notify.scheduleInterview?.interviewerName ||
            'Không rõ người phỏng vấn'}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Số điện thoại liên hệ</Text>
        <Text style={styles.itemContent}>
          {notify.scheduleInterview?.interviewerPhone ||
            'Không rõ số điện thoại liên hệ'}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Email liên hệ</Text>
        <Text style={styles.itemContent}>
          {notify.scheduleInterview?.interviewerEmail ||
            'Không rõ email liên hệ'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={isConfirmed ? 'Đã xác nhận' : 'Xác nhận'}
          disabled={isConfirmed || isCanceled}
          type={isConfirmed || isCanceled ? 'disabled' : 'primary'}
          stylesCustom={{
            marginTop: responsive(10),
            width: responsive(335),
          }}
          onPress={() => {
            confirmSchedule({
              variables: {
                id: notify.scheduleInterview?._id || '',
              },
            });
            onSuccess();
          }}
          loading={confirmLoading}
        />
        <Button
          title={isCanceled ? 'Đã huỷ' : 'Huỷ lịch phỏng vấn'}
          disabled={isCanceled || isConfirmed}
          type={isCanceled || isConfirmed ? 'outline_disable' : 'outline'}
          stylesCustom={{
            marginTop: responsive(10),
            width: responsive(335),
          }}
          onPress={() => {
            cancelSchedule({
              variables: {
                id: notify.scheduleInterview?._id || '',
              },
            });
            onSuccess();
          }}
          loading={cancelLoading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ScheduleTab;

const styles = StyleSheet.create({
  container: {
    padding: responsive(20),
  },

  header: {
    color: colors.PRIMARY,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    marginBottom: responsive(5),
    marginTop: responsive(5),
  },

  itemWrapper: {
    marginTop: responsive(25),
  },

  itemTitle: {
    color: colors.BLACK,
    fontSize: 15,
    fontWeight: '600',
  },
  itemContent: {
    borderWidth: 0.5,
    borderColor: colors.BODY,
    color: colors.BLACK,
    fontSize: 14,
    paddingHorizontal: responsive(15),
    paddingVertical: responsive(15),
    marginTop: responsive(10),
    maxWidth: '100%',
    height: responsive(50),
    maxHeight: responsive(70),
  },
  buttonContainer: {
    padding: responsive(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: responsive(20),
  },
});
