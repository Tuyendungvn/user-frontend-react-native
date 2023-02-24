import React, {useEffect, useState} from 'react';
import {Modal, View, Text, StyleSheet, ScrollView} from 'react-native';
import {colors, responsive} from '@common/styles';
import SimpleMultiSelect from '@designs/SimpleMultiSelect';
import Button from '@designs/Button';

//hooks
import {useGetAllProvince} from '@hooks/useGetAllProvince';
import {useGetAllCareers} from '@hooks/useGetAllCareers';

//redux
import {useAppDispatch, useAppSelector} from '@hooks/useRedux';
import {
  setListCareerSelected,
  setListProvinceSelected,
} from '@redux/slices/company';

//api
import {IRootState} from '@redux';
import {CategoryLevel2, ProvinceType} from '@apiCaller';
import {Box} from 'native-base';

interface ISearchCompanyModal {
  isOpen: boolean;
  onClose: () => void;
}

const SearchCompanyModal: React.FC<ISearchCompanyModal> = ({
  isOpen,
  onClose,
}) => {
  //api
  const {listCareerSelected, listProvinceSelected} = useAppSelector(
    (state: IRootState) => state.company,
  );
  const dispatch = useAppDispatch();
  const {provinces: listProvince} = useGetAllProvince();
  const [provincesSelected, setProvincesSelected] =
    useState<ProvinceType[]>(listProvinceSelected);
  const {careers: listCareer} = useGetAllCareers();
  const [careersSelected, setCareersSelected] =
    useState<CategoryLevel2[]>(listCareerSelected);
  const [applySuccess, setApplySuccess] = useState<boolean>(false);

  const invokeSetSlugToRedux = () => {
    dispatch(setListCareerSelected(careersSelected));
    dispatch(setListProvinceSelected(provincesSelected as ProvinceType[]));
    setApplySuccess(true);
  };

  const invokeUnSetSlugToRedux = () => {
    setCareersSelected([]);
    setProvincesSelected([]);
    dispatch(setListCareerSelected([]));
    dispatch(setListProvinceSelected([]));
    setApplySuccess(false);
  };

  useEffect(() => {
    listProvinceSelected && setProvincesSelected(listProvinceSelected);
    listCareerSelected && setCareersSelected(listCareerSelected);
  }, [listCareerSelected, listProvinceSelected]);

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
            optionSelected={provincesSelected}
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
            optionSelected={careersSelected}
            onSelect={careers => {
              setCareersSelected(careers);
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

export default SearchCompanyModal;
