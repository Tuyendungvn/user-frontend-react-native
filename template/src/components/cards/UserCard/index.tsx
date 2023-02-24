import React, { useEffect, useState } from 'react';
import { colors, responsive } from '@common/styles';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Switch } from 'react-native';

//redux
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { IRootState } from '@redux';

//api
import {
  User,
  useGetUserById,
  useTurnOnSeekingJob,
  useTurnOffSeekingJob,
} from '@apiCaller';
import { fragmentGetUserById } from '@services/user';
import { resetReloadHomeScreen } from '@redux/slices/auth';

const UserCard: React.FC = () => {
  //local state
  const [enableFindJob, setEnableFindJob] = useState(false);
  const { userInfor } = useAppSelector(state => state.auth);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { reloadHomeScreen } = useAppSelector(
    (state: IRootState) => state.auth
  );
  const skeletonAvatar =
    'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/user-info/Skeleton-avatar.jpg';
  const toggleSwitch = value => {
    setEnableFindJob(previousState => !previousState);
    if (value === true) {
      turnOnSeekingMode();
    } else {
      turnOffSeekingMode();
    }
  };

  const dispatch = useAppDispatch();

  //api
  const [refreshProfile, { data }] = useGetUserById(fragmentGetUserById);
  const [turnOnSeekingMode] = useTurnOnSeekingJob();
  const [turnOffSeekingMode] = useTurnOffSeekingJob();

  useEffect(() => {
    if (userInfor) {
      refreshProfile({
        variables: { id: userInfor?.userId?.id || '' },
        fetchPolicy: 'no-cache',
      });
    }
  }, [userInfor]);

  useEffect(() => {
    if (currentUser) {
      setEnableFindJob(currentUser.isSeekingJob || false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (reloadHomeScreen === true) {
      refreshProfile({
        variables: { id: userInfor?.userId?.id || '' },
        fetchPolicy: 'no-cache',
      });
      dispatch(resetReloadHomeScreen());
    }
  }, [reloadHomeScreen]);

  useEffect(() => {
    if (data) {
      setCurrentUser(data.getUserById as User);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri:
            currentUser?.urlAvt?.small ||
            currentUser?.urlAvt?.medium ||
            currentUser?.urlAvt?.default ||
            skeletonAvatar,
        }}
      />
      <View style={styles.rightWrapper}>
        <Text style={styles.username}>{currentUser?.displayName}</Text>
        <Text style={styles.userId}>ID: #{currentUser?.code}</Text>
        <View style={styles.findJobWrapper}>
          <Switch
            thumbColor={colors.WHITE}
            trackColor={{ false: colors.BODY, true: colors.PRIMARY }}
            onValueChange={toggleSwitch}
            value={enableFindJob}
          />
          <Text
            style={[
              styles.findJob,
              { color: enableFindJob ? colors.PRIMARY : colors.BODY },
            ]}>
            {enableFindJob ? 'Đang bật tìm việc' : 'Đang tắt tìm việc'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    maxWidth: '100%',
    height: responsive(70),
    borderColor: colors.BLACK,
    alignItems: 'center',
    marginBottom: responsive(20),
  },
  username: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.BLACK,
  },
  userId: {
    color: colors.BLACK,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    opacity: 0.8,
  },

  findJob: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
  },

  findJobWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchIcon: {
    marginRight: responsive(10),
  },

  rightWrapper: {
    height: responsive(70),
    width: '100%',
    justifyContent: 'space-between',
  },

  image: {
    width: responsive(52),
    marginRight: responsive(20),
    height: responsive(52),
    borderRadius: 50,
  },
});

export default UserCard;
