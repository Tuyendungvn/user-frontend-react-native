import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Icon } from 'native-base';
import { formatDate } from '@common/functions';
import { colors, responsive } from '@common/styles';
import ScrollableTabLayout from '@layouts/ScrollableTabLayout';

//redux
import { useAppSelector } from '@hooks/useRedux';
import { IRootState } from '@redux';

//icons
import {
  JobRecruitDay,
  JobCategory,
  JobRecruitLevel,
  JobSalary,
  JobWorkLocation,
} from '@assets/svg';
import { StyleSheet } from 'react-native';

interface IGeneralInformationProps {}
interface IGeneralInfo {
  id: string;
  title: string;
  subTitle: string;
  icon: typeof JobRecruitDay;
  backgroundIcon: string;
}

const GeneralInformation: React.FC<IGeneralInformationProps> = () => {
  const { currentJob } = useAppSelector((state: IRootState) => state.job);
  const [listGeneralInfo, setListGeneralInfo] = useState<IGeneralInfo[]>([]);
  useEffect(() => {
    currentJob &&
      setListGeneralInfo([
        {
          id: '0',
          title: 'Ngày đăng tuyển',
          subTitle: formatDate(currentJob?.createdAt?.toString()) || 'Không rõ',
          icon: JobRecruitDay,
          backgroundIcon: colors.SECONDARY,
        },
        {
          id: '1',
          title: 'Cấp bậc',
          subTitle: currentJob?.level?.name || 'Không rõ',
          icon: JobRecruitLevel,
          backgroundIcon: colors.SECONDARY,
        },
        {
          id: '2',
          title: 'Ngành nghề',
          subTitle: currentJob?.name || 'Không rõ',
          icon: JobCategory,
          backgroundIcon: colors.ERROR,
        },
        {
          id: '3',
          title: 'Mức lương',
          subTitle: currentJob?.dealSalary
            ? 'Thỏa thuận'
            : `$ ${currentJob?.salaryMin} triệu - $ ${currentJob?.salaryMax} triệu`,
          icon: JobSalary,
          backgroundIcon: colors.BODY,
        },
        {
          id: '4',
          title: 'Địa điểm làm việc',
          subTitle:
            (`${currentJob?.location?.map(item => item.location)}` as string) ||
            'Không rõ',
          icon: JobWorkLocation,
          backgroundIcon: colors.SUCCESS,
        },
      ]);
  }, [currentJob]);

  return (
    <ScrollableTabLayout>
      {listGeneralInfo.map(info => (
        <View style={styles.infoItemContainer} key={info.id}>
          <Icon
            as={info.icon}
            height={responsive(40)}
            width={responsive(40)}
            marginRight={responsive(15)}
          />

          <View>
            <Text style={styles.title}>{info.title}</Text>
            <Text style={styles.subTitle}>{info.subTitle}</Text>
          </View>
        </View>
      ))}
    </ScrollableTabLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsive(400),
    backgroundColor: colors.WHITE,
  },
  scrollViewContainer: {
    justifyContent: 'center',
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(40),
    maxHeight: responsive(600),
  },
  infoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: responsive(80),
    width: responsive(330),
  },
  icon: {
    height: responsive(40),
    width: responsive(40),
    marginRight: responsive(15),
  },

  title: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
  },

  subTitle: {
    color: colors.BODY,
    maxHeight: responsive(50),
    maxWidth: responsive(280),
    fontSize: 13,
  },
});

export default GeneralInformation;
