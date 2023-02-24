import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, responsive, typos} from '@common/styles';
import {Medal, Star, Point} from '@assets/svg';
import {genSVGProps} from '@common/utils/base';

//api
import {
  User,
  useGetRatingByUser,
  Evaluate,
  useGetEvaluateByUser,
} from '@apiCaller';
import {fragmentGetRatingByUser} from '@services/rating';
import {fragmentGetEvaluateByUserId} from '@services/evaluate';

//locals
import UploadAvatarDialog from './UploadAvatarDialog';

interface IProps {
  user: User | null;
}

const awsSkeleton =
  'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/user-info/Skeleton-avatar.jpg';

const Profile: React.FC<IProps> = ({user}) => {
  const {urlAvt, displayName, _id, point} = user || {};

  //api
  const [invokedRatingByUser, {data}] = useGetRatingByUser(
    fragmentGetRatingByUser,
  );
  const [invkedEvaluateByUser, {data: evaluateData}] = useGetEvaluateByUser(
    fragmentGetEvaluateByUserId,
  );

  //local state
  const [evaluateList, setEvaluateList] = useState<Evaluate[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [averageEvaluatePoint, setAverageEvaluatePoint] = useState<number>(0);

  useEffect(() => {
    if (_id) {
      invokedRatingByUser({
        variables: {
          userId: _id || '',
        },
      });
      invkedEvaluateByUser({
        variables: {
          userId: _id || '',
        },
      });
    }
  }, [_id]);

  useEffect(() => {
    evaluateData &&
      setEvaluateList(evaluateData.getEvaluateByUser as Evaluate[]);
  }, [evaluateData]);

  useEffect(() => {
    evaluateList &&
      setAverageEvaluatePoint(
        evaluateList
          ?.map((evaluate: Evaluate) => evaluate.avgPoint)
          .reduce((previousValue: number, currentValue: number) => {
            return (previousValue + currentValue) / evaluateList.length;
          }, 0) as number,
      );
  }, [evaluateList]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpenDialog(true)}>
        <Image
          borderRadius={9999}
          source={{
            uri:
              urlAvt?.default || urlAvt?.small || urlAvt?.medium || awsSkeleton,
          }}
          resizeMode="cover"
          style={{
            width: responsive(80),
            height: responsive(80),
            borderRadius: responsive(40),
          }}
        />
      </TouchableOpacity>
      <UploadAvatarDialog
        onClose={() => setOpenDialog(false)}
        open={openDialog}
      />
      <Text style={styles.textName}>{displayName}</Text>
      <View
        style={[
          styles.medal,
          {
            backgroundColor: 'rgba(234, 78, 27, 0.12)',
            marginTop: responsive(16),
          },
        ]}>
        <Medal {...genSVGProps(responsive(20), responsive(20))} />
        <Text style={[styles.textMedal, {color: colors.PRIMARY}]}>
          {data?.getRatingByUser?.rate || 'Thành viên mới'}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: responsive(10),
        }}>
        <View
          style={[
            styles.medal,
            {
              backgroundColor: 'rgba(246, 182, 0, 0.12)',
            },
          ]}>
          <Star {...genSVGProps(responsive(20), responsive(20))} />
          <Text style={[styles.textMedal, {color: colors.SECONDARY}]}>
            Điểm đánh giá: {averageEvaluatePoint || 0}
          </Text>
        </View>

        <View
          style={[
            styles.medal,
            {
              backgroundColor: 'rgba(241, 241, 241, 1)',
              marginLeft: responsive(10),
            },
          ]}>
          <Point {...genSVGProps(responsive(20), responsive(20))} />
          <Text style={[styles.textMedal, {color: colors.BLACK}]}>
            Điểm tích lũy : {point}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsive(16),
    paddingVertical: responsive(20),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    ...typos.xl.bold,
    textAlign: 'center',
    marginTop: responsive(16),
  },
  medal: {
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(8),
    borderRadius: responsive(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMedal: {
    ...typos.xs.medium,
    marginLeft: responsive(10),
  },
});

export default Profile;
