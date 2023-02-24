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

import {
  useCreateRecord,
  useUpdateRecord,
  WorkExperienceType,
  WorkExperienceTypeInput,
} from '@apiCaller';
import {fragmentUpdateRecord} from '@services/record';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {useToast} from '@hooks/useToast';
import {setActionSuccess} from '@redux/slices/common';

import {Formik} from 'formik';
import * as yup from 'yup';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {formatDate} from '@common/functions';
import ButtonSubmit from '@components/ButtonSubmit';
import {Box} from 'native-base';

interface IProps {
  buttonMenu: JSX.Element;
  editField?: WorkExperienceType;
}

interface IFormValue {
  jobTitle: string;
  description: string;
  companyName: string;
  timeStart: string;
  timeEnd: string;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  description: yup.string().required('Vui lòng nhập mô tả quá trình làm việc'),
  jobTitle: yup.string().required('Vui lòng nhập chức danh của bạn'),
  companyName: yup.string().required('Vui lòng nhập tên công ty bạn đã làm'),
  timeStart: yup.string().required('Vui lòng chọn ngày bắt đầu làm việc'),
  timeEnd: yup.string().required('Vui lòng nhập ngày kết thúc làm việc'),
});

const DialogComponent: React.FC<IProps> = ({buttonMenu, editField = null}) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const {record} = useAppSelector(state => state.profile);
  const {userInfor} = useAppSelector(state => state.auth);

  const {showToast} = useToast();
  const [heightButton, setHeightButton] = useState(0);
  const [initialValues, setInitialValues] = useState<IFormValue>({
    description: '',
    jobTitle: '',
    companyName: '',
    timeStart: '',
    timeEnd: '',
  });

  const [createRecord, {data: dataCreate, loading: loadingCreate}] =
    useCreateRecord(fragmentUpdateRecord);
  const [updateRecord, {data: dataUpdate, loading: loadingUpdate}] =
    useUpdateRecord(fragmentUpdateRecord);

  useEffect(() => {
    if (editField) {
      setInitialValues({
        companyName: editField?.companyName || '',
        description: editField?.description || '',
        jobTitle: editField?.jobName || '',
        timeEnd: editField?.timeEnd
          ? formatDate(new Date(editField?.timeEnd))
          : '',
        timeStart: editField?.timeStart
          ? formatDate(new Date(editField?.timeStart))
          : '',
      });
    }
  }, [editField]);

  const onHandleSubmit = (values: IFormValue) => {
    if (!editField) {
      let workExperienceInput: WorkExperienceTypeInput[] = [];
      if (
        record &&
        record?.workExperience &&
        record?.workExperience.length > 0
      ) {
        workExperienceInput = record.workExperience.map(experience => {
          return {
            companyName: experience?.companyName || '',
            description: experience?.description || '',
            jobName: experience?.jobName || '',
            timeEnd: experience?.timeEnd || '',
            timeStart: experience?.timeStart || '',
          };
        });

        workExperienceInput.push({
          companyName: values.companyName,
          description: values.description,
          jobName: values.jobTitle,
          timeStart: values.timeStart,
          timeEnd: values.timeEnd,
        });
        updateRecord({
          variables: {
            id: record?._id || '',
            recordUpdateInput: {
              workExperience: workExperienceInput,
            },
          },
        });
      } else {
        createRecord({
          variables: {
            recordCreateInput: {
              user: userInfor?.userId?.id || '',
              workExperience: [
                {
                  companyName: values.companyName,
                  description: values.description,
                  jobName: values.jobTitle,
                  timeStart: values.timeStart,
                  timeEnd: values.timeEnd,
                },
              ],
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
      let workExperienceInput: WorkExperienceTypeInput[] =
        record.workExperience.map(experience => {
          return {
            companyName: experience?.companyName || '',
            description: experience?.description || '',
            jobName: experience?.jobName || '',
            timeEnd: experience?.timeEnd || '',
            timeStart: experience?.timeStart || '',
          };
        });
      workExperienceInput[index] = {
        companyName: values.companyName,
        description: values.description,
        jobName: values.jobTitle,
        timeStart: values.timeStart,
        timeEnd: values.timeEnd,
      };
      updateRecord({
        variables: {
          id: record?._id || '',
          recordUpdateInput: {
            workExperience: workExperienceInput,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (dataUpdate?.updateRecord) {
      showToast('success', 'Cập nhật hồ sơ thành công!');
      onHandleClose();
      dispatch(setActionSuccess());
    }
  }, [dataUpdate]);

  useEffect(() => {
    if (dataCreate?.createRecord) {
      showToast('success', 'Tạo hồ sơ thành công!');
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
                editField ? 'Chỉnh sửa kinh nghiệm' : 'Thêm kinh nghiệm'
              }`}</Text>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    marginTop: responsive(30),
                    paddingBottom: responsive(heightButton + 20),
                  }}>
                  <View>
                    <Input
                      name="jobTitle"
                      label="Chức danh"
                      placeholder="Nhập chức danh"
                      require
                    />
                  </View>

                  <View style={styles.fieldMargin}>
                    <Input
                      name="companyName"
                      label="Công ty"
                      placeholder="Nhập tên công ty"
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
                        label="Từ ngày"
                        placeholder="Ngày bắt đầu"
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
                        label="Đến ngày"
                        placeholder="Ngày kết thúc"
                        require
                      />
                    </View>
                  </View>
                  <View style={styles.fieldMargin}>
                    <Input
                      name="description"
                      label="Mô tả quá trình làm việc"
                      placeholder="Mô tả sơ về quá trình làm việc"
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
