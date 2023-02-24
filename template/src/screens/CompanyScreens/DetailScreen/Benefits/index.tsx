import React, {useState, useEffect} from 'react';
import {Text, Image, View} from 'react-native';
import {colors, responsive} from '@common/styles';
import ScrollableTabLayout from '@layouts/ScrollableTabLayout';
import EmptyTab from '@components/EmptyTab';

//redux
import {useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';
import {StyleSheet} from 'react-native';
import {BenefitType} from '@apiCaller';

interface IBenefit {}

const Benefits: React.FC<IBenefit> = () => {
  const {currentCompany} = useAppSelector((state: IRootState) => state.company);
  const [listBenefit, setListBenefit] = useState<BenefitType[]>([]);

  useEffect(() => {
    setListBenefit(currentCompany?.benefits as BenefitType[]);
  }, [currentCompany?.benefits]);

  return (
    <ScrollableTabLayout
      isEmpty={listBenefit.length === 0}
      emptyComponent={<EmptyTab title="Không có phúc lợi để hiển thị" />}>
      {listBenefit?.map(benefit => (
        <View style={styles.benefitItemWrapper} key={benefit._id}>
          <Image
            loadingIndicatorSource={{
              uri: 'https://www.freeiconspng.com/images/load-icon-png',
              width: responsive(40),
              height: responsive(40),
            }}
            source={{
              uri:
                benefit.icon?.icon?.default ||
                benefit.icon?.icon?.small ||
                benefit.icon?.icon?.medium ||
                'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/Icon_Benefit/6986db36-701b-4e14-a42f-757b851db6d1-fileName.jpg',
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
    marginBottom: responsive(20),
    maxHeight: responsive(80),
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
