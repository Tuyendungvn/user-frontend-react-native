import {GenFields, ProvinceResults} from '@apiCaller';

export const fragmentGetAllProvince: GenFields<ProvinceResults> = [
  'totalCount',
  {
    provinces: [
      '_id',
      'code',
      'countryCode',
      'keyword',
      'latitude',
      'longitude',
      'level',
      'name',
      'slug',
      'slugEn',
    ],
  },
];
