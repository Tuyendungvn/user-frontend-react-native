import {StyleSheet, View, useWindowDimensions} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import ScreenWithBackLayout from '@layouts/ScreenWithBackLayout';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {IRootStackParamList} from '@typings';
import {TabView, SceneMap} from 'react-native-tab-view';
import MyTabBarView from '@components/MyTabBarView';
import {colors, responsive, shadow} from '@common/styles';
import Button from '@designs/Button';
import {useGetUserById, useGetRecordByUser} from '@apiCaller';
import {fragmentGetUserById} from '@services/user';
import {fragmentGetRecordByUser} from '@services/record';

import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {setRecord, setUser} from '@redux/slices/profile';
import {setResetAction} from '@redux/slices/common';

import GeneralInformation from './GeneralInformation';
import PersonalInformation from './PersonalInformation';
import ExpInformation from './ExpInformation';
import Job from './Job';
import EducationInformation from './EducationInformation';

type INavigationProps = NativeStackNavigationProp<
  IRootStackParamList,
  'AboutAccount'
>;
interface IProps {
  navigation: INavigationProps;
}

interface ITab {
  key: string;
  title: string;
  Component: ReactNode;
}

const tabs: ITab[] = [
  {
    key: 'generalInformation',
    title: 'Thông tin chung',
    Component: GeneralInformation,
  },
  {
    key: 'personalInformation',
    title: 'Thông tin cá nhân',
    Component: PersonalInformation,
  },
  {
    key: 'expInformation',
    title: 'Kinh nghiệm',
    Component: ExpInformation,
  },
  {
    key: 'educationInformation',
    title: 'Học vấn',
    Component: EducationInformation,
  },
  {
    key: 'job',
    title: 'Công việc mong muốn',
    Component: Job,
  },
];

const renderSceneItem = {};
for (const tab of tabs) {
  renderSceneItem[tab.key] = tab.Component;
}
const renderScene = SceneMap(renderSceneItem);
const AboutAccount: React.FC<IProps> = ({navigation}) => {
  const layout = useWindowDimensions();
  const dispatch = useAppDispatch();
  const {userInfor} = useAppSelector(state => state.auth);
  const {actionSuccess} = useAppSelector(state => state.common);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(() => {
    return tabs.map(value => {
      return {
        key: value.key,
        title: value.title,
      };
    });
  });
  const [invokedUserById, {data: dataGetUserById}] = useGetUserById(
    fragmentGetUserById,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
  const [invokedRecordByUser, {data: dataGetRecordByUser}] = useGetRecordByUser(
    fragmentGetRecordByUser,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  useEffect(() => {
    invokedUserById({
      variables: {
        id: userInfor?.userId?.id || '',
      },
    });
  }, []);

  useEffect(() => {
    invokedRecordByUser({
      variables: {
        userId: userInfor?.userId?.id || '',
      },
    });
  }, []);

  useEffect(() => {
    if (dataGetUserById?.getUserById) {
      dispatch(setUser(dataGetUserById?.getUserById));
    }
  }, [dataGetUserById]);

  useEffect(() => {
    if (dataGetRecordByUser?.getRecordByUser) {
      dispatch(setRecord(dataGetRecordByUser?.getRecordByUser));
    }
  }, [dataGetRecordByUser]);

  useEffect(() => {
    if (actionSuccess) {
      dispatch(setResetAction());
      invokedUserById({
        variables: {
          id: userInfor?.userId?.id || '',
        },
      });
      invokedRecordByUser({
        variables: {
          userId: userInfor?.userId?.id || '',
        },
      });
    }
  }, [actionSuccess]);

  return (
    <ScreenWithBackLayout
      noPaddingX
      noPaddingY
      background
      onHandleGoBack={() => {
        navigation.goBack();
      }}
      title="Hồ sơ ứng viên"
      subTitle="Thông tin về hồ sơ của bạn">
      <View
        style={{
          flex: 1,
        }}>
        <TabView
          renderTabBar={props => {
            return <MyTabBarView {...props} paddingX />;
          }}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
      <View style={styles.buttonBottomContainer}>
        <Button
          title="Tiếp theo"
          onPress={() => {
            setIndex(index + 1);
          }}
        />
      </View>
    </ScreenWithBackLayout>
  );
};

export default AboutAccount;

const styles = StyleSheet.create({
  buttonBottomContainer: {
    position: 'relative',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: responsive(20),
    borderColor: colors.LINE,
    borderStyle: 'solid',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
