import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { colors, responsive, typos } from '@common/styles';
import { Add } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';
interface IProps {
  title: string;
  style?: ViewStyle;
}
const ButtonAdd: React.FC<IProps> = ({ title, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Add {...genSVGProps(responsive(20), responsive(20))} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default ButtonAdd;

const styles = StyleSheet.create({
  container: {
    padding: responsive(20),
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.LINE,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: responsive(4),
  },
  text: {
    marginLeft: responsive(10),
    ...typos.sm.medium,
  },
});
