import {useGetDistrictsByProvince, DistrictType} from '@apiCaller';
import {fragmentGetDistrictByProvince} from '@services/location';
import {useEffect, useState} from 'react';

export const useDistrictByProvince = (code?: string) => {
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [getAllDistrictByProvince, {data: dataDistricts}] =
    useGetDistrictsByProvince(fragmentGetDistrictByProvince);
  const invokedAllDistrictByProvince = (provinceCode: string) => {
    getAllDistrictByProvince({
      variables: {
        provinceCode,
      },
    });
  };

  useEffect(() => {
    if (code) {
      invokedAllDistrictByProvince(code);
    }
  }, [code]);
  useEffect(() => {
    if (dataDistricts?.getDistrictsByProvince) {
      setDistricts(dataDistricts?.getDistrictsByProvince.districts || []);
    }
  }, [dataDistricts]);
  return {
    invokedAllDistrictByProvince,
    districts,
  };
};
