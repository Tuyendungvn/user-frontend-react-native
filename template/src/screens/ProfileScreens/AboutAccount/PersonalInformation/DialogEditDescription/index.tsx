import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Dialog from '@components/Dialog';

import {responsive, typos, colors} from '@common/styles';
import Button from '@designs/Button';
import Input from '@designs/Input';

import {useCreateRecord, useUpdateRecord} from '@apiCaller';
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
  open: boolean;
  onClose: () => void;
}

interface IFormValue {
  description: string;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  description: yup.string(),
});

const DialogEdit: React.FC<IProps> = ({onClose, open}) => {
  const dispatch = useAppDispatch();
  const {record} = useAppSelector(state => state.profile);
  const {userInfor} = useAppSelector(state => state.auth);

  const {showToast} = useToast();
  const [heightButton, setHeightButton] = useState(0);
  const [initialValues, setInitialValues] = useState<IFormValue>({
    description: '',
  });

  const [createRecord, {data: dataCreate, loading: loadingCreate}] =
    useCreateRecord(fragmentUpdateRecord);
  const [updateRecord, {data: dataUpdate, loading: loadingUpdate, error}] =
    useUpdateRecord(fragmentUpdateRecord);

  useEffect(() => {
    if (record) {
      setInitialValues({
        description: record?.description || '',
      });
    }
  }, [record]);
  const onHandleSubmit = (values: IFormValue) => {
    if (!record) {
      createRecord({
        variables: {
          recordCreateInput: {
            description: values.description,
            user: userInfor?.userId?.id || '',
          },
        },
      });
      return;
    }
    updateRecord({
      variables: {
        id: record?._id || '',
        recordUpdateInput: {
          description: values.description,
        },
      },
    });
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
    onClose();
  };

  return (
    <Dialog
      onClose={() => {
        onHandleClose();
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
            <Text style={styles.title}>Tải lên hồ sơ</Text>
            <KeyboardAwareScrollView showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  marginTop: responsive(30),
                  paddingBottom: responsive(heightButton + 20),
                }}>
                <View>
                  <Input
                    name="description"
                    label="Mô tả"
                    placeholder="Nhập mô tả về bạn"
                    type="textarea"
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
