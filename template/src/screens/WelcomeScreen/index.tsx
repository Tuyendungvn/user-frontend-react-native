import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { colors, responsive, typos } from '@common/styles';
import Button from '@designs/Button';
import { useAuth } from '@hooks/useAuth';

interface IProps {}

const WelcomeComponent: React.FC<IProps> = ({}) => {
  const { onHandleDoneFirstTime } = useAuth();

  return (
    <View style={styles.container}>
      <Image source={require('@assets/images/Welcome.png')} />
      <Text style={styles.title}>Tất cả những gì bạn cần</Text>
      <Text style={styles.description}>
        tuyendungvn.com là trang thông tin tuyển dụng hàng đầu, kết nối trực
        tiếp ứng viên và nhà tuyển dụng.
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          width: '100%',
        }}>
        <Button
          title="Bắt đầu"
          onPress={() => {
            onHandleDoneFirstTime();
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

    padding: responsive(20),
  },
  title: {
    ...typos.xl.bold,
    textAlign: 'center',
    marginTop: responsive(30),
  },
  description: {
    ...typos.sm.normal,
    color: colors.BODY,
    textAlign: 'center',
  },
});

export default WelcomeComponent;
