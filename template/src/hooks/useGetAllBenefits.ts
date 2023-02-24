import {useEffect, useState} from 'react';
import {fragmentGetAllBenefit} from '@services/job';
import {Benefit, useGetAllBenefit} from '@apiCaller';

export const useGetAllBenefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [getBenefits, {data}] = useGetAllBenefit(fragmentGetAllBenefit);

  useEffect(() => {
    invokeGetAllBenefit();
  }, []);

  const invokeGetAllBenefit = () => {
    getBenefits({});
  };

  useEffect(() => {
    if (data?.getAllBenefit) {
      setBenefits(data?.getAllBenefit?.results || []);
    }
  }, [data]);

  return {
    benefits,
  };
};
