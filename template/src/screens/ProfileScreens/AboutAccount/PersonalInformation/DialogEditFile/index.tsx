import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Dialog from '@components/Dialog';

import {responsive, typos, colors} from '@common/styles';
import Button from '@designs/Button';

import SingleUploadFile from '@components/SingleUploadFile';
import {DocumentPickerResponse} from 'react-native-document-picker';

import {useCreateRecord, useUpdateRecord} from '@apiCaller';
import {fragmentUpdateRecord} from '@services/record';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {useToast} from '@hooks/useToast';
import {setActionSuccess} from '@redux/slices/common';

import {ReactNativeFile} from 'apollo-upload-client';
import {Box} from 'native-base';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const DialogEdit: React.FC<IProps> = ({onClose, open}) => {
  const dispatch = useAppDispatch();
  const {record} = useAppSelector(state => state.profile);
  const {userInfor} = useAppSelector(state => state.auth);

  const {showToast} = useToast();
  const [heightButton, setHeightButton] = useState(0);
  const [fileSelected, setFileSelected] =
    useState<DocumentPickerResponse | null>(null);

  const [createRecord, {data: dataCreate, loading: loadingCreate}] =
    useCreateRecord(fragmentUpdateRecord);
  const [updateRecord, {data: dataUpdate, loading: loadingUpdate, error}] =
    useUpdateRecord(fragmentUpdateRecord);

  const onHandleSubmit = () => {
    const urlAvt = new ReactNativeFile({
      uri: fileSelected?.uri,
      type: fileSelected?.type,
      name: fileSelected?.name,
    });
    if (!record) {
      createRecord({
        variables: {
          recordCreateInput: {
            fileNameCV: fileSelected?.name || '',
            urlCV: urlAvt || null,
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
          fileNameCV: fileSelected?.name || '',
          urlCV: urlAvt,
        },
      },
    });
  };

  useEffect(() => {
    if (dataUpdate?.updateRecord) {
      showToast('success', 'Cập nhật hồ sơ thành công');
      onHandleClose();
      dispatch(setActionSuccess());
    }
  }, [dataUpdate]);

  useEffect(() => {
    if (dataCreate?.createRecord) {
      showToast('success', 'Tạo hồ sơ thành công');
      onHandleClose();
      dispatch(setActionSuccess());
    }
  }, [dataCreate]);

  const onHandleClose = () => {
    setFileSelected(null);
    onClose();
  };

  return (
    <Dialog
      onClose={() => {
        onHandleClose();
      }}
      open={open}>
      <Box style={styles.wrapper} safeArea _ios={{paddingX: responsive(20)}}>
        <Text style={styles.title}>Tải lên hồ sơ</Text>
        <View>
          <View
            style={{
              marginTop: responsive(30),
              paddingBottom: responsive(heightButton + 20),
            }}>
            <View>
              <SingleUploadFile
                title="Chọn hồ sơ từ máy bạn"
                description="Bạn có thể thêm tập tin có dạng .doc, .docx hoặc .pdf và dung lượng phải nhỏ hơn 3MB."
                type={[
                  'application/msword',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'application/pdf',
                ]}
                file={fileSelected}
                onChange={doc => setFileSelected(doc)}
              />
            </View>
          </View>
        </View>
      </Box>
      <View
        style={styles.buttonContainer}
        onLayout={e => {
          setHeightButton(e.nativeEvent.layout.height);
        }}>
        <Button type="outline" onPress={onHandleClose} title="Quay về" />
        <Button
          title="Lưu"
          stylesCustom={{
            marginTop: responsive(10),
          }}
          onPress={onHandleSubmit}
          loading={loadingCreate || loadingUpdate}
        />
      </View>
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
