import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Dialog from '@components/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';

import Input from '@designs/Input';
import DatePicker from '@designs/DatePicker';
import Select from '@designs/Select';

import {responsive, typos, colors} from '@common/styles';
import Button from '@designs/Button';

import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  DistrictType,
  ProvinceType,
  useUpdateUserProfile,
  WardType,
  GenderType,
} from '@apiCaller';
import {fragmentUpdateUserProfile} from '@services/user';

import {setActionSuccess} from '@redux/slices/common';
import {useToast} from '@hooks/useToast';
import {formatDate} from '@common/functions';

import {useGetAllProvince} from '@hooks/useGetAllProvince';
import {useDistrictByProvince} from '@hooks/useDistrictsByProvince';
import {useWardByDistrict} from '@hooks/useWardByDistrict';
import ButtonSubmit from '@components/ButtonSubmit';
import {Box} from 'native-base';

interface IProps {
  open: boolean;
  onClose: () => void;
}

interface IFormValue {
  email: string;
  phoneNumber: string;
  idCar: string;
  birthday: string;
  gender: string;
  province: string;
  district: string;
  ward: string;
  address: string;
}
interface Option {
  _id: GenderType;
  name: string;
}

const validationSchema = yup.object().shape<{[k in keyof IFormValue]: any}>({
  email: yup.string().required('Vui lòng nhập email của bạn'),
  phoneNumber: yup.string().required('Vui lòng nhập số điện thoại của bạn '),
  idCar: yup
    .string()
    .min(9, 'Số chứng minh nhân dân là 9 số hoặc 11 số')
    .max(11, 'Số chứng minh nhân dân là 9 số hoặc 11 số'),
  birthday: yup.string().required('Vui lòng chọn ngày sinh của bạn'),
  gender: yup.string().required('Vui lòng chọn giới tính của bạn'),
  district: yup.string().required('Vui lòng chọn quận/huyện của bạn'),
  province: yup.string().required('Vui lòng chọn tỉnh/thành phố của bạn'),
  ward: yup.string().required('Vui lòng chọn phường/xã của bạn'),
  address: yup.string(),
});

const listGender: Option[] = [
  {
    _id: GenderType.Male,
    name: 'Nam',
  },
  {
    _id: GenderType.Female,
    name: 'Nữ',
  },
];
const DialogEdit: React.FC<IProps> = ({onClose, open}) => {
  const {currentUser} = useAppSelector(state => state.profile);
  const {showToast} = useToast();
  const dispatch = useAppDispatch();
  const [updateUserProfile, {data, loading, error, called}] =
    useUpdateUserProfile(fragmentUpdateUserProfile);
  const [heightButton, setHeightButton] = useState(0);
  const {provinces} = useGetAllProvince();
  const {districts, invokedAllDistrictByProvince} = useDistrictByProvince();
  const {wards, invokedAllWardByDistrict} = useWardByDistrict();

  const {
    email,
    phoneNumber,
    province,
    district,
    ward,
    gender,
    identityCard,
    birthday,
    street,
  } = currentUser || {};
  const [initialValues, setInitialValues] = useState<IFormValue>({
    email: '',
    phoneNumber: '',
    idCar: '',
    birthday: '',
    gender: '',
    province: '',
    district: '',
    ward: '',
    address: '',
  });

  const [provinceSelected, setProvinceSelected] = useState<ProvinceType | null>(
    null,
  );
  const [districtSelected, setDistrictSelected] = useState<DistrictType | null>(
    null,
  );
  const [wardSelected, setWardSelected] = useState<WardType | null>(null);

  const [genderSelected, setGenderSelected] = useState<Option | null>(null);

  const onHandleSubmit = (values: IFormValue) => {
    updateUserProfile({
      variables: {
        updateUserInput: {
          birthday: values.birthday,
          email: values.email,
          gender: genderSelected?._id || GenderType.Male,
          identityCard: values.idCar,
          phoneNumber: values.phoneNumber,
          locationTypeInput: {
            districtCode: districtSelected?.code || '0',
            provinceCode: provinceSelected?.code || '0',
            wardCode: wardSelected?.code || '0',
            streetName: values.address,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (currentUser) {
      setInitialValues({
        email: email || '',
        phoneNumber: phoneNumber || '',
        idCar: identityCard || '',
        birthday: birthday ? formatDate(new Date(birthday)) : '',
        gender: gender || '',
        province: province?._id || '',
        district: district?._id || '',
        ward: ward?._id || '',
        address: street?.name || '',
      });
      setProvinceSelected(currentUser?.province || null);
      setDistrictSelected(currentUser?.district || null);
      setWardSelected(currentUser?.ward || null);

      const genderTemp = listGender.find(value => value._id === gender);
      setGenderSelected(genderTemp || null);
    }
  }, [currentUser]);

  useEffect(() => {
    if (data?.updateUserProfile) {
      dispatch(setActionSuccess());
      showToast('success', 'Cập nhật hồ sơ thành công!');
      setGenderSelected(null);
      setProvinceSelected(null);
      setDistrictSelected(null);
      setWardSelected(null);
      onClose();
    }
  }, [data]);

  useEffect(() => {
    provinceSelected &&
      invokedAllDistrictByProvince(provinceSelected?.code || '');
  }, [provinceSelected]);
  useEffect(() => {
    districtSelected && invokedAllWardByDistrict(districtSelected?.code || '');
  }, [provinceSelected]);
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
            <Text style={styles.title}>Chỉnh sửa thông tin cá nhân</Text>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  marginTop: responsive(30),
                  paddingBottom: responsive(heightButton + 20),
                }}>
                <View>
                  <View>
                    <Input
                      name="email"
                      label="Email"
                      placeholder="Nhập email của bạn"
                      require
                      editable={false}
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Input
                      name="phoneNumber"
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại"
                      require
                      editable={false}
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Input
                      name="idCar"
                      label="CMND"
                      placeholder="Nhập số CMND"
                      type="number"
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <DatePicker
                      name="birthday"
                      label="Ngày sinh"
                      placeholder="Chọn ngày sinh"
                      require
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Select
                      name="gender"
                      label="Giới tính"
                      placeholder="Chọn giới tính "
                      require
                      optionSelected={genderSelected}
                      options={listGender}
                      onSelect={value => {
                        setGenderSelected(value);
                      }}
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Select
                      name="province"
                      label="Tỉnh / Thành phố"
                      placeholder="Chọn tỉnh/thành phố "
                      require
                      optionSelected={provinceSelected}
                      options={provinces}
                      onSelect={value => {
                        setProvinceSelected(value);
                      }}
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Select
                      name="district"
                      label="Quận / huyện"
                      placeholder="Chọn quận/huyện "
                      require
                      optionSelected={districtSelected}
                      options={districts}
                      onSelect={value => setDistrictSelected(value)}
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Select
                      name="ward"
                      label="Phường / xã"
                      placeholder="Chọn phường/xã"
                      require
                      optionSelected={wardSelected}
                      options={wards}
                      onSelect={value => setWardSelected(value)}
                    />
                  </View>
                  <View style={styles.fieldMargin}>
                    <Input
                      name="address"
                      label="Địa chỉ ci tiết"
                      placeholder="Nhập địa chỉ chi tiết"
                      require
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
