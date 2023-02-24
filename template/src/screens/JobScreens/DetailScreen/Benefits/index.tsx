import React from 'react';
import { Text, Image, View } from 'react-native';
import { colors, responsive } from '@common/styles';
import ScrollableTabLayout from '@layouts/ScrollableTabLayout';

//redux
import { useAppSelector } from '@hooks/useRedux';
import { IRootState } from '@redux';
import { StyleSheet } from 'react-native';

interface IBenefit {}

const Benefits: React.FC<IBenefit> = () => {
  const { currentJob } = useAppSelector((state: IRootState) => state.job);
  const listBenefit = currentJob?.companyBenefit;

  return (
    <ScrollableTabLayout>
      {listBenefit?.map(benefit => (
        <View style={styles.benefitItemWrapper} key={benefit._id}>
          <Image
            source={{
              uri:
                benefit.icon?.icon?.default ||
                benefit.icon?.icon?.small ||
                benefit.icon?.icon?.medium ||
                'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/Icon_Benefit/326e326f-a59b-49b9-87a6-1e60bb1e18fd-fileName.jpg',
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.title}>
              {benefit.icon?.name || 'Không có tiêu đề'}
            </Text>
            <Text style={styles.subTitle}>
              {benefit.content || 'Không có nội dung'}
            </Text>
          </View>
        </View>
      ))}
    </ScrollableTabLayout>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    justifyContent: 'center',
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(40),
    maxHeight: responsive(470),
  },
  container: {
    height: responsive(400),
    backgroundColor: colors.WHITE,
  },

  benefitItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: responsive(80),
    width: responsive(330),
  },

  image: {
    height: 40,
    width: 40,
    marginRight: 15,
  },

  title: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: '600',
  },

  subTitle: {
    maxHeight: 50,
    maxWidth: 280,
    fontSize: 13,
  },
});

export default Benefits;
