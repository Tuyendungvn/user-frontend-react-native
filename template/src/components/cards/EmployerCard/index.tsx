import {Company} from '@apiCaller';
import {truncate} from '@common/functions';
import {colors, responsive} from '@common/styles';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

interface IEmployerCard {
  company?: Company;
  title?: string;
  subTitle?: string;
  secondSubTitle?: string;
  onPress?: () => void;
}

const EmployerCard: React.FC<IEmployerCard> = ({
  company,
  title,
  subTitle,
  secondSubTitle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri:
            company?.images?.[0]?.default ||
            company?.images?.[0]?.medium ||
            company?.images?.[0]?.small ||
            'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/user-info/Skeleton-avatar.jpg',
        }}
      />
      <View>
        <Text style={styles.title}>
          {truncate(title, 35) ||
            truncate(company?.name, 35) ||
            'Không rõ tên công ty'}
        </Text>
        <Text style={styles.subTitle}>
          {truncate(subTitle, 43) ||
            truncate(company?.location, 43) ||
            'Không rõ địa điểm công ty'}
        </Text>
        <Text style={styles.subTitle}>
          {truncate(secondSubTitle, 43) ||
          (company?.career?.length as number) > 0
            ? truncate(
                `${company?.career?.map(
                  item => item.name || 'Ngành nghề' + ', ',
                )}`,
                43,
              )
            : 'Không rõ ngành nghề'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: responsive(15),
    height: responsive(80),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.GRAY,
    borderWidth: 1,
    marginBottom: responsive(20),
    borderRadius: 8,
  },
  image: {
    marginRight: responsive(15),
    width: responsive(50),
    height: responsive(50),
    borderRadius: 8,
  },
  title: {
    color: colors.BLACK,
    fontSize: 14,
    fontWeight: '600',
  },

  textWrapper: {
    width: '100%',
  },

  subTitle: {
    color: colors.BLACK,
    opacity: 0.8,
    fontSize: 11,
    textAlign: 'left',
  },
});

export default EmployerCard;
