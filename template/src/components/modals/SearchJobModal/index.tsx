import React, {useState, useEffect} from 'react';
import {Modal, Text, StyleSheet, ScrollView} from 'react-native';
import {Box, View} from 'native-base';
import {colors, responsive} from '@common/styles';
import SimpleMultiSelect from '@designs/SimpleMultiSelect';
import MultiTagSelector from '@designs/MultiTagSelector';
import Button from '@designs/Button';

//hooks
import {useGetAllProvince} from '@hooks/useGetAllProvince';
import {useGetAllJobType} from '@hooks/useGetAllJobTypes';
import {useGetAllJobLevel} from '@hooks/useGetAllJobLevels';
import {useGetAllCareers} from '@hooks/useGetAllCareers';

//redux
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {
  setListCareerSelected,
  setListJobLevelSelected,
  setListJobTypeSelected,
  setListProvinceSelected,
} from '@redux/slices/job';

//api
import {CategoryLevel2, JobLevel, JobType, ProvinceType} from '@apiCaller';
import {IRootState} from '@redux';

interface ISearchJobModal {
  isOpen: boolean;
  onClose: () => void;
}

const SearchJobModal: React.FC<ISearchJobModal> = ({isOpen, onClose}) => {
  const {
    listCareerSelected,
    listJobLevelSelected,
    listJobTypeSelected,
    listProvinceSelected,
  } = useAppSelector((state: IRootState) => state.job);
  const dispatch = useAppDispatch();
  const {provinces: listProvince} = useGetAllProvince();
  const [provincesSelected, setProvincesSelected] =
    useState<ProvinceType[]>(listProvinceSelected);
  const {jobTypes: listJobType} = useGetAllJobType();
  const [jobTypesSelected, setJobTypesSelected] =
    useState<JobType[]>(listJobTypeSelected);
  const {jobLevels: listJobLevel} = useGetAllJobLevel();
  const [jobLevelsSelected, setJobLevelsSelected] =
    useState<JobLevel[]>(listJobLevelSelected);
  const {careers: listCareer} = useGetAllCareers();
  const [careersSelected, setCareersSelected] =
    useState<CategoryLevel2[]>(listCareerSelected);
  const [applySuccess, setApplySuccess] = useState<boolean>(false);

  const invokeSetSlugToRedux = () => {
    dispatch(setListCareerSelected(careersSelected));
    dispatch(setListJobLevelSelected(jobLevelsSelected));
    dispatch(setListProvinceSelected(provincesSelected as ProvinceType[]));
    dispatch(setListJobTypeSelected(jobTypesSelected as JobType[]));
    setApplySuccess(true);
  };

  const invokeUnSetSlugToRedux = () => {
    setCareersSelected([]);
    setJobLevelsSelected([]);
    setJobTypesSelected([]);
    setProvincesSelected([]);
    dispatch(setListCareerSelected([]));
    dispatch(setListJobLevelSelected([]));
    dispatch(setListProvinceSelected([]));
    dispatch(setListJobTypeSelected([]));
    setApplySuccess(false);
  };

  useEffect(() => {
    listProvinceSelected && setProvincesSelected(listProvinceSelected);
    listCareerSelected && setCareersSelected(listCareerSelected);
    listJobLevelSelected && setJobLevelsSelected(listJobLevelSelected);
    listJobTypeSelected && setJobTypesSelected(listJobTypeSelected);
  }, [
    listCareerSelected,
    listProvinceSelected,
    listJobLevelSelected,
    listJobTypeSelected,
  ]);

  return (
    <Modal visible={isOpen} onRequestClose={onClose} style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.headingWrapper}>
          <View style={styles.span}></View>
          <Text style={styles.heading}>Bộ lọc</Text>
        </View>

        <View style={styles.bodyItem}>
          <SimpleMultiSelect
            label="Tỉnh/thành phố"
            placeHolder="Chọn tỉnh/thành phố"
            options={listProvince}
            optionSelected={provincesSelected as ProvinceType[]}
            onSelect={provinces => {
              setProvincesSelected(provinces);
              setApplySuccess(false);
            }}
          />
        </View>

        <View style={styles.bodyItem}>
          <SimpleMultiSelect
            label="Ngành nghề"
            placeHolder="Chọn ngành nghề"
            options={listCareer}
            optionSelected={careersSelected as CategoryLevel2[]}
            onSelect={careers => {
              setCareersSelected(careers);
              setApplySuccess(false);
            }}
          />
        </View>

        <View style={styles.bodyItem}>
          <MultiTagSelector
            name=""
            label="Cấp bậc"
            options={listJobLevel}
            optionSelected={jobLevelsSelected as JobLevel[]}
            onSelect={jobLevels => {
              setJobLevelsSelected(jobLevels);
              setApplySuccess(false);
            }}
          />
        </View>

        <View style={styles.bodyItem}>
          <MultiTagSelector
            name=""
            label="Loại công việc"
            options={listJobType}
            optionSelected={jobTypesSelected as JobType[]}
            onSelect={jobTypes => {
              setJobTypesSelected(jobTypes);
              setApplySuccess(false);
            }}
          />
        </View>
      </ScrollView>

      <Box
        safeAreaBottom
        style={{
          marginTop: 'auto',
          height: '17%',
          padding: responsive(20),
          backgroundColor: colors.WHITE,
          shadowOpacity: 0.8,
          shadowColor: colors.GRAY,
          justifyContent: 'space-between',
        }}>
        <Button
          title={applySuccess ? 'Đã áp dụng' : 'Áp dụng'}
          onPress={() => {
            invokeSetSlugToRedux();
            onClose();
          }}
          disabled={applySuccess}
        />
        <Button
          title="Hủy"
          type="outline"
          onPress={() => {
            invokeUnSetSlugToRedux();
            onClose();
          }}
        />
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
  headingWrapper: {
    height: responsive(50),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsive(20),
  },
  span: {
    height: responsive(4),
    width: responsive(80),
    backgroundColor: colors.LINE,
    borderRadius: 8,
    marginVertical: 'auto',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },
  bodyItem: {
    marginTop: responsive(35),
  },
});

export default SearchJobModal;
