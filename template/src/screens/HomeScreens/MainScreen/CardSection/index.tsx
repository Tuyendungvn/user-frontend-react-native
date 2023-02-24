import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, Bag, Mail } from '@assets/svg';

//components
import HomeInfoCard from '@components/cards/HomeInfoCard';
import { colors, responsive } from '@common/styles';

interface ICardSectionProps {}

interface IInfoItem {
  id: string;
  icon: typeof Clock;
  title: string;
  subTitle: string;
}

const CardSection: React.FC = () => {
  const listInfo = useMemo<IInfoItem[]>(
    () => [
      {
        id: '_1',
        icon: Clock,
        title: 'Đăng ký nhanh',
        subTitle:
          'Dễ dàng ứng tuyển vào nhiều công việc chỉ với một cú nhấp chuột!',
      },
      {
        id: '_2',
        icon: Bag,
        title: 'Giới thiệu công việc cá nhân',
        subTitle:
          'Sử dụng quy trình tìm kiếm việc làm hiện đại của chúng tôi giúp việc tìm kiếm vai trò hoàn hảo của bạn trở nên dễ dàng.',
      },
      {
        id: '_3',
        icon: Mail,
        title: 'Tìm kiếm khi đang di chuyển',
        subTitle:
          'Bạn có thể nhanh chóng nộp đơn xin việc, lập sơ yếu lý lịch và hơn thế nữa từ điện thoại và máy tính của mình.',
      },
    ],
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TuyendungVN có thể giúp gì?</Text>
      {listInfo.map(info => (
        <HomeInfoCard
          key={info.id}
          title={info.title}
          subTitle={info.subTitle}
          Icon={info.icon}
        />
      ))}
    </View>
  );
};

export default CardSection;

const styles = StyleSheet.create({
  container: {
    marginTop: responsive(40),
    marginBottom: responsive(30),
  },

  heading: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: responsive(24),
  },
});
