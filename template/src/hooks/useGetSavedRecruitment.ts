import {useAppSelector} from '@hooks/useRedux';
import {useEffect, useState} from 'react';
import {fragmentGetSavedRecruitmentByUser} from '@services/recruitment';
import {useGetSavedRecruitmentByUserId, Recruitment} from '@apiCaller';
import {IRootState} from '@redux';

export const useGetSavedRecruitment = () => {
  const userInfo = useAppSelector((state: IRootState) => state.auth.userInfor);
  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
  const [getRecruitments, {data}] = useGetSavedRecruitmentByUserId(
    fragmentGetSavedRecruitmentByUser,
  );

  useEffect(() => {
    userInfo && invokeGetAllRecruitment();
  }, [userInfo]);

  const invokeGetAllRecruitment = () => {
    getRecruitments({variables: {userId: userInfo?.userId?.id || ''}});
  };

  useEffect(() => {
    if (data?.getSavedRecruitmentByUserId) {
      setRecruitments(data.getSavedRecruitmentByUserId as Recruitment[]);
    }
  }, [data]);

  return {
    recruitments,
  };
};
