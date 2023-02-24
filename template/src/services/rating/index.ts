import {GenFields, RatingResults, Rating} from '@apiCaller';

export const fragmentGetAllRatings: GenFields<RatingResults> = [
  'totalCount',
  {
    results: ['_id', 'createdAt', 'rate', 'updatedAt'],
  },
];

export const fragmentGetRatingByUser: GenFields<Rating> = [
  '_id',
  'createdAt',
  'rate',
  'updatedAt',
];
