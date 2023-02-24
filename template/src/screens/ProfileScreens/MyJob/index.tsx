import { StyleSheet, View, useWindowDimensions } from 'react-native';
import React, { ReactNode, useEffect } from 'react';
import ScreenWithBackLayout from '@layouts/ScreenWithBackLayout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { IRootStackParamList } from '@typings';
import { TabView, SceneMap } from 'react-native-tab-view';
import MyTabBarView from '@components/MyTabBarView';
import { colors, responsive } from '@common/styles';

import SavedJob from './SavedJob';
import AppliedJob from './AppliedJob';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { IRootState } from '@redux';
import { onResetNavigate } from '@redux/slices/profile';

type INavigationProps = NativeStackNavigationProp<IRootStackParamList, 'MyJob'>;

interface IMyJobProps {
  navigation: INavigationProps;
}

interface ITab {
  key: string;
  title: string;
  Component: ReactNode;
}

const tabs: ITab[] = [
  {
    key: 'savedJob',
    title: 'Việc làm đã lưu',
    Component: SavedJob,
  },
  {
    key: 'appliedJob',
    title: 'Việc làm đã ứng tuyển',
    Component: AppliedJob,
  },
];

const renderSceneItem = {};

for (const tab of tabs) {
  renderSceneItem[tab.key] = tab.Component;
}
const renderScene = SceneMap(renderSceneItem);

const MyJob: React.FC<IMyJobProps> = ({ navigation }) => {
  const layout = useWindowDimensions();
  const dispatch = useAppDispatch();

  const { recruitmentId: id } = useAppSelector(
    (state: IRootState) => state.profile
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(() => {
    return tabs.map(value => {
      return {
        key: value.key,
        title: value.title,
      };
    });
  });

  const onNavigate = (id: string) => {
    navigation.navigate('RecruitmentDetail', { id });
  };

  useEffect(() => {
    if (id) {
      dispatch(onResetNavigate());
      onNavigate(id);
    }
  }, [id]);

  return (
    <ScreenWithBackLayout
      noPaddingX
      noPaddingY
      background
      onHandleGoBack={() => {
        navigation.goBack();
      }}
      title="Việc làm của tôi"
      subTitle="Tất cả việc làm của tôi">
      <View
        style={{
          flex: 1,
        }}>
        <TabView
          renderTabBar={props => {
            return <MyTabBarView {...props} paddingX />;
          }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </ScreenWithBackLayout>
  );
};

export default MyJob;

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
