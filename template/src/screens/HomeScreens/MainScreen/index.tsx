import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
  View,
  RefreshControl,
} from 'react-native';
import {colors, responsive} from '@common/styles';
import UserCard from '@components/cards/UserCard';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {IBottomParamList, IRootStackParamList} from '@navigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import CarouselSection from './CarouselSection';

//locals
import CardSection from './CardSection';
import RecruitmentCard from '@components/cards/RecruitmentCard';
import {
  Recruitment,
  RecruitmentSortType,
  useGetAllRecruitment,
} from '@apiCaller';
import {fragmentGetAllRecruitment} from '@services/recruitment';
import {useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';
import LoadingScreen from '@components/LoadingScreen';

type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<IBottomParamList, 'Home'>,
  NativeStackNavigationProp<IRootStackParamList, 'RecruitmentDetail'>
>;
interface IProps {
  navigation: NavigationProps;
}

const INITIAL_SIZE = 20;

const MainScreen: React.FC<IProps> = ({navigation}) => {
  const {loadHomeScreen} = useAppSelector((state: IRootState) => state.home);
  const onNavigate = (id: string) => {
    navigation.navigate('RecruitmentDetail', {id});
  };
  const [getAllRecruitment, {data}] = useGetAllRecruitment(
    fragmentGetAllRecruitment,
  );
  //local state
  const [listRecruitment, setListRecruitment] = useState<Recruitment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [refreshControl, setRefreshControl] = useState<boolean>(false);

  const invokeGetAllRecruitment = () => {
    getAllRecruitment({
      variables: {
        size: INITIAL_SIZE,
        page: currentPage,
        filterRecruitment: {
          sortType: RecruitmentSortType.Latest,
        },
      },
      fetchPolicy: 'no-cache',
    });
  };

  const renderLoader = () => {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  };

  const loadMoreRecruitment = () => {
    setCurrentPage(currentPage + 1);
  };

  const originalRenderItem = (recruitment: Recruitment) => {
    return (
      <RecruitmentCard
        recruitment={recruitment}
        key={recruitment.name}
        onPress={() => onNavigate(recruitment._id || '')}
      />
    );
  };

  const renderItem = useCallback(originalRenderItem, [listRecruitment]);

  const renderHeaderItems = () => {
    return (
      <ScrollView>
        <SafeAreaView>
          <UserCard />
        </SafeAreaView>
        <CarouselSection />
        <CardSection />
        <Text style={styles.heading}>Việc làm mới cập nhật</Text>
      </ScrollView>
    );
  };

  useEffect(() => {
    invokeGetAllRecruitment();
  }, [currentPage]);

  useEffect(() => {
    data &&
      setListRecruitment([
        ...listRecruitment,
        ...(data.getAllRecruitment.results || []),
      ]);
  }, [data]);

  useEffect(() => {
    if (refreshControl === true) {
      setListRecruitment([]);
      getAllRecruitment({
        variables: {
          size: INITIAL_SIZE,
          page: 0,
          filterRecruitment: {
            sortType: RecruitmentSortType.Latest,
          },
        },
        fetchPolicy: 'no-cache',
      });
    }
    setRefreshControl(false);
  }, [refreshControl]);

  return (
    <>
      {loadHomeScreen ? (
        <LoadingScreen />
      ) : (
        <FlatList
          style={styles.container}
          ListFooterComponentStyle={{height: responsive(100)}}
          removeClippedSubviews={true}
          data={listRecruitment}
          renderItem={({item: recruitment}) => renderItem(recruitment)}
          keyExtractor={(recruitment, index) =>
            recruitment._id || index.toString()
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshControl}
              onRefresh={() => {
                setRefreshControl(true);
              }}
              colors={[colors.PRIMARY]}
            />
          }
          ListFooterComponent={renderLoader}
          maxToRenderPerBatch={20}
          ListHeaderComponent={() => renderHeaderItems()}
          onEndReached={() => loadMoreRecruitment()}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: responsive(20),
    height: responsive(1000),
  },
  banner: {
    marginTop: responsive(30),
    width: responsive(335),
    height: responsive(180),
  },
  listHeading: {},
  listWrapper: {
    marginTop: responsive(20),
  },
  loader: {
    marginVertical: responsive(16),
    alignItems: 'center',
  },
  heading: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: responsive(24),
  },
});

export default MainScreen;
