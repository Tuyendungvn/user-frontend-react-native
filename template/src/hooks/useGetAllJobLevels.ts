import {fragmentGetAllJobLevel} from '@services/job';
import {useGetAllJobLevel as useGetJobLevel, JobLevel} from '@apiCaller';
import {useEffect, useState} from 'react';

export const useGetAllJobLevel = () => {
  const [jobLevels, setJobLevels] = useState<JobLevel[]>([]);
  const [getJobTypes, {data}] = useGetJobLevel(fragmentGetAllJobLevel);

  useEffect(() => {
    invokeGetAllJobLevel();
  }, []);

  const invokeGetAllJobLevel = () => {
    getJobTypes({});
  };

  useEffect(() => {
    if (data?.getAllJobLevel) {
      setJobLevels(data?.getAllJobLevel.results || []);
    }
  }, [data]);

  return {
    jobLevels,
  };
};
