import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import ScrollableTabLayout from '@layouts/ScrollableTabLayout';
import {Evaluate, Notify} from '@apiCaller';
import {colors, responsive} from '@common/styles';
import Spinner from '@components/Spinner';

//api
import {Cancel, Checked} from '@assets/svg';

interface IEvaluatedBoardProps {
  evaluate?: Evaluate | null;
}

const EvaluatedBoard: React.FC<IEvaluatedBoardProps> = ({evaluate}) => {
  return (
    <ScrollableTabLayout
      emptyComponent={
        <View
          style={{
            marginTop: responsive(20),
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      }
      isEmpty={evaluate === null}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri:
              evaluate?.evaluator?.company?.images?.[0]?.default ||
              evaluate?.evaluator?.company?.images?.[0]?.medium ||
              evaluate?.evaluator?.company?.images?.[0]?.small ||
              'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/user-info/Skeleton-avatar.jpg',
          }}
        />
      </View>

      <Text style={styles.title}>
        {evaluate?.evaluator?.company?.name} đã đánh giá hồ sơ của bạn
      </Text>
      <Text style={styles.subTitle}>
        Điểm trung bình của bạn:{' '}
        <Text style={styles.largePoint}>
          {evaluate?.avgPoint || 'Không rõ '}
        </Text>
      </Text>
      <View
        style={{
          marginTop: responsive(10),
          height: responsive(450),
          maxHeight: responsive(600),
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={[styles.itemWrapper, {width: '95%'}]}>
          {(evaluate?.answer1?.point as number) >= 5 ? (
            <Checked style={styles.icon} />
          ) : (
            <Cancel style={styles.icon} />
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.itemTitle}>Siêng năng</Text>
            <Text style={styles.smallPointt}>{evaluate?.answer1?.point}</Text>
          </View>
        </View>
        <View style={[styles.itemWrapper, {width: '95%'}]}>
          {(evaluate?.answer2?.point as number) >= 5 ? (
            <Checked style={styles.icon} />
          ) : (
            <Cancel style={styles.icon} />
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.itemTitle}>Tư duy sáng tạo</Text>
            <Text style={styles.smallPointt}>{evaluate?.answer2?.point}</Text>
          </View>
        </View>
        <View style={[styles.itemWrapper, {width: '95%'}]}>
          {(evaluate?.answer3?.point as number) >= 5 ? (
            <Checked style={styles.icon} />
          ) : (
            <Cancel style={styles.icon} />
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.itemTitle}>Tích cực hoạt động cộng đồng</Text>
            <Text style={styles.smallPointt}>{evaluate?.answer3?.point}</Text>
          </View>
        </View>
        <View style={[styles.itemWrapper, {width: '95%'}]}>
          {(evaluate?.answer4?.point as number) >= 5 ? (
            <Checked style={styles.icon} />
          ) : (
            <Cancel style={styles.icon} />
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.itemTitle}>Hòa đồng thân thiện</Text>
            <Text style={styles.smallPointt}>{evaluate?.answer4?.point}</Text>
          </View>
        </View>
        <View style={[styles.itemWrapper, {width: '95%'}]}>
          {(evaluate?.answer5?.point as number) >= 5 ? (
            <Checked style={styles.icon} />
          ) : (
            <Cancel style={styles.icon} />
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.itemTitle}>Lanh lợi hoạt bát</Text>
            <Text style={styles.smallPointt}>{evaluate?.answer5?.point}</Text>
          </View>
        </View>
        <View style={[styles.itemWrapper, {width: '95%'}]}>
          {(evaluate?.answer6?.point as number) >= 5 ? (
            <Checked style={styles.icon} />
          ) : (
            <Cancel style={styles.icon} />
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.itemTitle}>Năng lực chuyên môn</Text>
            <Text style={styles.smallPointt}>{evaluate?.answer6?.point}</Text>
          </View>
        </View>
        <View style={[styles.itemWrapper, {width: '95%'}]}>
          {(evaluate?.answer7?.point as number) >= 5 ? (
            <Checked style={styles.icon} />
          ) : (
            <Cancel style={styles.icon} />
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.itemTitle}>Khả năng làm việc nhóm</Text>
            <Text style={styles.smallPointt}>{evaluate?.answer7?.point}</Text>
          </View>
        </View>
        <View style={[styles.itemWrapper, {width: '95%'}]}>
          {(evaluate?.answer8?.point as number) >= 5 ? (
            <Checked style={styles.icon} />
          ) : (
            <Cancel style={styles.icon} />
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.itemTitle}>Khả năng quản lý nhóm</Text>
            <Text style={styles.smallPointt}>{evaluate?.answer8?.point}</Text>
          </View>
        </View>
        <View style={[styles.itemWrapper, {width: '95%'}]}>
          {(evaluate?.answer9?.point as number) >= 5 ? (
            <Checked style={styles.icon} />
          ) : (
            <Cancel style={styles.icon} />
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.itemTitle}>Khả năng thuyết trình</Text>
            <Text style={styles.smallPointt}>{evaluate?.answer9?.point}</Text>
          </View>
        </View>
        <View style={[styles.itemWrapper, {width: '95%'}]}>
          {(evaluate?.answer10?.point as number) >= 5 ? (
            <Checked style={styles.icon} />
          ) : (
            <Cancel style={styles.icon} />
          )}
          <View style={styles.textWrapper}>
            <Text style={styles.itemTitle}>Kinh nghiệm làm việc</Text>
            <Text style={styles.smallPointt}>{evaluate?.answer10?.point}</Text>
          </View>
        </View>
      </View>
    </ScrollableTabLayout>
  );
};

const styles = StyleSheet.create({
  container: {},

  title: {
    color: colors.BLACK,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    marginBottom: responsive(10),
  },

  subTitle: {
    color: colors.BLACK,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    marginBottom: responsive(10),
  },

  largePoint: {
    color: colors.PRIMARY,
    fontSize: 16,
    fontWeight: '700',
  },

  smallPointt: {
    color: colors.PRIMARY,
    fontSize: 14,
    fontWeight: '600',
  },

  itemWrapper: {
    marginTop: responsive(25),
    flexDirection: 'row',
  },

  itemTitle: {
    color: colors.BLACK,
    fontSize: 15,
    fontWeight: '600',
  },

  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },

  itemContent: {
    borderWidth: 0.5,
    borderColor: colors.BODY,
    color: colors.BLACK,
    fontSize: 14,
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(15),
    marginTop: responsive(10),
    maxWidth: '100%',
    height: responsive(50),
    maxHeight: responsive(70),
  },

  icon: {
    marginRight: responsive(10),
  },

  image: {
    width: responsive(50),
    height: responsive(50),
    marginHorizontal: 'auto',
    borderRadius: 8,
  },

  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsive(10),
    borderRadius: responsive(8),
  },
});

export default EvaluatedBoard;
