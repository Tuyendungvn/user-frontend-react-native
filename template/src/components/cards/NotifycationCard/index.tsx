import { ArrowRight } from '@assets/svg';
import { responsive, colors } from '@common/styles';
import { genSVGProps } from '@common/utils/base';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface INotifyCard {
  title?: string;
  subTitle?: string;
  day?: string;
  message?: string;
  onPress: () => void;
  isSeen: boolean;
}

const NotifyCard: React.FC<INotifyCard> = ({
  title,
  subTitle,
  day,
  message,
  isSeen,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.bottomWrapper}>
          <Text style={styles.bottomText}>{day}</Text>

          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: isSeen ? colors.GRAY : colors.PRIMARY },
            ]}>
            <ArrowRight
              {...genSVGProps(responsive(16), responsive(16), colors.WHITE)}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotifyCard;

const styles = StyleSheet.create({
  container: {
    padding: responsive(10),
    marginBottom: responsive(20),
    borderWidth: 1,
    borderColor: colors.GRAY,
    width: '100%',
    height: responsive(137),
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 17,
    fontWeight: '600',
  },
  subTitle: {
    color: colors.BLACK,
    marginTop: responsive(10),
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17,
  },
  message: {
    marginTop: responsive(10),
    color: colors.BODY,
    fontSize: 11,
  },
  textWrapper: {
    height: '100%',
    width: '90%',
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsive(10),
    width: responsive(300),
  },
  bottomText: {
    color: colors.PRIMARY,
    fontSize: 11,
    lineHeight: 13,
  },
  iconWrapper: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsive(6),
    width: responsive(24),
    height: responsive(24),
    backgroundColor: colors.PRIMARY,
    borderRadius: 8,
  },
});
