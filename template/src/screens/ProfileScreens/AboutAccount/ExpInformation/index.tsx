import {ScrollView, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {colors, responsive, typos} from '@common/styles';
import {Edit} from '@assets/svg';
import {genSVGProps} from '@common/utils/base';
import {useAppSelector} from '@hooks/useRedux';
import ButtonAdd from '@components/ButtonAdd';

import {WorkExperienceType} from '@apiCaller';
import {formatDate} from '@common/functions';

import Dialog from './Dialog';

interface IProps {}
export const ExpInformation: React.FC<IProps> = () => {
  const {record} = useAppSelector(state => state.profile);
  const {workExperience} = record || {};
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <View style={styles.sectionWrapper}>
          <Text style={{...typos.lg.bold}}>Kinh nghiệm làm việc</Text>
        </View>

        {workExperience &&
          workExperience.length > 0 &&
          workExperience.map((item, index) => {
            const color =
              (index + 2) % 2
                ? 'rgba(246,182,0 ,0.16)'
                : 'rgba(234,78,27,0.06)';

            return (
              <Card
                data={item}
                key={index}
                style={{
                  backgroundColor: color,
                  borderColor: color,
                }}
              />
            );
          })}
        <Dialog buttonMenu={<ButtonAdd title="Thêm kinh nghiệm làm việc" />} />
      </View>
    </ScrollView>
  );
};

const Card: React.FC<{
  data: WorkExperienceType;
  style?: ViewStyle;
}> = ({data, style}) => {
  const {companyName, description, experience, jobName, timeEnd, timeStart} =
    data;

  return (
    <View style={[styles.cardContainer, style]}>
      <View style={styles.cardHeading}>
        <Text style={styles.cardTitleHeading}>{jobName}</Text>
        <Dialog
          editField={data}
          buttonMenu={<Edit {...genSVGProps(responsive(14), responsive(14))} />}
        />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardContentText}>{companyName}</Text>
        <Text style={styles.cardContentText}>
          {`${timeStart && formatDate(new Date(timeStart))} -  ${
            timeEnd && formatDate(new Date(timeEnd))
          } ${` - ${experience} năm`}`}
        </Text>
        <Text style={styles.cardContentText}>{description}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    padding: responsive(20),
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  sectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsive(20),
    alignItems: 'center',
  },
  cardContainer: {
    padding: responsive(20),
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: responsive(4),
    marginBottom: responsive(16),
  },
  cardHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleHeading: {
    ...typos.lg.bold,
  },
  cardContent: {
    marginTop: responsive(10),
  },
  cardContentText: {
    ...typos.sm.normal,
  },
});

export default ExpInformation;
