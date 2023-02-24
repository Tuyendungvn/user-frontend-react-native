import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {colors, responsive} from '@common/styles';
import ScreenWithBackLayout from '@layouts/ScreenWithBackLayout';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@navigator';
import EmployerCard from '@components/cards/EmployerCard';
import EmptyImage from '@assets/images/Empty-Evaluate.png';

//api
import {Company, Evaluate, useGetEvaluateByUser} from '@apiCaller';
import {fragmentGetEvaluateByUserId} from '@services/evaluate';

//redux
import {useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';
import EmptyTabWithImage from '@components/EmptyTabWithImage';

type INavigationProps = NativeStackNavigationProp<
  IRootStackParamList,
  'ApplyEvaluated'
>;

interface IApplyEvaluated extends INavigationProps {
  navigation: INavigationProps;
}

const ApplyEvaluated: React.FC<IApplyEvaluated> = ({navigation}) => {
  const userInfo = useAppSelector((state: IRootState) => state.auth.userInfor);
  const [listEvaluated, setListEvaluated] = useState<Evaluate[]>([]);
  const [getAllEvaluated, {data, loading}] = useGetEvaluateByUser(
    fragmentGetEvaluateByUserId,
  );

  const invokeGetAllEvaluated = () => {
    getAllEvaluated({
      variables: {
        userId: userInfo?.userId?.id || '',
      },
      fetchPolicy: 'no-cache',
    });
  };

  const renderLoader = () => {
    return (
      <View style={{marginTop: responsive(16), alignItems: 'center'}}>
        <ActivityIndicator color={colors.PRIMARY} size="large" />
      </View>
    );
  };

  useEffect(() => {
    invokeGetAllEvaluated();
  }, []);

  useEffect(() => {
    data && setListEvaluated(data.getEvaluateByUser as Evaluate[]);
  }, [data]);

  return (
    <ScreenWithBackLayout
      title="Yêu cầu đã được đánh giá"
      subTitle="Những yêu cầu đã được đánh giá"
      onHandleGoBack={() => navigation.goBack()}>
      {loading ? (
        renderLoader()
      ) : (
        <>
          {listEvaluated.length === 0 && !loading ? (
            <EmptyTabWithImage
              image={EmptyImage}
              title="Chưa có nhà tuyển dụng nào đánh giá hồ sơ của bạn"
            />
          ) : (
            <FlatList
              style={styles.listWrapper}
              data={listEvaluated}
              renderItem={({item: evaluated}) => (
                <EmployerCard
                  key={evaluated._id}
                  company={evaluated.evaluator?.company as Company}
                  onPress={() =>
                    navigation.navigate('ApplyEvaluatedDetail', {
                      id: evaluated._id || '',
                    })
                  }
                />
              )}
              keyExtractor={(evaluated, index) =>
                evaluated?._id || index.toString()
              }
            />
          )}
        </>
      )}
    </ScreenWithBackLayout>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    marginTop: responsive(20),
  },
});

export default ApplyEvaluated;
