import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, responsive} from '@common/styles';
import LoadingScreen from '@components/LoadingScreen';

import Profile from './Profile';
import Job from './Job';
import About from './About';

import {useGetUserById, User} from '@apiCaller';
import {fragmentGetUserById} from '@services/user';

//redux
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {resetReloadProfile} from '@redux/slices/profile';

import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {IBottomParamList, IRootStackParamList} from '@navigator';

type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<IBottomParamList, 'Home'>,
  NativeStackNavigationProp<IRootStackParamList, 'Main'>
>;
interface IProps {
  navigation: NavigationProps;
}
const MainScreen: React.FC<IProps> = ({navigation}) => {
  const {userInfor} = useAppSelector(state => state.auth);
  const {reloadProfile} = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();
  const [getUserById, {data, loading}] = useGetUserById(fragmentGetUserById);
  const [user, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    if (userInfor) {
      getUserById({
        variables: {
          id: userInfor?.userInfo?._id || '',
        },
        fetchPolicy: 'no-cache',
      });
    }
  }, [userInfor]);

  useEffect(() => {
    if (reloadProfile === true) {
      getUserById({
        variables: {
          id: userInfor?.userInfo?._id || '',
        },
        fetchPolicy: 'no-cache',
      });
      dispatch(resetReloadProfile());
    }
  }, [reloadProfile]);

  useEffect(() => {
    if (data) {
      setLocalUser(data?.getUserById || null);
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Profile user={user} />
            <Job user={user} />
            <About user={user} navigation={navigation} />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(40),
    flex: 1,
    backgroundColor: colors.LINE_GRAY_COLOR,
  },
});

export default MainScreen;
