import {useGetProvinces, ProvinceType} from '@apiCaller';
import {fragmentGetAllProvince} from '@services/location';
import {useEffect, useState} from 'react';

export const useGetAllProvince = () => {
  const [provinces, setProvinces] = useState<ProvinceType[]>([]);
  const [getProvinces, {data}] = useGetProvinces(fragmentGetAllProvince);

  useEffect(() => {
    invokedAllProvince();
  }, []);

  const invokedAllProvince = () => {
    getProvinces({});
  };

  useEffect(() => {
    if (data?.getProvinces) {
      setProvinces(data?.getProvinces.provinces || []);
    }
  }, [data]);

  return {
    provinces,
  };
};
