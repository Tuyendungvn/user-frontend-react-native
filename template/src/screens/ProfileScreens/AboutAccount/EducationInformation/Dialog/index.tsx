import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Dialog from '@components/Dialog';

import {responsive, typos, colors} from '@common/styles';
import Button from '@designs/Button';
import Input from '@designs/Input';
import DatePicker from '@designs/DatePicker';
import Select from '@designs/Select';

import {
  EducationType,
  EducationTypeInput,
  useCreateRecord,
  useUpdateRecord,
} from '@apiCaller';
import {fragmentUpdateRecord} from '@services/record';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {useToast} from '@hooks/useToast';
import {setActionSuccess} from '@redux/slices/common';

import {Formik} from 'formik';
import * as yup from 'yup';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonSubmit from '@components/ButtonSubmit';
import {Box} from 'native-base';

interface IProps {
  buttonMenu: JSX.Element;
  editField?: EducationType;
}

interface IFormValue {
  schoolName: string;
  degree: string;
  major: string;
  timeStart: string;
  timeEnd: string;
  description: string;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  schoolName: yup.string().required('Vui lòng nhập tên trường bạn học'),
  degree: yup.string().required('Vui lòng chọn bằng cấp của bạn'),
  major: yup.string().required('Vui lòng nhập tên chuyên ngành bạn học'),
  timeStart: yup.string().required('Vui lòng chọn ngày bắt đầu học'),
  timeEnd: yup.string().required('Vui lòng nhập ngày kết thúc học'),
  description: yup
    .string()
    .required('Vui lòng nhập mô tả quá trình học của bạn'),
});

interface IOption {
  _id: string;
  name: string;
}

const degreeList: IOption[] = [
  {
    name: 'Trung học',
    _id: 'HighSchool',
  },
  {
    name: 'Trung cấp',
    _id: 'Intermediate',
  },
  {
    name: 'Cao đẳng',
    _id: 'College',
  },
  {
    name: 'Cử nhân',
    _id: 'Bachelor',
  },
  {
    name: 'Thạc sĩ',
    _id: 'Ph.D',
  },
];

const DialogComponent: React.FC<IProps> = ({buttonMenu, editField = null}) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const {record} = useAppSelector(state => state.profile);
  const {userInfor} = useAppSelector(state => state.auth);

  const {showToast} = useToast();
  const [heightButton, setHeightButton] = useState(0);
  const [degreeSelected, setDegreeSelected] = useState<IOption | null>(null);
  const [initialValues, setInitialValues] = useState<IFormValue>({
    degree: '',
    major: '',
    schoolName: '',
    timeStart: '',
    timeEnd: '',
    description: '',
  });

  const [createRecord, {data: dataCreate, loading: loadingCreate}] =
    useCreateRecord(fragmentUpdateRecord);
  const [updateRecord, {data: dataUpdate, loading: loadingUpdate}] =
    useUpdateRecord(fragmentUpdateRecord);

  useEffect(() => {
    if (editField) {
      setInitialValues({
        degree: editField.degree || '',
        description: editField.description || '',
        major: editField.major || '',
        schoolName: editField.schoolName || '',
        timeEnd: editField.timeEnd || '',
        timeStart: editField.timeStart || '',
      });
    }
  }, [editField]);

  const onHandleSubmit = (values: IFormValue) => {
    if (!editField) {
      let edutcationInput: EducationTypeInput[] = [];
      if (record && record?.education && record?.education.length > 0) {
        edutcationInput = record.education.map(education => {
          const {degree, description, major, schoolName, timeEnd, timeStart} =
            education;
          return {
            degree,
            description,
            major,
            schoolName,
            timeEnd,
            timeStart,
          };
        }) as EducationTypeInput[];
        edutcationInput.push(values);
        updateRecord({
          variables: {
            id: record?._id || '',
            recordUpdateInput: {
              education: edutcationInput,
            },
          },
        });
      } else {
        createRecord({
          variables: {
            recordCreateInput: {
              user: userInfor?.userId?.id || '',
              education: [values],
            },
          },
        });
      }
      return;
    }
    if (record?.workExperience && record?.workExperience?.length > 0) {
      const index = record.workExperience.findIndex(
        experience => JSON.stringify(experience) === JSON.stringify(editField),
      );
      let educationInput: EducationTypeInput[] = record?.education?.map(
        education => {
          const {degree, description, major, schoolName, timeEnd, timeStart} =
            education;
          return {
            degree,
            description,
            major,
            schoolName,
            timeEnd,
            timeStart,
          };
        },
      ) as EducationTypeInput[];
      educationInput[index] = values;
      updateRecord({
        variables: {
          id: record?._id || '',
          recordUpdateInput: {
            workExperience: educationInput,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (dataUpdate?.updateRecord) {
      showToast('success', 'Cập nhật học vấn thành công');
      onHandleClose();
      dispatch(setActionSuccess());
    }
  }, [dataUpdate]);

  useEffect(() => {
    if (dataCreate?.createRecord) {
      showToast('success', 'Tạo học vấn thành công');
      onHandleClose();
      dispatch(setActionSuccess());
    }
  }, [dataCreate]);

  const onHandleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsOpen(true);
        }}>
        {buttonMenu}
      </TouchableOpacity>
      <Dialog
        onClose={() => {
          onHandleClose();
        }}
        open={isOpen}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onHandleSubmit}
          validationSchema={validationSchema}>
          <>
            <Box
              style={styles.wrapper}
              safeArea
              _ios={{paddingX: responsive(20)}}>
              <Text style={styles.title}>{`${
                editField ? 'Chỉnh sửa học vấn' : 'Thêm học vấn'
              }`}</Text>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    marginTop: responsive(30),
                    paddingBottom: responsive(heightButton + 20),
                  }}>
                  <View>
                    <Input
                      name="major"
                      label="Chuyên ngành"
                      placeholder="Nhập tên chuyên ngành"
                      require
                    />
                  </View>

                  <View style={styles.fieldMargin}>
                    <Select
                      name="degree"
                      label="Bằng cấp"
                      placeholder="Chọn bằng cấp"
                      require
                      onSelect={value => setDegreeSelected(value)}
                      optionSelected={degreeSelected}
                      options={degreeList}
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Input
                      name="schoolName"
                      label="Trường học"
                      placeholder="Nhập tên trường học"
                      require
                    />
                  </View>
                  <View
                    style={[
                      styles.fieldMargin,
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <View
                      style={{
                        flex: 1,
                        marginRight: responsive(8),
                      }}>
                      <DatePicker
                        name="timeStart"
                        label="Học từ"
                        placeholder="Ngày bắt đầu học"
                        require
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: responsive(8),
                      }}>
                      <DatePicker
                        name="timeEnd"
                        label="Đến"
                        placeholder="Ngày kết thúc học"
                        require
                      />
                    </View>
                  </View>
                  <View style={styles.fieldMargin}>
                    <Input
                      name="description"
                      label="Mô tả quá trình học"
                      placeholder="Mô tả sơ về quá trình học tập của bạn"
                      type="textarea"
                      require
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </Box>
            <View
              style={styles.buttonContainer}
              onLayout={e => {
                setHeightButton(e.nativeEvent.layout.height);
              }}>
              <Button type="outline" onPress={onHandleClose} title="Quay về" />
              <ButtonSubmit
                title="Lưu"
                stylesCustom={{
                  marginTop: responsive(10),
                }}
                loading={loadingCreate || loadingUpdate}
              />
            </View>
          </>
        </Formik>
      </Dialog>
    </>
  );
};

export default DialogComponent;

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
