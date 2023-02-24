import React, {useEffect, ReactNode, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IRootStackParamList} from '@navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenWithBackLayout from '@layouts/ScreenWithBackLayout';
import {TabView, SceneMap} from 'react-native-tab-view';
import MyTabBarView from '@components/MyTabBarView';
import Spinner from '@components/Spinner';

//hooks
import {useWindowDimensions} from 'react-native';

//redux
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {onResetNavigate, setCurrentCompany} from '@redux/slices/company';

//api
import {Company, useGetCompanyById} from '@apiCaller';
import {fragmentGetCompanyById} from '@services/company';

//locals
import AboutUs from './AboutUs';
import Benefits from './Benefits';
import ImageTab from './Images';
import JobOpportunity from './JobOpportunity';
import OfficeLocation from './OfficeLocation';
import Videos from './Videos';
import {IRootState} from '@redux';

type IDetailScreenProps = NativeStackScreenProps<
  IRootStackParamList,
  'CompanyDetail'
>;

interface ITab {
  key: string;
  title: string;
  Component: ReactNode;
}

const tabs: ITab[] = [
  {
    key: 'jobOpportunity',
    title: 'Cơ hội việc làm',
    Component: JobOpportunity,
  },
  {
    key: 'image',
    title: 'Hình ảnh',
    Component: ImageTab,
  },
  {
    key: 'officeLocation',
    title: 'Địa chỉ văn phòng',
    Component: OfficeLocation,
  },
  {
    key: 'aboutUs',
    title: 'Về chúng tôi',
    Component: AboutUs,
  },
  {
    key: 'benefits',
    title: 'Phúc lợi của công ty',
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
  const dispatch = useAppDispatch();
  const [index, setIndex] = React.useState(0);
  const [company, setCompany] = useState<Company>();
  const {recruitmentId: id} = useAppSelector(
    (state: IRootState) => state.company,
  );

  const [routes] = React.useState(() => {
    return tabs.map(value => {
      return {
        key: value.key,
        title: value.title,
      };
    });
  });

  const [invokeGetCompanyById, {data, loading}] = useGetCompanyById(
    fragmentGetCompanyById,
  );

  const onNavigate = (id: string) => {
    navigation.navigate('RecruitmentDetail', {id});
  };

  useEffect(() => {
    invokeGetCompanyById({
      variables: {
        id: route.params.id,
      },
    });
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(onResetNavigate());
      onNavigate(id);
    }
  }, [id]);

  useEffect(() => {
    if (data?.getCompanyById) {
      setCompany(data.getCompanyById as Company);
    }
  }, [data?.getCompanyById]);

  useEffect(() => {
    if (company) {
      dispatch(setCurrentCompany(company));
    }
  }, [company]);

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
          }}
          title={company?.name || ''}
          subTitle={
            `${company?.career?.map(career => career.name)}` ||
            'Không rõ ngành nghề'
          }>
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
