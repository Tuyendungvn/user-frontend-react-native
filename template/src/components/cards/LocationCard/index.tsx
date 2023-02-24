import React from 'react';
import { colors, responsive } from '@common/styles';
import { StyleSheet, Text, View, Image } from 'react-native';

import { LocationFill } from '@assets/svg';
import { Icon } from 'native-base';

interface ILocationCardProps {
  title?: string;
  subTitle?: string;
  avatar?: string;
}

const LocationCard: React.FC<ILocationCardProps> = ({
  title,
  subTitle,
  avatar,
}) => {
  return (
    <View style={styles.contaier}>
      <Image
        style={styles.image}
        source={{
          uri:
            avatar ||
            'https://freedesignfile.com/upload/2013/08/logo-vector-4.jpg',
        }}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title || 'Không rõ tên công ty'}</Text>
        <View style={styles.subTitleWrapper}>
          <Icon
            as={LocationFill}
            style={{ marginRight: responsive(10), width: 10, height: 10 }}
          />
          <Text style={styles.subTitle}>{subTitle || 'Không rõ địa điểm'}</Text>
        </View>
      </View>
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  contaier: {
    padding: responsive(15),
    borderRadius: 10,
    shadowColor: colors.GRAY,
    shadowOpacity: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsive(112),
    marginTop: responsive(210),
    marginBottom: responsive(10),
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  textWrapper: {
    maxHeight: responsive(80),
    width: responsive(210),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  subTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive(10),
    width: responsive(190),
  },
  subTitle: {
    fontWeight: '400',
    flexWrap: 'wrap',
    fontSize: 11,
    lineHeight: 13,
    color: colors.BODY,
  },
});
