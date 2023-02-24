import {GenFields, BenefitResults} from '@apiCaller';

export const fragmentGetAllBenefit: GenFields<BenefitResults> = [
  'totalCount',
  {
    results: [
      '_id',
      'description',
      'keywords',
      'name',
      {icon: ['default', 'medium', 'small']},
    ],
  },
];
