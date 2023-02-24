import {GenFields, CategoryLevel2Results} from '@apiCaller';

export const fragmentGetAllCareers: GenFields<CategoryLevel2Results> = [
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
