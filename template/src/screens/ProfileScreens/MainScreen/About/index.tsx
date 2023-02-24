import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Box} from 'native-base';
import React, {useState} from 'react';
import {colors, responsive, typos} from '@common/styles';
import {SvgProps} from 'react-native-svg';
import {User} from '@apiCaller';
import {genSVGProps} from '@common/utils/base';
import AlertDialog from '@components/AlertDialog';
import {
  RightIcon,
  Account,
  StarPrimary,
  Employee,
  HandBag,
  Logout,
  Key,
  CreateCV,
} from '@assets/svg';
import {useAuth} from '@hooks/useAuth';

import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {IBottomParamList, IRootStackParamList} from '@navigator';
type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<IBottomParamList, 'Home'>,
  NativeStackNavigationProp<IRootStackParamList, 'Main'>
>;
interface IProps {
  user: User | null;
  navigation: NavigationProps;
}

interface ISectionData {
  Icon: React.FC<SvgProps>;
  name: string;
  navigate: keyof IRootStackParamList | '';
}

const sections: ISectionData[] = [
  {
    name: 'Hồ sơ ứng viên',
    Icon: Account,
    navigate: 'AboutAccount',
  },
  {
    name: 'Yêu cầu đã được đánh giá',
    Icon: StarPrimary,
    navigate: 'ApplyEvaluated',
  },
  {
    name: 'Việc làm của tôi',
    Icon: HandBag,
    navigate: 'MyJob',
  },
  {
    name: 'Nhà tuyển dụng xem hồ sơ',
    Icon: Employee,
    navigate: 'EmployerViewProfile',
  },
  {
    name: 'Thay đổi mật khẩu',
    Icon: Key,
    navigate: 'ChangePassword',
  },
  {
    name: 'Tạo CV',
    Icon: CreateCV,
    navigate: 'CreateCV',
  },
];
const About: React.FC<IProps> = ({user, navigation}) => {
  const {logout} = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const onHandleLogOut = () => {
    setIsOpen(true);
  };
  return (
    <Box style={styles.container} _ios={{paddingX: responsive(20)}}>
      {sections.map((value, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate(value.navigate as any);
            }}>
            <Section {...value} />
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity onPress={onHandleLogOut}>
        <View
          style={[
            styles.recordContainer,
            {
              marginTop: responsive(10),
              justifyContent: 'flex-start',
              borderBottomWidth: 0,
            },
          ]}>
          <Logout
            {...genSVGProps(responsive(20), responsive(20), undefined, {
              marginRight: responsive(16),
            })}
          />
          <Text style={styles.title}>Đăng xuất</Text>
        </View>
      </TouchableOpacity>

      <AlertDialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title="Đăng xuất"
        message="Đăng xuất khỏi tài khoản này?"
        onConfirm={() => {
          logout();
        }}
      />
    </Box>
  );
};

const Section: React.FC<ISectionData> = props => {
  const {Icon, name} = props;
  return (
    <View
      style={[
        styles.recordContainer,
        {
          marginTop: responsive(10),
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <Icon
          {...genSVGProps(responsive(20), responsive(20), undefined, {
            marginRight: responsive(16),
          })}
        />
        <Text style={styles.title}>{name}</Text>
      </View>
      <RightIcon {...genSVGProps(responsive(12), responsive(12))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: responsive(20),
  },
  recordContainer: {
    paddingHorizontal: responsive(20),
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    paddingBottom: responsive(10),
    paddingTop: responsive(8),
    borderBottomColor: colors.LINE,
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    ...typos.sm.bold,
  },
});

export default About;
