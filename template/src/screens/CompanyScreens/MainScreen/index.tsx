import React, {useState, useEffect, Component} from 'react';
import {colors, responsive} from '@common/styles';
import {FlatList, View, Text, Pressable, RefreshControl} from 'react-native';
import ScreenStaticLayout from '@layouts/ScreenStaticLayout';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {IBottomParamList, IRootStackParamList} from '@navigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {X} from '@assets/svg';
import {genSVGProps} from '@common/utils/base';
import EmptyImage from '@assets/images/Empty-Recruitment.png';
import EmptyTabWithImage from '@components/EmptyTabWithImage';

//components
import StatusBarComponent from '@components/StatusBar';
import SearchBox from '@components/SearchBox';
import SearchCompanyModal from '@components/modals/SearchCompanyModal';
import CompanyCard from '@components/cards/CompanyCard';

//redux
import {useAppSelector, useAppDispatch} from '@hooks/useRedux';
import {IRootState} from '@redux';
import {
  setListCareerSelected,
  setListProvinceSelected,
} from '@redux/slices/company';

//api
import {Company, CompanySortType, useGetCompanies} from '@apiCaller';
import {fragmentGetAllCompany} from '@services/company';

type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<IBottomParamList, 'Company'>,
  NativeStackNavigationProp<IRootStackParamList, 'CompanyList'>
>;

interface IMainScreenProps {
  navigation: NavigationProps;
}

const SIZE_PER_PAGE = 10;

const MainScreen: React.FC<IMainScreenProps> = ({navigation}) => {
  const {listCareerSelected, listProvinceSelected} = useAppSelector(
    (state: IRootState) => state.company,
  );
  const dispatch = useAppDispatch();

  //api
  const [getAllCompany, {data, loading}] = useGetCompanies(
    fragmentGetAllCompany,
  );

  //local state
  const [listCompany, setListCompany] = useState<Company[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [searchFilters, setSearchFilters] = useState<string[]>([]);
  const [refreshControl, setRefreshControl] = useState<boolean>(false);

  const invokeGetAllCompany = () => {
    var temp = {
      listProvinceSlug:
        listProvinceSelected &&
        listProvinceSelected?.map(province => province.slug as string),
      listCareerSlug: listCareerSelected
        ? listCareerSelected?.map(career => career.slug as string)
        : [],
    };
    if (searchText === '') {
      getAllCompany({
        variables: {
          page: currentPage,
          size: SIZE_PER_PAGE,
          filterCompany: {
            ...clearObject(temp),
            sortType: CompanySortType.Mostapplied,
          },
        },
      });
    } else {
      getAllCompany({
        variables: {
          page: currentPage,
          size: SIZE_PER_PAGE,
          filterCompany: {
            ...clearObject(temp),
            name: searchText,
            sortType: CompanySortType.Mostapplied,
          },
        },
      });
    }
  };

  const renderLoader = () => {
    if (
      (listCompany && listCompany.length === totalCount && totalCount !== 0) ||
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
    } else {
      let temp = listCareerSelected.filter(item => item.name !== tag);
      dispatch(setListCareerSelected(temp));
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
      setListCompany([]);
      setCurrentPage(0);
    }
  }, [searchText]);

  useEffect(() => {
    if (refreshControl === true) {
      setListCompany([]);
      var temp = 0;
      setCurrentPage(temp);
      setRefreshControl(false);
    }
  }, [refreshControl]);

  useEffect(() => {
    invokeGetAllCompany();
  }, [currentPage, searchText, listCareerSelected, listProvinceSelected]);

  useEffect(() => {
    if (data) {
      console.log('Reload now');
      let companies = data.getCompanies
      setListCompany([...listCompany, ...((companies && companies.results) || [])]);
      setTotalCount((companies && companies.totalCount) || 0);
    }
  }, [data]);

  useEffect(() => {
    if (listCareerSelected || listProvinceSelected) {
      setListCompany([]);
      setCurrentPage(0);
      setSearchFilters(
        listCareerSelected
          ?.map(career => career.name as string)
          .concat(
            listProvinceSelected?.map(province => province.name as string),
          ),
      );
    }
  }, [listCareerSelected, listProvinceSelected]);

  return (
    <ScreenStaticLayout title="Danh sách công ty" noPaddingY>
      <StatusBarComponent />
      <SearchBox
        CustomDialog={SearchCompanyModal}
        placeholder="Tên kiếm theo tên công ty,..."
        withFilterIcon
        onFetchData={text => {
          setListCompany([]);
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
              setListCompany([]);
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
            title="Không có công ty nào phù hợp"
            image={EmptyImage}
          />
        ) : (
          <FlatList
            style={styles.listWrapper}
            data={listCompany}
            renderItem={({item: company}) => (
              <CompanyCard
                company={company}
                key={company._id}
                onPress={() =>
                  navigation.navigate('CompanyDetail', {
                    id: company._id || '',
                  })
                }
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshControl}
                onRefresh={() => {
                  setRefreshControl(true);
                }}
                colors={[colors.PRIMARY]}
              />
            }
            keyExtractor={(recruitment, index) =>
              recruitment._id || index.toString()
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
    marginRight: responsive(12),
    fontWeight: '400',
  },
  tagList: {
    marginTop: responsive(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default MainScreen;
