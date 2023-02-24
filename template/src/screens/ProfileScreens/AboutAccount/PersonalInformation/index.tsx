import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { colors, responsive, shadow, typos } from '@common/styles';
import { Edit } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';
import { useAppSelector } from '@hooks/useRedux';

import DialogEditProfile from './DialogEditProfile';
import DialogEditFile from './DialogEditFile';
import DialogEditDescription from './DialogEditDescription';


import { formatDate } from '@common/functions';

import { File } from '@assets/svg';
interface IProps {}
export const PersonalInformation: React.FC<IProps> = () => {
  const { currentUser, record } = useAppSelector(state => state.profile);
  const {
    email,
    phoneNumber,
    province,
    district,
    ward,
    gender,
    identityCard,
    birthday,
    street
  } = currentUser || {};

  const { fileNameCV , description } = record || {};

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);
  const [isEditFile, setIsEditFile] = useState(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: responsive(10),
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight :  responsive(10)
            }}>
            <File {...genSVGProps(responsive(14), responsive(14))} />
            <Text style={{ ...typos.lg.normal, marginLeft: responsive(10) }}>
               { record ? fileNameCV : "Chưa có hồ sơ"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsEditFile(true);
            }}>
            <Edit {...genSVGProps(responsive(13), responsive(13))} />
          </TouchableOpacity>
        </View>
        <View style={[styles.container, {
           marginBottom: responsive(10),
        }]}>
          <View style={styles.sectionWrapper}>
            <Text style={{ ...typos.lg.bold }}>Thông tin cá nhân</Text>
            <TouchableOpacity
              onPress={() => {
                setIsEditProfile(true);
              }}>
              <Edit {...genSVGProps(responsive(13), responsive(13))} />
            </TouchableOpacity>
          </View>
          <View>
            <Section title="Email :" content={email || ''} />
            <Section
              title="Ngày sinh :"
              content={birthday ? formatDate(new Date(birthday)) : ''}
            />
            <Section title="Điện thoại :" content={phoneNumber || ''} />
            <Section title="CMND :" content={identityCard || ''} />
            <Section
              title="Giới tính :"
              content={gender === 'male' ? 'Nam' : 'Nữ' || ''}
            />
            <Section title="Tỉnh :" content={province?.name || ''} />
            <Section title="Quận/ huyện :" content={district?.name || ''} />
            <Section title="Phường/ xã :" content={ward?.name || ''} />
            <Section title="Địa chỉ chi tiết :" content={street?.name || ''} />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.sectionWrapper}>
            <Text style={{ ...typos.lg.bold }}>Mô tả</Text>
            <TouchableOpacity
              onPress={() => {
                setIsEditDescription(true);
              }}>
              <Edit {...genSVGProps(responsive(13), responsive(13))} />
            </TouchableOpacity>
          </View>
          <View>
              <Text style={{
                ...typos.lg.normal
              }}>{description}</Text>
          </View>
        </View>
        <DialogEditProfile
          onClose={() => {
            setIsEditProfile(false);
          }}
          open={isEditProfile}
        />
         <DialogEditFile
          onClose={() => {
            setIsEditFile(false);
          }}
          open={isEditFile}
        />
        <DialogEditDescription
          onClose={() => {
            setIsEditDescription(false);
          }}
          open={isEditDescription}
        />
      </View>
    </ScrollView>
  );
};

const Section: React.FC<{
  title: string;
  content: string;
  isBorder?: boolean;
}> = props => {
  const { title, content, isBorder = true } = props;
  return content ? (
    <View
      style={{
        paddingBottom: isBorder ? responsive(4) : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: responsive(8),
      }}>
      <Text style={{ ...typos.sm.bold , marginRight : responsive(10) }}>{title} </Text>
      <Text style={{ ...typos.sm.normal  }}>{content} </Text>
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  wrapper: {
    padding: responsive(20),
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  container: {
    padding: responsive(20),
    borderRadius: responsive(4),
    borderColor: colors.LINE,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    backgroundColor: colors.WHITE,
  },
  sectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsive(20),
    alignItems: 'center',
  },
});

export default PersonalInformation;
