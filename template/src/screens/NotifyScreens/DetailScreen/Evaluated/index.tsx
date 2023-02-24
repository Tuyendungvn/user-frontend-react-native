import React, {useEffect, useState} from 'react';
import {Evaluate, Notify} from '@apiCaller';

//api
import {useGetEvaluateByUser} from '@apiCaller';
import {fragmentGetEvaluateByUserId} from '@services/evaluate';

//redux
import {useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';
import EvaluatedBoard from '@components/EvaluateBoard';

interface IEvaluatedTabProps {
  notify: Notify;
}

const EvaluatedTab: React.FC<IEvaluatedTabProps> = ({notify}) => {
  const [listEvaluate, setListEvaluate] = useState<Evaluate[]>([]);
  const [evaluateSelected, setEvaluateSelected] = useState<Evaluate | null>(
    null,
  );
  const {userInfor} = useAppSelector((state: IRootState) => state.auth);
  const userId = userInfor?.userId?.id;
  //api
  const [getEvaluateByUser, {data}] = useGetEvaluateByUser(
    fragmentGetEvaluateByUserId,
  );

  const invokeGetAllEvaluate = () => {
    getEvaluateByUser({variables: {userId: userId as string}});
  };

  useEffect(() => {
    userId && invokeGetAllEvaluate();
  }, [userId]);

  useEffect(() => {
    data && setListEvaluate(data.getEvaluateByUser as Evaluate[]);
  }, [data]);

  useEffect(() => {
    if (listEvaluate) {
      listEvaluate.map(
        item =>
          item.evaluator?.company?._id === notify.company?._id &&
          setEvaluateSelected(item),
      );
    }
  }, [listEvaluate]);

  return <EvaluatedBoard evaluate={evaluateSelected} />;
};

export default EvaluatedTab;
