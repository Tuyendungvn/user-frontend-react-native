import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {responsive, typos} from '@common/styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Form from './Form';
import Note from './Note';
import {IRootStackParamList} from '@navigator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Box} from 'native-base';

interface IProps
  extends NativeStackScreenProps<IRootStackParamList, 'Register'> {}
const RegisterForm: React.FC<IProps> = ({navigation}) => {
  return (
    <Box style={styles.wrapper} safeArea _ios={{padding: responsive(20)}}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng ký</Text>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Form
            onSuccess={(phoneNumber, email, password, displayName) =>
              navigation.navigate('RegisterVerifyOTP', {
                phoneNumber,
                email,
                displayName,
                password,
              })
            }
          />
          <View style={{marginTop: responsive(16)}}>
            <Note
              title="Bạn đã có tài khoản?"
              description="Đăng nhập"
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
          </View>
          <View style={{marginTop: responsive(100)}}>
            <Note
              title="Với việc đăng ký, bạn đã đồng ý với"
              description="Điều khoản điều kiện và Chính sách bảo mật"
              onPress={() => {}}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Box>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: responsive(20),
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  title: {
    ...typos.xxl.bold,
    marginTop: responsive(0),
  },
});
