import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import NotifyCard from '@components/cards/NotifycationCard';
import { truncate } from '@common/functions';
import { CompositeNavigationProp } from '@react-navigation/native';
import { IBottomParamList, IRootStackParamList } from '@navigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyImage from '@assets/images/Empty-Applied-Job.png';
import { colors, responsive } from '@common/styles';
import EmptyTabWithImage from '@components/EmptyTabWithImage';
import Layout from '@layouts/ScreenStaticLayout';

//api
import { Notify, useGetNotifyByUser } from '@apiCaller';
import { fragmentGetNotifyByUserId } from '@services/notify';

//redux
import { useAppSelector, useAppDispatch } from '@hooks/useRedux';
import { resetReloadNotify, setActiveNotify } from '@redux/slices/notify';
import { IRootState } from '@redux';

type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<IBottomParamList, 'Notify'>,
  NativeStackNavigationProp<IRootStackParamList, 'NotifyList'>
>;

interface INotifyMainScreenProps {
  navigation: NavigationProps;
}

const INITIAL_SIZE = 5;

const MainScreen: React.FC<INotifyMainScreenProps> = ({ navigation }) => {
  const [listNotify, setListNotify] = useState<Notify[]>([]);
  const [getAllNotify, { data, loading }] = useGetNotifyByUser(
    fragmentGetNotifyByUserId
  );
  const [refreshControl, setRefreshControl] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  //redux
  const { userInfor } = useAppSelector((state: IRootState) => state.auth);
  const { isReloadNotify } = useAppSelector(
    (state: IRootState) => state.notify
  );
  const dispatch = useAppDispatch();
  const id = userInfor?.userId?.id || '';

  const invokeGetAllNotify = () => {
    getAllNotify({
      variables: {
        userId: id,
        page: currentPage,
        size: INITIAL_SIZE,
      },
      fetchPolicy: 'no-cache',
    });
  };

  const loadMoreNotify = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderLoader = () => {
    if (data?.getNotifyByUser.length === 0) {
      return <></>;
    }
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: responsive(20),
        }}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  };

  useEffect(() => {
    invokeGetAllNotify();
  }, [currentPage]);

  useEffect(() => {
    console.log('Is reload', isReloadNotify);
    if (isReloadNotify === true) {
      setRefreshControl(true);
    }
    dispatch(resetReloadNotify());
  }, [isReloadNotify]);

  useEffect(() => {
    if (data) {
      setListNotify([...listNotify, ...(data?.getNotifyByUser || [])]);
    }
  }, [data]);

  useEffect(() => {
    if (refreshControl === true) {
      setListNotify([]);
      getAllNotify({
        variables: {
          userId: id,
          page: 0,
          size: INITIAL_SIZE,
        },
        fetchPolicy: 'no-cache',
      });
    }
    setRefreshControl(false);
  }, [refreshControl]);

  useEffect(() => {
    if (listNotify?.length > 0) {
      let existed = listNotify.find(item => item.seen === false);
      existed === undefined
        ? dispatch(setActiveNotify(false))
        : dispatch(setActiveNotify(true));
    }
  }, [listNotify]);

  return (
    <Layout title="Thông báo của bạn" noPaddingY>
      {listNotify?.length === 0 && !loading ? (
        <EmptyTabWithImage
          image={EmptyImage}
          title="Bạn hiện chưa có thông báo nào"
        />
      ) : (
        <FlatList
          style={{ marginTop: responsive(30) }}
          data={listNotify}
          renderItem={({ item }) => (
            <NotifyCard
              isSeen={item.seen || false}
              day={item.createdAt?.prettyDate()}
              title={item.company?.name || 'Không rõ tên công ty'}
              subTitle={item.name || 'Không rõ tiêu đề'}
              message={truncate(item.description, 100) || 'Không có mô tả'}
              onPress={() =>
                navigation.navigate('NotifyDetail', {
                  id: item._id || '',
                  invitedRecruitmentId:
                    item.invitationApply?.recruitment?._id ||
                    item.scheduleInterview?.recruitment?._id ||
                    '',
                })
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
          ListFooterComponent={renderLoader}
          onEndReached={() => loadMoreNotify()}
        />
      )}
    </Layout>
  );
};

export default MainScreen;
