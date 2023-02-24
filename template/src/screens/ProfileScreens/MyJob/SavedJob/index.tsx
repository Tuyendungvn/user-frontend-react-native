import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';
import {Recruitment} from '@apiCaller';
import RecruitmentCard from '@components/cards/RecruitmentCard';
import EmptyImage from '@assets/images/Empty-Saved-Job.png';
import EmptyTabWithImage from '@components/EmptyTabWithImage';
import {colors, responsive} from '@common/styles';
import {onNavigateId} from '@redux/slices/profile';
import StaticInsideTabLayout from '@layouts/StaticInsdieTabLayout';

//api
import {useGetSavedRecruitmentByUserId} from '@apiCaller';
import {fragmentGetSavedRecruitmentByUser} from '@services/recruitment';

interface ISavedJob {}

const SavedJob: React.FC<ISavedJob> = () => {
  const {userInfor} = useAppSelector((state: IRootState) => state.auth);
  const [getSavedRecruitment, {data}] = useGetSavedRecruitmentByUserId(
    fragmentGetSavedRecruitmentByUser,
  );
  const [refreshControl, setRefreshControl] = useState<boolean>(false);
  const {saveJobSuccess} = useAppSelector((state: IRootState) => state.job);
  const dispatch = useAppDispatch();

  //local state
  const [listRecruitment, setListRecruitment] = useState<Recruitment[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const invoketGetSaveJobs = () => {
    getSavedRecruitment({
      variables: {
        userId: userInfor?.userId?.id || '',
      },
      fetchPolicy: 'no-cache',
    });
  };

  useEffect(() => {
    userInfor && invoketGetSaveJobs();
  }, [userInfor]);

  useEffect(() => {
    if (saveJobSuccess && userInfor) {
      invoketGetSaveJobs();
    }
  }, [saveJobSuccess]);

  useEffect(() => {
    if (refreshControl === true) {
      setListRecruitment([]);
      invoketGetSaveJobs();
    }
    setRefreshControl(false);
  }, [refreshControl]);

  useEffect(() => {
    if (data) {
      setListRecruitment(data.getSavedRecruitmentByUserId as Recruitment[]);
      setTotalCount(data.getSavedRecruitmentByUserId.length);
    }
  }, [data]);

  return (
    <StaticInsideTabLayout>
      {totalCount === 0 ? (
        <EmptyTabWithImage
          title="Bạn chưa lưu công việc nào"
          image={EmptyImage}
        />
      ) : (
        <FlatList
          style={styles.listWrapper}
          data={listRecruitment}
          renderItem={({item: recruitment}) => (
            <RecruitmentCard
              recruitment={recruitment}
              key={recruitment?.name}
              onPress={() => dispatch(onNavigateId(recruitment._id || ''))}
            />
          )}
          keyExtractor={(recruitment, index) =>
            index.toString() || recruitment._id || ''
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
          ListFooterComponent={<View style={{height: responsive(100)}}></View>}
        />
      )}
    </StaticInsideTabLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
  listWrapper: {
    marginTop: responsive(20),
  },
});

export default SavedJob;
