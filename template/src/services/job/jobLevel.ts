import {GenFields, JobLevelResults, JobLevel} from '@apiCaller';

export const fragmentGetAllJobLevel: GenFields<JobLevelResults> = [
  'totalCount',
  {
    results: [
      '_id',
      'createdAt',
      'description',
      'keywords',
      'name',
      'slug',
      'updatedAt',
    ],
  },
];

export const fragmentGetJobLevelById: GenFields<JobLevel> = [
  '_id',
  'createdAt',
  'description',
  'keywords',
  'name',
  'slug',
  'updatedAt',
];
