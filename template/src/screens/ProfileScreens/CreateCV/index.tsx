import React, {useEffect, useState} from 'react';
import {IRootStackParamList} from '@navigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

//components
import Layout from '@layouts/ScreenWithBackLayout';
import LoadingBox from '@components/LoadingBox';
import Carousel from 'react-native-snap-carousel';
import {responsive} from '@common/styles';
import Button from '@designs/Button';

//template
import CV1 from '@assets/images/CV1.png';
import CV2 from '@assets/images/CV2.png';

//modals
import ModalCV1 from './template/CV1';
import ModalCV2 from './template/CV2';

//api
import {User, Record, useGetRecordByUser} from '@apiCaller';
import {fragmentGetRecordByUser} from '@services/record';

type INavigationProps = NativeStackNavigationProp<
  IRootStackParamList,
  'EmployerViewProfile'
>;
interface ICreateCVProps extends INavigationProps {
  navigation: INavigationProps;
}

const CreateCV: React.FC<ICreateCVProps> = ({navigation}) => {
  //local state
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Record | null>(null);
  const [currentCV, setCurrenCV] = useState<number>(1);
  const listImage = [
    {id: 1, image: CV1},
    {id: 2, image: CV2},
  ];
  const [getRecordByUser, {data, loading}] = useGetRecordByUser(
    fragmentGetRecordByUser,
  );

  //redux
  const userInfo = useAppSelector((state: IRootState) => state.auth.userInfor);

  //getRecord
  useEffect(() => {
    userInfo &&
      getRecordByUser({
        variables: {
          userId: userInfo.userId?.id || '',
        },
      });
  }, [userInfo]);

  useEffect(() => {
    if (data) {
      setCurrentRecord(data.getRecordByUser as Record);
    }
  }, [data]);

  const renderingItem = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.slide}>
        <Image
          style={styles.image}
          source={item.image}
          resizeMode="contain"
          loadingIndicatorSource={{
            uri: 'https://i.pinimg.com/originals/10/b2/f6/10b2f6d95195994fca386842dae53bb2.png',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Layout
      title="Chọn mẫu hồ sơ"
      subTitle="Chọn mẫu hồ sơ của bạn"
      onHandleGoBack={() => navigation.goBack()}>
      {loading ? (
        <LoadingBox width={335} height={440} spinnerSize="large" />
      ) : (
        <>
          <Carousel
            data={listImage}
            renderItem={renderingItem}
            onSnapToItem={index => setCurrenCV(index + 1)}
            sliderWidth={responsive(335)}
            itemWidth={responsive(335)}
            slideStyle={{width: responsive(335)}}
            layout={'default'}
            pagingEnabled={true}
            scrollEnabled={true}
          />
          <Button
            onPress={() => setOpenModal(true)}
            loading={false}
            type="primary"
            stylesCustom={{
              marginTop: responsive(40),
            }}
            title="Xem trước mẫu này"
          />
          {currentCV === 1 ? (
            <ModalCV1
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              user={userInfo?.userInfo as User}
              record={currentRecord as Record}
            />
          ) : (
            <ModalCV2
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              user={userInfo?.userInfo as User}
              record={currentRecord as Record}
            />
          )}
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  slide: {
    height: responsive(440),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  image: {
    width: '100%',
    borderRadius: 8,
  },
});

export default CreateCV;
