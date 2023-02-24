import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors, responsive, shadow, typos } from '@common/styles';
import { truncate } from '@common/functions';
import { Edit } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';
import { useAppSelector } from '@hooks/useRedux';

import DialogEdit from './Dialog';
interface IProps {}
export const GeneralInformation: React.FC<IProps> = () => {
  const { currentUser } = useAppSelector(state => state.profile);
  const { displayName, code, title, history, career } = currentUser || {};

  const [isEdit, setIsEdit] = useState(false);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.sectionWrapper}>
          <Text style={{ ...typos.lg.bold }}>Thông tin chung</Text>
          <TouchableOpacity
            onPress={() => {
              setIsEdit(true);
            }}>
            <Edit {...genSVGProps(responsive(14), responsive(14))} />
          </TouchableOpacity>
        </View>
        <View>
          <Section
            title="Họ và tên :"
            content={truncate(displayName, 20) || ''}
          />
          <Section
            title="Mã số ứng viên :"
            content={truncate(code, 20) || ''}
          />
          <Section
            title="Vị trí ứng tuyển :"
            content={truncate(title, 20) || ''}
          />
          <Section
            title="Ngành nghề ứng tuyển :"
            content={
              truncate(
                `${career?.map(item => (item.name as string) + ', ')}`,
                20
              ) || ''
            }
          />
          <Section
            title="Tiểu sử :"
            content={truncate(history, 20) || ''}
            isBorder={false}
          />
        </View>
      </View>
      <DialogEdit
        onClose={() => {
          setIsEdit(false);
        }}
        open={isEdit}
      />
    </View>
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
      <Text style={{ ...typos.sm.bold, marginRight: responsive(10) }}>
        {title}{' '}
      </Text>
      <Text style={{ ...typos.sm.normal }}>{content} </Text>
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

export default GeneralInformation;
