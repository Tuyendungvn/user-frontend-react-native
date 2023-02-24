import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { colors, responsive } from '@common/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IRootStackParamList } from '@navigator';

interface IProps extends NativeStackScreenProps<IRootStackParamList, 'Login'> {}
const Note: React.FC<IProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text
          style={{
            color: colors.BODY,
            marginRight: responsive(4),
          }}>
          Bạn chưa có tài khoản?{' '}
        </Text>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={{ color: colors.PRIMARY }}>Đăng kí ngay </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: responsive(40),
    justifyContent: 'flex-end',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default Note;
