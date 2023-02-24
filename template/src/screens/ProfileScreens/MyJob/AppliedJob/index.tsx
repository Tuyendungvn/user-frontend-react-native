import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {responsive} from '@common/styles';
import RecruitmentCard from '@components/cards/RecruitmentCard';
import {colors} from '@common/styles';
import EmptyImage from '@assets/images/Empty-Applied-Job.png';
import EmptyTabWithImage from '@components/EmptyTabWithImage';

//api
import {Recruitment, useGetAppliedRecruitmentByUserId} from '@apiCaller';
import {fragmentGetAppliedRecruitmentByUser} from '@services/recruitment';

//redux
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';
import {onNavigateId} from '@redux/slices/profile';
import StaticInsideTabLayout from '@layouts/StaticInsdieTabLayout';

interface IAppliedJob {}

const AppliedJob: React.FC<IAppliedJob> = () => {
  const dispatch = useAppDispatch();
  const {userInfor} = useAppSelector((state: IRootState) => state.auth);
  const [listRecruitment, setListRecruitment] = useState<Recruitment[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [refreshControl, setRefreshControl] = useState<boolean>(false);
  const [getAppliedJob, {data}] = useGetAppliedRecruitmentByUserId(
    fragmentGetAppliedRecruitmentByUser,
  );
  const {appliedJobSuccess} = useAppSelector((state: IRootState) => state.job);

  const invokeGetAllAppliedJobs = () => {
    getAppliedJob({
      variables: {
        userId: userInfor?.userId?.id || '',
      },
    });
  };

  useEffect(() => {
    userInfor && invokeGetAllAppliedJobs();
  }, []);

  useEffect(() => {
    appliedJobSuccess && invokeGetAllAppliedJobs();
  }, [appliedJobSuccess]);

  useEffect(() => {
    if (refreshControl === true) {
      setListRecruitment([]);
      invokeGetAllAppliedJobs();
    }
    setRefreshControl(false);
  }, [refreshControl]);

  useEffect(() => {
    data &&
      setListRecruitment(
        data.getAppliedRecruitmentByUserId.map(
          item => item.recruitment as Recruitment,
        ) || [],
      );
    setTotalCount(data?.getAppliedRecruitmentByUserId.length || 0);
  }, [data]);

  return (
    <StaticInsideTabLayout>
      {totalCount === 0 ? (
        <EmptyTabWithImage
          title="Bạn chưa ứng tuyển công việc nào"
          image={EmptyImage}
        />
      ) : (
        <FlatList
          style={styles.listWrapper}
          data={listRecruitment}
          renderItem={({item: recruitment}) => (
            <RecruitmentCard
              recruitment={recruitment}
              key={recruitment?._id || ''}
              onPress={() => dispatch(onNavigateId(recruitment._id || ''))}
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
            index.toString() || recruitment._id || ''
          }
          ListFooterComponent={<View style={{height: responsive(100)}}></View>}
        />
      )}
    </StaticInsideTabLayout>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    marginBottom: responsive(20),
  },
  heading: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: responsive(24),
  },
});

export default AppliedJob;
