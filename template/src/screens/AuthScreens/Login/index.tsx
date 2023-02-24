import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {responsive, typos} from '@common/styles';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '@typings';

import LoginWithSocial from './Note';
import Form from './Form';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Box} from 'native-base';

interface ILoginScreenProps
  extends NativeStackScreenProps<IRootStackParamList, 'Login'> {}

const LoginScreen: React.FC<ILoginScreenProps> = props => {
  return (
    <Box style={styles.wrapper} safeArea _ios={{paddingX: responsive(20)}}>
      <KeyboardAwareScrollView extraScrollHeight={100}>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng nhập</Text>
          <Form {...props} />
          <LoginWithSocial {...props} />
        </View>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default LoginScreen;

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
