import {JobType} from '../apiCaller';
import {useGetAllJobType as useGetJobTypes} from '@apiCaller';
import {fragmentGetAllJobType} from '@services/job';
import {useEffect, useState} from 'react';

export const useGetAllJobType = () => {
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [getJobTypes, {data}] = useGetJobTypes(fragmentGetAllJobType);

  useEffect(() => {
    invokeGetAllJobType();
  }, []);

  const invokeGetAllJobType = () => {
    getJobTypes({});
  };

  useEffect(() => {
    if (data?.getAllJobType) {
      setJobTypes(data?.getAllJobType.results || []);
    }
  }, [data]);

  return {
    jobTypes,
  };
};
