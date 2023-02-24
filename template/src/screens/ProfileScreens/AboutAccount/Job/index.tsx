import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, responsive, typos} from '@common/styles';
import {truncate} from '@common/functions';
import {Edit} from '@assets/svg';
import {genSVGProps} from '@common/utils/base';
import {useAppSelector} from '@hooks/useRedux';
import DialogEdit from './Dialog';

//api
import {JobLevel, useGetJobLevelById} from '@apiCaller';
import {fragmentGetJobLevelById} from '@services/job';

interface IJobProfile {}

export const Job: React.FC<IJobProfile> = () => {
  const {record} = useAppSelector(state => state.profile);
  const [isEdit, setIsEdit] = useState(false);
  const [jobLevel, setJobLevelSelected] = useState<JobLevel | null>(null);
  const [getJobLevelById, {data}] = useGetJobLevelById(fragmentGetJobLevelById);

  useEffect(() => {
    record && getJobLevelById({variables: {id: record?.jobLevelWanted || ''}});
  }, [record]);

  useEffect(() => {
    data && setJobLevelSelected(data.getJobLevelById);
  }, [data]);

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.sectionWrapper}>
          <Text style={{...typos.lg.bold}}>Công việc mong muốn</Text>
          <TouchableOpacity
            onPress={() => {
              setIsEdit(true);
            }}>
            <Edit {...genSVGProps(responsive(14), responsive(14))} />
          </TouchableOpacity>
        </View>
        <View>
          <Section
            title="Nơi làm việc :"
            content={truncate(record?.workPlace?.name, 15) || ''}
          />
          <Section
            title="Ngành nghề :"
            content={
              truncate(`${record?.career?.map(career => career.name)}`, 15) ||
              ''
            }
          />
          <Section
            title="Cấp bậc mong muốn :"
            content={truncate(jobLevel?.name, 15) || ''}
          />
          <Section
            title="Mức lương mong muốn :"
            content={truncate(record?.salaryWanted?.toString(), 15) || ''}
            isBorder={false}
          />

          <Text style={[{...typos.sm.bold}, {marginTop: responsive(10)}]}>
            Phúc lợi mong muốn:
          </Text>

          <View>
            {record?.benefitsWanted?.map(benefit => {
              return (
                <View style={styles.benefitItemWrapper}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        benefit.icon?.default ||
                        'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/Icon_Benefit/326e326f-a59b-49b9-87a6-1e60bb1e18fd-fileName.jpg',
                    }}
                  />
                  <Text>{benefit.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <DialogEdit
        onClose={() => {
          setIsEdit(false);
        }}
        open={isEdit}
      />
    </ScrollView>
  );
};

const Section: React.FC<{
  title: string;
  content: string;
  isBorder?: boolean;
}> = props => {
  const {title, content, isBorder = true} = props;
  return content ? (
    <View
      style={{
        paddingBottom: isBorder ? responsive(4) : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: responsive(8),
        marginBottom: responsive(10),
      }}>
      <Text style={{...typos.sm.bold, marginRight: responsive(10)}}>
        {title}{' '}
      </Text>
      <Text style={{...typos.sm.normal}}>{content} </Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: responsive(20),
    paddingBottom: responsive(30),
    width: '100%',
    height: '100%',
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  container: {
    padding: responsive(15),
    borderRadius: responsive(4),
    marginTop: responsive(20),
    marginBottom: responsive(20),
    borderColor: colors.LINE,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    backgroundColor: colors.WHITE,
  },
  sectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsive(15),
    alignItems: 'center',
  },

  scrollViewContainer: {
    justifyContent: 'center',
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(40),
    maxHeight: responsive(470),
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

export default Job;
