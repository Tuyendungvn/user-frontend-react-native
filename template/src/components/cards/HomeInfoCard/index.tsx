import { HeartFill } from '@assets/svg';
import { responsive, colors } from '@common/styles';
import { genSVGProps } from '@common/utils/base';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IHomeInfoCard {
  title: string;
  subTitle: string;
  Icon: typeof HeartFill;
}

const HomeInfoCard: React.FC<IHomeInfoCard> = ({ title, subTitle, Icon }) => {
  return (
    <View style={styles.container}>
      <Icon
        {...genSVGProps(responsive(32), responsive(32), colors.PRIMARY)}
        style={styles.icon}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default HomeInfoCard;

const styles = StyleSheet.create({
  container: {
    padding: responsive(10),
    marginBottom: responsive(10),
    borderWidth: 0.5,
    borderColor: colors.GRAY,
    width: '100%',
    height: responsive(115),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '600',
  },
  subTitle: {
    color: colors.BODY,
    marginTop: responsive(10),
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
  },
  icon: {
    marginRight: responsive(20),
  },
  textWrapper: {
    height: '100%',
    width: '80%',
  },
});
