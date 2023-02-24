import {IRootStackParamList} from '@navigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import ScreenWithBackLayout from '@layouts/ScreenWithBackLayout';
import EmptyImage from '@assets/images/Empty-Evaluate.png';

//api
import {useGetRecordByUser, EmployerSeenRecord, Company} from '@apiCaller';
import {fragmentGetRecordByUser} from '@services/record';

import {useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';
import {colors, responsive} from '@common/styles';
import EmployerCard from '@components/cards/EmployerCard';
import EmptyTabWithImage from '@components/EmptyTabWithImage';

type INavigationProps = NativeStackNavigationProp<
  IRootStackParamList,
  'EmployerViewProfile'
>;
interface IEmployerViewProfile extends INavigationProps {
  navigation: INavigationProps;
}

const EmployerViewProfile: React.FC<IEmployerViewProfile> = ({navigation}) => {
  const {userInfor} = useAppSelector((state: IRootState) => state.auth);

  const [listEmployer, setListEmployer] = useState<EmployerSeenRecord[]>([]);
  const [getRecordByUser, {data, loading}] = useGetRecordByUser(
    fragmentGetRecordByUser,
  );

  const invokeGetRecord = () => {
    getRecordByUser({
      variables: {
        userId: userInfor?.userId?.id || '',
      },
    });
  };

  const renderLoader = () => {
    return (
      <View style={{marginTop: responsive(16), justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  };

  useEffect(() => {
    userInfor && invokeGetRecord();
  }, []);

  useEffect(() => {
    data && setListEmployer(data?.getRecordByUser?.employerSeenRecord || []);
  }, [data]);

  return (
    <ScreenWithBackLayout
      onHandleGoBack={() => navigation.goBack()}
      title="Nhà tuyển dụng xem hồ sơ"
      subTitle="Những nhà tuyển dụng đã xem hồ sơ của bạn">
      {loading ? (
        renderLoader()
      ) : (
        <>
          {listEmployer.length === 0 && !loading ? (
            <EmptyTabWithImage
              image={EmptyImage}
              title="Chưa có nhà tuyển dụng nào xem hồ sơ của bạn"
            />
          ) : (
            <FlatList
              style={styles.listWrapper}
              data={listEmployer}
              renderItem={({item: employer}) => (
                <EmployerCard
                  company={employer.employer?.company as Company}
                  key={employer.employer?._id}
                  onPress={() =>
                    navigation.navigate('CompanyDetail', {
                      id: employer.employer?.company?._id || '',
                    })
                  }
                />
              )}
              keyExtractor={(employer, index) =>
                employer.employer?._id || index.toString()
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

export default EmployerViewProfile;
