import {IRootStackParamList} from '@navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import EvaluatedBoard from '@components/EvaluateBoard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StyleSheet, View} from 'react-native';
import {colors, responsive} from '@common/styles';
import Button from '@designs/Button';

//api
import {Evaluate, useGetEvaluateById} from '@apiCaller';
import {fragmentGetEvaluatedById} from '@services/evaluate';

type IApplyEvaluatedDetailProps = NativeStackScreenProps<
  IRootStackParamList,
  'RecruitmentDetail'
>;

const ApplyEvaluatedDetail: React.FC<IApplyEvaluatedDetailProps> = ({
  route,
  navigation,
}) => {
  const [getEvaluatedById, {data}] = useGetEvaluateById(
    fragmentGetEvaluatedById,
  );
  const [currentEvaluate, setCurrentEvaluate] = useState<Evaluate | null>(null);

  const invoketGetEvaluate = () => {
    getEvaluatedById({
      variables: {
        id: route.params.id,
      },
    });
  };

  useEffect(() => {
    invoketGetEvaluate();
  }, []);

  useEffect(() => {
    data && setCurrentEvaluate(data.getEvaluateById as Evaluate);
  }, [data]);

  return (
    <KeyboardAwareScrollView>
      <EvaluatedBoard evaluate={currentEvaluate} />
    </KeyboardAwareScrollView>
  );
};

export default ApplyEvaluatedDetail;
