import {useGetWardsByDistrict, WardType} from '@apiCaller';
import {fragmentGetWardByDistrict} from '@services/location';
import {useEffect, useState} from 'react';

export const useWardByDistrict = () => {
  const [wards, setWards] = useState<WardType[]>([]);
  const [getWardByDistrict, {data}] = useGetWardsByDistrict(
    fragmentGetWardByDistrict,
  );

  const invokedAllWardByDistrict = (districtCode: string) => {
    getWardByDistrict({
      variables: {
        page: 0,
        districtCode,
      },
    });
  };
  useEffect(() => {
    if (data?.getWardsByDistrict) {
      setWards(data?.getWardsByDistrict.wards || []);
    }
  }, [data]);
  return {
    invokedAllWardByDistrict,
    wards,
  };
};
