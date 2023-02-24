import React, {useState, useEffect} from 'react';
import {colors, responsive} from '@common/styles';
import {FlatList, View, Text, Pressable, RefreshControl} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {IBottomParamList, IRootStackParamList} from '@navigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {X} from '@assets/svg';
import EmptyImage from '@assets/images/Empty-Recruitment.png';
import {genSVGProps} from '@common/utils/base';

//components
import StatusBarComponent from '@components/StatusBar';
import SearchBox from '@components/SearchBox';
import SearchJobModal from '@components/modals/SearchJobModal';
import RecruitmentCard from '@components/cards/RecruitmentCard';
import ScreenStaticLayout from '@layouts/ScreenStaticLayout';

//redux
import {useAppSelector, useAppDispatch} from '@hooks/useRedux';
import {IRootState} from '@redux';
import {
  setListCareerSelected,
  setListJobLevelSelected,
  setListJobTypeSelected,
  setListProvinceSelected,
} from '@redux/slices/job';

//api
import {
  Recruitment,
  RecruitmentSortType,
  useGetAllRecruitment,
} from '@apiCaller';
import {fragmentGetAllRecruitment} from '@services/recruitment';
import EmptyTabWithImage from '@components/EmptyTabWithImage';

type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<IBottomParamList, 'Job'>,
  NativeStackNavigationProp<IRootStackParamList, 'RecruitmentList'>
>;

interface IMainScreenProps {
  navigation: NavigationProps;
}

const SIZE_PER_PAGE = 10;

