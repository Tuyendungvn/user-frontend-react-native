import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@components/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';

import Input from '@designs/Input';
import {responsive, typos, colors} from '@common/styles';
import Button from '@designs/Button';

import {useAppDispatch, useAppSelector} from '@hooks/useRedux';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {CategoryLevel2, useUpdateUserProfile} from '@apiCaller';
import {fragmentUpdateUserProfile} from '@services/user';
import {setActionSuccess} from '@redux/slices/common';
import {useToast} from '@hooks/useToast';
import ButtonSubmit from '@components/ButtonSubmit';
import MultiSelect from '@designs/MultiSelect';
import {useGetAllCareers} from '@hooks/useGetAllCareers';
import {Box} from 'native-base';

interface IProps {
  open: boolean;
  onClose: () => void;
}

interface IFormValue {
  displayName: string;
  career?: string[];
  code: string;
  position: string;
  history: string;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  code: yup.string().required('Vui lòng nhập mã số '),
  displayName: yup.string().required('Vui lòng nhập họ và tên'),
  history: yup.string(),
  position: yup.string().required('Vui lòng nhập vị trí ứng tuyển'),
});

const DialogEdit: React.FC<IProps> = ({onClose, open}) => {
  const {currentUser} = useAppSelector(state => state.profile);
  const {showToast} = useToast();
  const [careerSelected, setCareerSelected] = useState<CategoryLevel2[]>([]);
  const dispatch = useAppDispatch();
  const [updateUserProfile, {data, loading}] = useUpdateUserProfile(
    fragmentUpdateUserProfile,
  );
  const {careers: listCareer} = useGetAllCareers();
  const [heightButton, setHeightButton] = useState(0);
  const {displayName, code, title, history, career} = currentUser || {};
  const [initialValues, setInitialValues] = useState<IFormValue>({
    code: '',
    displayName: '',
    history: '',
    position: '',
  });

  const onHandleSubmit = (values: IFormValue) => {
    updateUserProfile({
      variables: {
        updateUserInput: {
          displayName: values.displayName,
          history: values.history,
          title: values.position,
          career: careerSelected.map(item => item?._id || '') as string[],
        },
      },
    });
  };

  useEffect(() => {
    if (currentUser) {
      setCareerSelected(career || []);
      setInitialValues({
        code: code || '',
        displayName: displayName || '',
        history: history || '',
        position: title || '',
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (data?.updateUserProfile) {
      dispatch(setActionSuccess());
      showToast('success', 'Cập nhật hồ sơ thành công!');
      onClose();
    }
  }, [data]);

  return (
    <Dialog
      onClose={() => {
        onClose();
      }}
      open={open}>
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
            <Text style={styles.title}>Chỉnh sửa thông tin chung</Text>
            <KeyboardAwareScrollView>
              <View
                style={{
                  marginTop: responsive(30),
                  paddingBottom: responsive(heightButton + 20),
                }}>
                <View>
                  <View>
                    <Input
                      name="displayName"
                      label="Họ và tên"
                      placeholder="Nhập số họ và tên của bạn"
                      require
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Input
                      name="code"
                      label="Mã số ứng tuyển"
                      placeholder="Nhập mã số ứng tuyển"
                      require
                      editable={false}
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Input
                      name="position"
                      label="Vị trí ứng tuyển"
                      placeholder="Nhập chức danh"
                      require
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <MultiSelect
                      name="careers"
                      label="Ngành nghề mong muốn"
                      placeholder="Chọn ngành nghề mong muốn"
                      options={listCareer}
                      optionSelected={careerSelected}
                      onSelect={value => setCareerSelected(value)}
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Input
                      name="history"
                      label="Tiểu sử"
                      placeholder="Nhập tiểu sử của bạn"
                      type="textarea"
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
