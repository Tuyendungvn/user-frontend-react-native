import React, {memo} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {colors, responsive} from '@common/styles';
import {HourGlassFill, LocationFill, MoneyFill} from '@assets/svg';
import {Recruitment} from '@apiCaller';
import {StyleSheet} from 'react-native';
import {truncate, formatDate} from '@common/functions';
import {genSVGProps} from '@common/utils/base';

interface IRecruitmentCardProps {
  recruitment: Recruitment;
  title?: string;
  subTitle?: string;
  onPress: () => void;
}

const RecruitmentCard: React.FC<IRecruitmentCardProps> = ({
  recruitment,
  title,
  subTitle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.topWrapper}>
        <Image
          source={{
            uri:
              recruitment?.companyImages?.[0]?.small ||
              'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/user-info/Skeleton-avatar.jpg',
          }}
          style={styles.image}
        />
        <View style={styles.topTextWrapper}>
          <Text style={styles.companyName}>
            {subTitle
              ? truncate(subTitle, 40)
              : `${truncate(recruitment?.companyName, 30) || 'Không rõ'}`}
          </Text>
          <Text style={styles.JobName}>
            {title
              ? truncate(title, 25)
              : `${truncate(recruitment?.name, 25) || 'Không rõ'}`}
          </Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationWrapper}>
          <LocationFill
            {...genSVGProps(responsive(16), responsive(16), colors.PRIMARY)}
            style={{marginRight: responsive(16)}}
          />
          <Text style={styles.locationText}>
            {(recruitment?.location?.length as number) > 0
              ? truncate(
                  recruitment?.location?.map(item => item.location),
                  50,
                )
              : 'Không rõ địa điểm'}
          </Text>
        </View>
      </View>

      <View style={styles.bottomWrapper}>
        <View style={styles.bottomItemWrapper}>
          <MoneyFill
            {...genSVGProps(responsive(16), responsive(16), colors.PRIMARY)}
            style={{marginRight: responsive(16)}}
          />
          <Text style={styles.bottomText}>
            {!recruitment?.dealSalary && recruitment?.salaryMax
              ? `Trên ${recruitment?.salaryMin} triệu`
              : 'Thỏa thuận'}
          </Text>
        </View>

        <View style={styles.bottomItemWrapper}>
          <HourGlassFill
            {...genSVGProps(responsive(16), responsive(16), colors.PRIMARY)}
            style={{marginRight: responsive(16)}}
          />
          <Text style={styles.bottomText}>
            {formatDate(recruitment?.createdAt)} {' - '}
            {formatDate(recruitment?.expiredDate)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(241, 241, 241, 0.5)',
    height: responsive(150),
    width: '100%',
    paddingHorizontal: responsive(25),
    paddingVertical: responsive(20),
    marginBottom: responsive(15),
    borderRadius: 8,
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: responsive(40),
    width: responsive(40),
    marginRight: responsive(16),
    borderRadius: 8,
  },
  topTextWrapper: {
    marginTop: 0,
    maxWidth: responsive(280),
    height: responsive(46),
    justifyContent: 'space-between',
  },
  companyName: {
    color: '#0D0229',
    opacity: 0.8,
    fontWeight: '500',
    marginVertical: 0,
    fontSize: 11,
    lineHeight: 12,
    marginBottom: 10,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  JobName: {
    color: '#0D0229',
    fontSize: 14,
    lineHeight: 16,
    flexWrap: 'wrap-reverse',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  locationContainer: {
    marginTop: responsive(18.5),
  },

  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsive(260),
  },
  locationText: {
    color: '#0D0229',
    fontWeight: '300',
    opacity: 0.8,
    fontSize: 11,
  },

  bottomWrapper: {
    marginTop: responsive(10),
    width: responsive(285),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomItemWrapper: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
  },

  bottomText: {
    color: '#0D0229',
    opacity: 0.8,
    fontWeight: '300',
    fontSize: 11,
  },
});

export default memo(RecruitmentCard);