const MainScreen: React.FC<IMainScreenProps> = ({navigation}) => {
  const {
    listCareerSelected,
    listJobLevelSelected,
    listJobTypeSelected,
    listProvinceSelected,
  } = useAppSelector((state: IRootState) => state.job);
  const dispatch = useAppDispatch();

  //api
  const [getAllRecruitment, {data, loading}] = useGetAllRecruitment(
    fragmentGetAllRecruitment,
  );

  //local state
  const [listRecruitment, setListRecruitment] = useState<Recruitment[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [searchFilters, setSearchFilters] = useState<string[]>([]);
  const [refreshControl, setRefreshControl] = useState<boolean>(false);

  const invokeGetAllERecruitment = () => {
    var temp = {
      listProvinceSlug:
        listProvinceSelected &&
        listProvinceSelected?.map(province => province.slug as string),
      listCareerSlug: listCareerSelected
        ? listCareerSelected?.map(career => career.slug as string)
        : [],
      listLevelSlug:
        listJobLevelSelected &&
        listJobLevelSelected?.map(jobLevel => jobLevel.slug as string),
      listTypeSlug:
        listJobTypeSelected &&
        listJobTypeSelected?.map(jobType => jobType.slug as string),
    };

    getAllRecruitment({
      variables: {
        page: currentPage,
        size: SIZE_PER_PAGE,
        filterRecruitment: {
          ...clearObject(temp),
          sortType: RecruitmentSortType.Latest,
          name: searchText,
        },
      },
      fetchPolicy: 'no-cache',
    });
  };

  const renderLoader = () => {
    if (
      (listRecruitment.length === totalCount && totalCount !== 0) ||
      (searchText === '' && !loading)
    ) {
      return <></>;
    }
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  };

  const handleRemoveTag = (tag: string) => {
    if (listProvinceSelected?.map(item => item?.name as string).includes(tag)) {
      let temp = listProvinceSelected.filter(item => item.name !== tag);
      dispatch(setListProvinceSelected(temp));
    } else if (
      listCareerSelected?.map(item => item?.name as string).includes(tag)
    ) {
      let temp = listCareerSelected.filter(item => item.name !== tag);
      dispatch(setListCareerSelected(temp));
    } else if (listJobLevelSelected.map(item => item?.name).includes(tag)) {
      let temp = listJobLevelSelected.filter(item => item.name !== tag);
      dispatch(setListJobLevelSelected(temp));
    } else {
      let temp = listJobTypeSelected.filter(item => item.name !== tag);
      dispatch(setListJobTypeSelected(temp));
    }
  };

  let clearObject = (temp: Object) => {
    for (const key in temp) {
      if (Object.prototype.hasOwnProperty.call(temp, key)) {
        const element = temp[key];
        if (element?.length === 0) {
          delete temp[key];
        }
      }
    }

    return temp;
  };

  const loadMoreRecruitment = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (searchText !== '') {
      setListRecruitment([]);
      setCurrentPage(0);
    }
  }, [searchText]);

  useEffect(() => {
    invokeGetAllERecruitment();
  }, [
    currentPage,
    searchText,
    listCareerSelected,
    listJobLevelSelected,
    listJobTypeSelected,
    listProvinceSelected,
  ]);

  useEffect(() => {
    if (data) {
      setListRecruitment([
        ...listRecruitment,
        ...(data.getAllRecruitment.results || []),
      ]);
      setTotalCount(data.getAllRecruitment.totalCount || 0);
    }
  }, [data]);

  useEffect(() => {
    if (
      listJobLevelSelected ||
      listJobTypeSelected ||
      listCareerSelected ||
      listProvinceSelected
    ) {
      setListRecruitment([]);
      setCurrentPage(0);
      setSearchFilters(
        listCareerSelected
          ?.map(career => career.name as string)
          .concat(
            listJobLevelSelected?.map(jobLevel => jobLevel.name as string),
          )
          .concat(listJobTypeSelected?.map(jobType => jobType.name as string))
          .concat(
            listProvinceSelected?.map(province => province.name as string),
          ),
      );
    }
  }, [
    listCareerSelected,
    listJobLevelSelected,
    listJobTypeSelected,
    listProvinceSelected,
  ]);

  useEffect(() => {
    if (refreshControl === true) {
      setListRecruitment([]);
      getAllRecruitment({
        variables: {
          page: 0,
          size: SIZE_PER_PAGE,
          filterRecruitment: {
            sortType: RecruitmentSortType.Latest,
          },
        },
        fetchPolicy: 'no-cache',
      });
      setRefreshControl(false);
    }
  }, [refreshControl]);

  return (
    <ScreenStaticLayout title="Danh sách việc làm" noPaddingY>
      <StatusBarComponent />
      <SearchBox
        CustomDialog={SearchJobModal}
        placeholder="Tìm kiếm theo tên công việc,..."
        withFilterIcon
        onFetchData={text => {
          setListRecruitment([]);
          setCurrentPage(0);
          setSearchText(text);
        }}
      />
      <View style={styles.tagList}>
        {searchFilters.map(tag => (
          <Pressable
            style={styles.tagWrapper}
            key={tag}
            onPress={() => {
              setListRecruitment([]);
              setCurrentPage(0);
              handleRemoveTag(tag);
            }}>
            <Text style={styles.tagText}>{tag}</Text>
            <X
              {...genSVGProps(responsive(15), responsive(15), colors.PRIMARY)}
            />
          </Pressable>
        ))}
      </View>
      <>
        {totalCount === 0 && !loading ? (
          <EmptyTabWithImage
            title="Không có công việc nào phù hợp"
            image={EmptyImage}
          />
        ) : (
          <FlatList
            style={styles.listWrapper}
            data={listRecruitment}
            refreshControl={
              <RefreshControl
                refreshing={refreshControl}
                onRefresh={() => {
                  setRefreshControl(true);
                }}
                colors={[colors.PRIMARY]}
              />
            }
            renderItem={({item: recruitment}) => (
              <RecruitmentCard
                recruitment={recruitment}
                key={recruitment.name}
                onPress={() =>
                  navigation.navigate('RecruitmentDetail', {
                    id: recruitment._id || '',
                  })
                }
              />
            )}
            keyExtractor={(recruitment, index) =>
              index.toString() || recruitment._id || ''
            }
            ListFooterComponent={renderLoader}
            onEndReached={() => loadMoreRecruitment()}
          />
        )}
      </>
    </ScreenStaticLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsive(20),
    backgroundColor: colors.LINE_GRAY_COLOR,
  },
  heading: {
    marginBottom: responsive(24),
    color: colors.BLACK,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
  },
  listWrapper: {
    marginTop: responsive(20),
  },
  loader: {
    marginVertical: 16,
    height: responsive(30),
    alignItems: 'center',
  },
  tagWrapper: {
    paddingHorizontal: responsive(8),
    paddingVertical: responsive(6),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 78, 27, 0.06)',
    marginRight: responsive(10),
    marginTop: responsive(10),
    borderRadius: 8,
  },
  tagText: {
    fontSize: 13,
    color: colors.BLACK,
    lineHeight: responsive(16),
    marginRight: responsive(10),
    fontWeight: '400',
  },
  tagList: {
    marginTop: responsive(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default MainScreen;
