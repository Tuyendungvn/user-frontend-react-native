import React, {useEffect, useState, memo} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Heart, InfoFill, LocationFill, HeartFill} from '@assets/svg';
import {colors, responsive} from '@common/styles';
import {genSVGProps} from '@common/utils/base';
import {truncate} from '@common/functions';

//redux
import {useAppSelector} from '@hooks/useRedux';
import {IRootState} from '@redux';
import {useToast} from '@hooks/useToast';

//api
import {
  Company,
  useSetSubscribedCompany,
  useSetUnSubscribedCompany,
} from '@apiCaller';

interface ICompanyCardProps {
  company: Company;
  title?: string;
  subTitle?: string;
  onPress: () => void;
}

const CompanyCard: React.FC<ICompanyCardProps> = ({company, onPress}) => {
  const [setSubcribeCompany, {data: subcribeData}] = useSetSubscribedCompany();

  const [setUnSubcribeCompany, {data: unSubcribeData}] =
    useSetUnSubscribedCompany();
  const {userInfor} = useAppSelector((state: IRootState) => state.auth);
  const {showToast} = useToast();

  //local state
  const [isSubcribed, setIsSubcribe] = useState<boolean>(
    !!userInfor?.userInfo?.subscribedCompany?.has(company),
  );

  useEffect(() => {
    if (userInfor) {
      userInfor.userInfo?.subscribedCompany?.map(item => {
        if (item._id === company._id) {
          setIsSubcribe(true);
        }
      });
    }
  }, [userInfor]);

  useEffect(() => {
    if (subcribeData) {
      showToast('success', 'Theo dõi thành công');
      setIsSubcribe(true);
    }
  }, [subcribeData]);

  useEffect(() => {
    if (unSubcribeData) {
      showToast('success', 'Bỏ theo dõi thành công');
      setIsSubcribe(false);
    }
  }, [unSubcribeData]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.topWrapper}>
        <Image
          source={{
            uri:
              company?.images?.[0]?.small ||
              'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/user-info/Skeleton-avatar.jpg',
          }}
          style={styles.image}
        />
        <View style={styles.topTextWrapper}>
          <Text style={styles.companyName}>
            {truncate(company?.name, 18) || 'Không rõ'}
          </Text>
          <Text style={styles.hireQuantity}>
            Số người theo dõi: {company.subscribe || 0}
          </Text>
        </View>
        <Pressable
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            isSubcribed
              ? setUnSubcribeCompany({
                  variables: {
                    companyId: company._id || '',
                    userId: userInfor?.userId?.id || '',
                  },
                })
              : setSubcribeCompany({
                  variables: {
                    companyId: company._id || '',
                    userId: userInfor?.userId?.id || '',
                  },
                });
          }}>
          {isSubcribed ? (
            <HeartFill
              {...genSVGProps(responsive(20), responsive(20), colors.PRIMARY)}
            />
          ) : (
            <Heart
              {...genSVGProps(responsive(16), responsive(16), colors.PRIMARY)}
            />
          )}
        </Pressable>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationWrapper}>
          <LocationFill
            {...genSVGProps(responsive(16), responsive(16), colors.PRIMARY)}
            style={{marginRight: responsive(15)}}
          />
          <Text style={styles.locationText}>
            {(company?.location?.length as number) > 0
              ? truncate(company?.location || 'Không rõ địa điểm', 40)
              : 'Không rõ địa điểm'}
          </Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationWrapper}>
          <InfoFill
            {...genSVGProps(responsive(16), responsive(16), colors.PRIMARY)}
            style={{marginRight: responsive(15)}}
          />
          <Text style={styles.locationText}>
            {truncate(`${company?.career?.map(item => item.name)}`, 30) ||
              'Không rõ ngành nghề'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(241, 241, 241, 0.8)',
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
    justifyContent: 'space-between',
  },
  image: {
    height: responsive(40),
    width: responsive(40),
    marginRight: responsive(12),
    borderRadius: 8,
  },
  topTextWrapper: {
    marginTop: 0,
    width: 200,
    height: responsive(46),
    alignContent: 'space-between',
  },
  hireQuantity: {
    color: '#0D0229',
    opacity: 0.8,
    fontWeight: '500',
    marginVertical: 0,
    fontSize: 11,
    lineHeight: responsive(27),
    marginBottom: 10,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  companyName: {
    color: '#0D0229',
    fontSize: 14,
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
    width: responsive(255),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomItemWrapper: {
    width: 130,
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

export default memo(CompanyCard);
