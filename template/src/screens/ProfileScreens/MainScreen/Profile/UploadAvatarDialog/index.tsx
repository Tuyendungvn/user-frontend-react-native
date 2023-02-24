import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Dialog from '@components/Dialog';

import {responsive, typos, colors} from '@common/styles';
import Button from '@designs/Button';

import SingleUploadFile from '@components/SingleUploadFile';
import {DocumentPickerResponse} from 'react-native-document-picker';

import {useUpdateUserProfile} from '@apiCaller';
import {fragmentUpdateUserProfile} from '@services/user';
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {useToast} from '@hooks/useToast';

//redux
import {setReloadProfile} from '@redux/slices/profile';
import {setReloadHomeScreen} from '@redux/slices/auth';

import {ReactNativeFile} from 'apollo-upload-client';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const UploadAvatarDialog: React.FC<IProps> = ({onClose, open}) => {
  //redux
  const dispatch = useAppDispatch();
  const {userInfor} = useAppSelector(state => state.auth);

  //local state
  const {showToast} = useToast();
  const [heightButton, setHeightButton] = useState(0);
  const [imageSelected, setImageSelected] =
    useState<DocumentPickerResponse | null>(null);

  //api
  const [updateProfile, {data, loading}] = useUpdateUserProfile(
    fragmentUpdateUserProfile,
  );

  const onHandleSubmit = () => {
    const urlAvt = new ReactNativeFile({
      uri: imageSelected?.uri,
      type: imageSelected?.type,
      name: imageSelected?.name,
    });
    updateProfile({
      variables: {
        updateUserInput: {
          username: userInfor?.userInfo?.username || '',
          urlAvt: urlAvt,
        },
      },
    });
  };

  const onHandleClose = () => {
    setImageSelected(null);
    onClose();
  };

  useEffect(() => {
    if (data?.updateUserProfile) {
      dispatch(setReloadProfile());
      dispatch(setReloadHomeScreen());
      showToast('success', 'Cập nhật hồ sơ thành công');
      onHandleClose();
    }
  }, [data]);

  return (
    <Dialog
      onClose={() => {
        onHandleClose();
      }}
      open={open}>
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.title}>Tải lên ảnh của bạn</Text>
        <View>
          <View
            style={{
              marginTop: responsive(30),
              paddingBottom: responsive(heightButton + 20),
            }}>
            <View>
              <SingleUploadFile
                title="Chọn ảnh từ máy"
                description="Bạn có thể thêm tập tin có dạng .png hoặc .jpg và dung lượng phải nhỏ hơn 3MB."
                type={['image/*']}
                file={imageSelected}
                onChange={doc => setImageSelected(doc)}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
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
          loading={loading}
        />
      </View>
    </Dialog>
  );
};

export default UploadAvatarDialog;

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
