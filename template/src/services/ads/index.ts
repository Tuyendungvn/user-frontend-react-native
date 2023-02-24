import {GenFields, Ads} from '@apiCaller';

export const fragmentGetAllAds: GenFields<Ads> = [
  '_id',
  'code',
  'createdAt',
  'language',
  'link',
  'name',
  {urlImage: ['default', 'medium', 'small']},
];
