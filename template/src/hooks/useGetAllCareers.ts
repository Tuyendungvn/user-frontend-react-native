import {useEffect, useState} from 'react';
import {fragmentGetAllCareers} from '@services/job';
import {useGetAllCategoryLevel2, CategoryLevel2} from '@apiCaller';

export const useGetAllCareers = () => {
  const [careers, setCareers] = useState<CategoryLevel2[]>([]);
  const [getCareer, {data}] = useGetAllCategoryLevel2(fragmentGetAllCareers);

  useEffect(() => {
    invokeGetAllCareer();
  }, []);

  const invokeGetAllCareer = () => {
    getCareer({});
  };

  useEffect(() => {
    if (data?.getAllCategoryLevel2) {
      setCareers(data?.getAllCategoryLevel2.results || []);
    }
  }, [data]);

  return {
    careers,
  };
};
