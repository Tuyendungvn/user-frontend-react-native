import {GenFields, JobTypeResults} from '@apiCaller';

export const fragmentGetAllJobType: GenFields<JobTypeResults> = [
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
