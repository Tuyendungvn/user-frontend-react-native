import {useAppSelector} from '@hooks/useRedux';
import {useEffect, useState} from 'react';
import {fragmentGetAppliedRecruitmentByUser} from '@services/recruitment';
import {useGetAppliedRecruitmentByUserId, Recruitment} from '@apiCaller';
import {IRootState} from '@redux';

export const useGetAppliedRecruitment = () => {
  const userInfo = useAppSelector((state: IRootState) => state.auth.userInfor);
  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
  const [getRecruitments, {data, loading}] = useGetAppliedRecruitmentByUserId(
    fragmentGetAppliedRecruitmentByUser,
  );

  useEffect(() => {
    userInfo && invokeGetAllRecruitment();
  }, [userInfo]);

  const invokeGetAllRecruitment = () => {
    getRecruitments({variables: {userId: userInfo?.userId?.id || ''}});
  };

  useEffect(() => {
    if (data?.getAppliedRecruitmentByUserId) {
      setRecruitments(
        data.getAppliedRecruitmentByUserId.map(
          item => item.recruitment,
        ) as Recruitment[],
      );
    }
  }, [data]);

  return {
    recruitments,
    loading,
  };
};
