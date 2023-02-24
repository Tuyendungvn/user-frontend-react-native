import {ScrollView, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {colors, responsive, typos} from '@common/styles';
import {Edit} from '@assets/svg';
import {genSVGProps} from '@common/utils/base';
import {useAppSelector} from '@hooks/useRedux';
import ButtonAdd from '@components/ButtonAdd';

import {EducationType} from '@apiCaller';

import Dialog from './Dialog';

interface IProps {}
export const EducationInformation: React.FC<IProps> = () => {
  const {record} = useAppSelector(state => state.profile);
  const {education} = record || {};
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <View style={styles.sectionWrapper}>
          <Text style={{...typos.lg.bold}}>Học vấn</Text>
        </View>

        {education &&
          education.length > 0 &&
          education.map((item, index) => {
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
        <Dialog buttonMenu={<ButtonAdd title="Thêm học vấn" />} />
      </View>
    </ScrollView>
  );
};

const Card: React.FC<{
  data: EducationType;
  style?: ViewStyle;
}> = ({data, style}) => {
  const {schoolName, description, degree, timeEnd, timeStart, major} = data;
  return (
    <View style={[styles.cardContainer, style]}>
      <View style={styles.cardHeading}>
        <Text style={styles.cardTitleHeading}>{`${degree} - ${major}`}</Text>
        <Dialog
          editField={data}
          buttonMenu={<Edit {...genSVGProps(responsive(14), responsive(14))} />}
        />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardContentText}>{schoolName}</Text>
        <Text style={styles.cardContentText}>
          {timeStart &&
            timeEnd &&
            `${timeStart.prettyDate()} -  ${timeEnd.prettyDate()}`}
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

export default EducationInformation;
