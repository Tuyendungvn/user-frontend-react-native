import {GenFields, Evaluate} from '@apiCaller';

export const fragmentGetEvaluateByUserId: GenFields<Evaluate[]> = [
  '_id',
  'avgPoint',
  {answer1: ['name', 'point']},
  {answer2: ['name', 'point']},
  {answer3: ['name', 'point']},
  {answer4: ['name', 'point']},
  {answer5: ['name', 'point']},
  {answer6: ['name', 'point']},
  {answer7: ['name', 'point']},
  {answer8: ['name', 'point']},
  {answer9: ['name', 'point']},
  {answer10: ['name', 'point']},
  {
    evaluator: [
      {
        company: [
          '_id',
          'name',
          'location',
          {
            career: [
              '_id',
              'createdAt',
              'description',
              'keywords',
              'name',
              'slug',
              'updatedAt',
            ],
          },
          {images: ['default', 'medium', 'small']},
        ],
      },
    ],
  },
];

export const fragmentGetEvaluatedById: GenFields<Evaluate> = [
  '_id',
  'avgPoint',
  {answer1: ['name', 'point']},
  {answer2: ['name', 'point']},
  {answer3: ['name', 'point']},
  {answer4: ['name', 'point']},
  {answer5: ['name', 'point']},
  {answer6: ['name', 'point']},
  {answer7: ['name', 'point']},
  {answer8: ['name', 'point']},
  {answer9: ['name', 'point']},
  {answer10: ['name', 'point']},
  {
    evaluator: [
      {
        company: [
          '_id',
          'name',
          'location',
          {
            career: [
              '_id',
              'createdAt',
              'description',
              'keywords',
              'name',
              'slug',
              'updatedAt',
            ],
          },
          {images: ['default', 'medium', 'small']},
        ],
      },
    ],
  },
];
