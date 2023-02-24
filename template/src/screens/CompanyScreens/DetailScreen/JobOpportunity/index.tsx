import React, {useState, useEffect} from 'react';
import {colors, responsive} from '@common/styles';
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import EmptyImage from '@assets/images/Empty-Recruitment.png';
import {IRootStackParamList} from '@navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

//components
import RecruitmentCard from '@components/cards/RecruitmentCard';
import EmptyTabWithImage from '@components/EmptyTabWithImage';
import StaticInsideTabLayout from '@layouts/StaticInsdieTabLayout';

//redux
import {useAppSelector} from '@hooks/useRedux';
import {useDispatch} from 'react-redux';
import {IRootState} from '@redux';
import {onNavigateId} from '@redux/slices/company';

//api
import {Recruitment, useGetAllRecruitment} from '@apiCaller';
import {fragmentGetRecruitmentByCompany} from '@services/recruitment';

const SIZE_PER_PAGE = 4;

type IDetailScreenProps = NativeStackScreenProps<
  IRootStackParamList,
  'CompanyDetail'
>;

const JobOpportunity: React.FC<IDetailScreenProps> = ({navigation}) => {
  const {currentCompany} = useAppSelector((state: IRootState) => state.company);
  const dispatch = useDispatch();

  //api
  const [getAllRecruitment, {data, loading}] = useGetAllRecruitment(
    fragmentGetRecruitmentByCompany,
  );

  //local state
  const [listRecruitment, setListRecruitment] = useState<Recruitment[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [refreshControl, setRefreshControl] = useState<boolean>(false);

  const invokeGetAllERecruitment = () => {
    getAllRecruitment({
      variables: {
        page: currentPage,
        size: SIZE_PER_PAGE,
        filterRecruitment: {
          companyCode: currentCompany?.code as string,
        },
      },
      fetchPolicy: 'no-cache',
    });
  };

  const renderLoader = () => {
    if (totalCount === listRecruitment.length && totalCount !== 0) {
      return <></>;
    }
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  };

  const loadMoreRecruitment = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    currentCompany && invokeGetAllERecruitment();
  }, [currentPage, currentCompany]);

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
    if (refreshControl === true) {
      setListRecruitment([]);
      getAllRecruitment({
        variables: {
          page: currentPage,
          size: SIZE_PER_PAGE,
          filterRecruitment: {
            companyCode: currentCompany?.code as string,
          },
        },
        fetchPolicy: 'no-cache',
      });
    }
    setRefreshControl(false);
  }, [refreshControl]);

  return (
    <StaticInsideTabLayout>
      {totalCount === 0 && !loading ? (
        <EmptyTabWithImage
          title="Không có công việc để hiển thị"
          image={EmptyImage}
        />
      ) : (
        <FlatList
          style={styles.listWrapper}
          data={listRecruitment}
          renderItem={({item: recruitment}) => (
            <RecruitmentCard
              recruitment={recruitment}
              key={recruitment.name}
              onPress={() => {
                dispatch(onNavigateId(recruitment._id || ''));
              }}
              subTitle={
                (recruitment.level?.name as string) || 'Không rõ cấp bậc'
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
    </StaticInsideTabLayout>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    maxHeight: responsive(550),
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center',
  },
  tagWrapper: {
    paddingHorizontal: responsive(8),
    paddingVertical: responsive(6),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.GRAY,
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

export default JobOpportunity;
