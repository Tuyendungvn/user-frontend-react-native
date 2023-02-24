import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {
  Benefit,
  CategoryLevel2,
  JobLevel,
  ProvinceType,
  useUpdateRecord,
} from '@apiCaller';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';

import Dialog from '@components/Dialog';
import Input from '@designs/Input';
import {responsive, typos, colors} from '@common/styles';
import Select from '@designs/Select';
import Button from '@designs/Button';
import ButtonSubmit from '@components/ButtonSubmit';
import MultiSelect from '@designs/MultiSelect';
import MultiTagSelector from '@designs/MultiTagSelector';

import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//hooks
import {useGetAllCareers} from '@hooks/useGetAllCareers';
import {useGetAllProvince} from '@hooks/useGetAllProvince';
import {useGetAllBenefits} from '@hooks/useGetAllBenefits';
import {useGetAllJobLevel} from '@hooks/useGetAllJobLevels';
import {useToast} from '@hooks/useToast';

//redux
import {fragmentUpdateRecord} from '@services/record';
import {setActionSuccess} from '@redux/slices/common';
import {IRootState} from '@redux';

//api
//api
import {useGetJobLevelById} from '@apiCaller';
import {fragmentGetJobLevelById} from '@services/job';
import {Box} from 'native-base';

interface IProps {
  open: boolean;
  onClose: () => void;
}

interface IFormValue {
  workLocation: string;
  salary: string;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  workLocation: yup.string().required('Vui lòng nhập địa điểm làm việc'),
  salary: yup.string().required('Vui lòng chọn mức lương'),
});

const DialogEdit: React.FC<IProps> = ({onClose, open}) => {
  //api
  const [getJobLevel, {data: jobLevelData}] = useGetJobLevelById(
    fragmentGetJobLevelById,
  );

  const {record} = useAppSelector((state: IRootState) => state.profile);
  const {showToast} = useToast();
  const dispatch = useAppDispatch();
  const [updateRecord, {data, loading}] = useUpdateRecord(fragmentUpdateRecord);
  const {careers: listCareer} = useGetAllCareers();
  const [listCareerSelected, setListCareerSelected] = useState<
    CategoryLevel2[]
  >([]);
  const {provinces: listProvinces} = useGetAllProvince();
  const [provinceSelected, setProvinceSelected] = useState<ProvinceType | null>(
    null,
  );
  const {benefits: listBenefit} = useGetAllBenefits();
  const [listBenefitSelected, setListBenefitSelected] = useState<Benefit[]>([]);
  const {jobLevels: listJobLevel} = useGetAllJobLevel();
  const [levelSelected, setLevelSelected] = useState<JobLevel | null>(null);

  //local state
  const [initialValues, setInitialValues] = useState<IFormValue>({
    workLocation: '',
    salary: '',
  });
  const [heightButton, setHeightButton] = useState(0);

  const handleSubmit = (values: IFormValue) => {
    updateRecord({
      variables: {
        id: record?._id || '',
        recordUpdateInput: {
          workPlace: values.workLocation,
          career: listCareerSelected.map(
            career => career._id || '',
          ) as string[],
          salaryWanted: Number.parseInt(values.salary, 10) as number,
          jobLevelWanted: levelSelected?._id || '',
          benefitsWanted: listBenefitSelected.map(
            item => item._id || '',
          ) as string[],
        },
      },
    });
  };

  useEffect(() => {
    if (record) {
      getJobLevel({variables: {id: record.jobLevelWanted || ''}});
      setProvinceSelected(record.workPlace);
      setListBenefitSelected(record.benefitsWanted as Benefit[]);
      setListCareerSelected(record.career as CategoryLevel2[]);
      setLevelSelected({name: record.jobLevelWanted} as JobLevel);
      setInitialValues({
        workLocation: record.workPlace?._id || '',
        salary: record.salaryWanted?.toString() || '',
      });
    }
  }, [record]);

  useEffect(() => {
    if (data?.updateRecord) {
      dispatch(setActionSuccess());
      showToast('success', 'Cập nhật công việc mong muốn thành công!');
      onClose();
    }
  }, [data]);

  useEffect(() => {
    jobLevelData &&
      setLevelSelected({name: jobLevelData.getJobLevelById.name} as JobLevel);
  }, [jobLevelData]);

  return (
    <Dialog
      onClose={() => {
        onClose();
      }}
      open={open}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({errors}) => {
          return (
            <>
              <Box style={styles.wrapper} _ios={{paddingX: responsive(20)}}>
                <Text style={styles.title}>Chỉnh sửa công việc mong muốn</Text>
                <KeyboardAwareScrollView>
                  <View
                    style={{
                      marginTop: responsive(30),
                      paddingBottom: responsive(heightButton + 50),
                    }}>
                    <View>
                      <View>
                        <Select
                          name="workLocation"
                          label="Địa điểm làm việc mong muốn"
                          placeholder="Nhập địa điểm làm việc mong muốn"
                          options={listProvinces}
                          optionSelected={provinceSelected}
                          onSelect={value => setProvinceSelected(value)}
                          require
                        />
                      </View>
                      <View style={styles.fieldMargin}>
                        <MultiSelect
                          name="careers"
                          label="Ngành nghề mong muốn"
                          placeholder="Chọn ngành nghề mong muốn"
                          options={listCareer}
                          optionSelected={listCareerSelected}
                          onSelect={value => setListCareerSelected(value)}
                        />
                      </View>
                      <View style={styles.fieldMargin}>
                        <Select
                          name="level"
                          label="Cấp bậc"
                          keyValue="id"
                          keyLabel="name"
                          placeholder="Chọn cấp bậc mong muốn"
                          options={listJobLevel}
                          optionSelected={levelSelected}
                          onSelect={level => setLevelSelected(level)}
                        />
                      </View>
                      <View
                        style={[
                          styles.fieldMargin,
                          {marginBottom: responsive(20)},
                        ]}>
                        <Input
                          name="salary"
                          type="text"
                          label="Mức lương"
                          placeholder="Nhập mức lương mong muốn"
                        />
                      </View>
                      <View style={styles.fieldMargin}>
                        <MultiTagSelector
                          name="benefits"
                          label="Chọn phúc lợi mong muốn"
                          optionSelected={listBenefitSelected}
                          options={listBenefit}
                          onSelect={value => setListBenefitSelected(value)}
                        />
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              </Box>
              <View
                style={styles.buttonContainer}
                onLayout={e => {
                  setHeightButton(e.nativeEvent.layout.height);
                }}>
                <Button type="outline" onPress={onClose} title="Quay về" />
                <ButtonSubmit
                  title="Lưu"
                  stylesCustom={{
                    marginTop: responsive(10),
                  }}
                  loading={loading}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default DialogEdit;

const styles = StyleSheet.create({
  fieldMargin: {
    marginTop: responsive(16),
  },

  wrapper: {
    padding: responsive(20),
  },
  title: {
    ...typos.xl.bold,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: responsive(20),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: colors.LINE,
  },
});
