import React, {useEffect, ReactNode, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {IRootStackParamList} from '@navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenWithBackLayout from '@layouts/ScreenWithBackLayout';
import {TabView, SceneMap} from 'react-native-tab-view';
import MyTabBarView from '@components/MyTabBarView';
import {colors, responsive} from '@common/styles';
import {ActivityIndicator} from 'react-native';

//hooks
import {useWindowDimensions} from 'react-native';
import {useToast} from '@hooks/useToast';

//redux
import {
  setJob,
  setSaveJobSuccess,
  setAppliedJobSuccess,
} from '@redux/slices/job';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';

//api
import {
  Recruitment,
  useGetRecruitmentById,
  useGetSavedRecruitmentByUserId,
  useGetAppliedRecruitmentByUserId,
  useSetAppliedRecruitment,
  useSetSavedRecruitment,
} from '@apiCaller';
import {
  fragmentGetSavedRecruitmentByUser,
  fragmentGetAppliedRecruitmentByUser,
} from '@services/recruitment';
import {fragmentGetRecruitmentById} from '@services/recruitment';

//locals
import GeneralInformation from './GeneralInformation';
import Benefits from './Benefits';
import JobDescription from './JobDescription';
import JobRequires from './JobRequires';
import JobLocation from './JobLocation';
import Button from '@designs/Button';
import {Box} from 'native-base';

type IDetailScreenProps = NativeStackScreenProps<
  IRootStackParamList,
  'RecruitmentDetail'
>;

interface ITab {
  key: string;
  title: string;
  Component: ReactNode;
}

const tabs: ITab[] = [
  {
    key: 'jobDescription',
    title: 'Mô tả công việc',
    Component: JobDescription,
  },
  {
    key: 'jobRequires',
    title: 'Yêu cầu công việc',
    Component: JobRequires,
  },
  {
    key: 'jobLocation',
    title: 'Địa điểm làm việc',
    Component: JobLocation,
  },
  {
    key: 'generalInformation',
    title: 'Thông tin chung',
    Component: GeneralInformation,
  },
  {
    key: 'benefits',
    title: 'Phúc lợi',
    Component: Benefits,
  },
];

const renderSceneItem = {};
for (const tab of tabs) {
  renderSceneItem[tab.key] = tab.Component;
}
const renderScene = SceneMap(renderSceneItem);

const DetailScreen: React.FC<IDetailScreenProps> = ({navigation, route}) => {
  const layout = useWindowDimensions();
  const {showToast} = useToast();
  const dispatch = useAppDispatch();
  const {userInfor} = useAppSelector((state: IRootState) => state.auth);
  const [index, setIndex] = React.useState(0);
  const [recruitment, setRecruiment] = useState<Recruitment | null>(null);
  const [isApplied, setIsApplied] = useState<boolean>();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [savedRecruitmentList, setSavedRecruitmentList] = useState<
    Recruitment[]
  >([]);
  const [appliedRecruitmentList, setAppliedRecruitmentList] = useState<
    Recruitment[]
  >([]);

  const [routes] = React.useState(() => {
    return tabs.map(value => {
      return {
        key: value.key,
        title: value.title,
      };
    });
  });

  //api
  const [invokeGetRecruitmentById, {data, loading}] = useGetRecruitmentById(
    fragmentGetRecruitmentById,
  );
  const [invokeGetSavedRecruitment, {data: getSavedData}] =
    useGetSavedRecruitmentByUserId(fragmentGetSavedRecruitmentByUser);
  const [invokeGetAppliedRecruitment, {data: getAppliedData}] =
    useGetAppliedRecruitmentByUserId(fragmentGetAppliedRecruitmentByUser);
  const [
    saveRecruitment,
    {data: saveRecruitmentData, loading: saveRecruitmentLoading},
  ] = useSetSavedRecruitment();
  const [
    applyRecruitment,
    {data: applyRecruitmentData, loading: applyRecruitmentLoading},
  ] = useSetAppliedRecruitment();

  useEffect(() => {
    invokeGetRecruitmentById({
      variables: {
        id: route.params.id,
      },
      fetchPolicy: 'no-cache',
    });
    invokeGetAppliedRecruitment({
      variables: {
        userId: userInfor?.userId?.id || '',
      },
      fetchPolicy: 'no-cache',
    });
    invokeGetSavedRecruitment({
      variables: {
        userId: userInfor?.userId?.id || '',
      },
      fetchPolicy: 'no-cache',
    });
  }, []);

  useEffect(() => {
    getSavedData &&
      setSavedRecruitmentList(
        getSavedData.getSavedRecruitmentByUserId as Recruitment[],
      );
  }, [getSavedData]);

  useEffect(() => {
    getAppliedData &&
      setAppliedRecruitmentList(
        getAppliedData.getAppliedRecruitmentByUserId.map(
          item => item.recruitment as Recruitment,
        ) as Recruitment[],
      );
  }, [getAppliedData]);

  useEffect(() => {
    if (data?.getRecruitmentById) {
      setRecruiment(data?.getRecruitmentById);
    }
  }, [data?.getRecruitmentById]);

  useEffect(() => {
    if (recruitment) {
      dispatch(setJob(recruitment));
    }
  }, [recruitment]);

  useEffect(() => {
    if (saveRecruitmentData) {
      showToast('success', 'Lưu việc làm thành công');
      setIsSaved(true);
      dispatch(setSaveJobSuccess(true));
      invokeGetSavedRecruitment({
        variables: {
          userId: route.params.id,
        },
        fetchPolicy: 'no-cache',
      });
    }
  }, [saveRecruitmentData]);

  useEffect(() => {
    if (applyRecruitmentData) {
      showToast('success', 'Ứng tuyển công việc thành công');
      setIsApplied(true);
      dispatch(setAppliedJobSuccess(true));
      invokeGetAppliedRecruitment({
        variables: {
          userId: route.params.id,
        },
        fetchPolicy: 'no-cache',
      });
    }
  }, [applyRecruitmentData]);

  useEffect(() => {
    if (recruitment) {
      if (savedRecruitmentList.length > 0 && recruitment) {
        savedRecruitmentList.map(item => {
          if (item.name === recruitment.name) {
            setIsSaved(true);
          }
        });
      }
      if (appliedRecruitmentList.length > 0 && recruitment) {
        appliedRecruitmentList.map(item => {
          if (item.name === recruitment.name) {
            setIsApplied(true);
          }
        });
      }
    }
  }, [savedRecruitmentList, appliedRecruitmentList, recruitment]);

  return (
    <>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      ) : (
        <ScreenWithBackLayout
          noPaddingX
          noPaddingY
          background
          onHandleGoBack={() => {
            navigation.goBack();
          }}
          title={recruitment?.name || ''}
          subTitle={recruitment?.companyName || ''}>
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

          <Box
            safeAreaBottom
            style={{
              marginTop: 'auto',
              height: '22%',
              padding: responsive(20),
              backgroundColor: colors.WHITE,
              shadowOpacity: 0.8,
              shadowColor: colors.GRAY,
              justifyContent: 'space-between',
            }}>
            <Button
              title={isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển'}
              onPress={() => {
                applyRecruitment({
                  variables: {
                    recruitmentId: recruitment?._id || '',
                    userId: userInfor?.userId?.id || '',
                  },
                });
              }}
              loading={applyRecruitmentLoading}
              type={isApplied ? 'disabled' : 'primary'}
              disabled={isApplied}
            />
            <Button
              title={isSaved ? 'Đã lưu' : 'Lưu việc làm'}
              disabled={isSaved}
              type={isSaved ? 'outline_disable' : 'outline'}
              onPress={() => {
                saveRecruitment({
                  variables: {
                    recruitmentId: recruitment?._id || '',
                    userId: userInfor?.userId?.id || '',
                  },
                });
              }}
              loading={saveRecruitmentLoading}
            />
          </Box>
        </ScreenWithBackLayout>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default DetailScreen;
