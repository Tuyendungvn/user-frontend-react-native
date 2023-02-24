import {GenFields, DistrictResults} from '@apiCaller';

export const fragmentGetDistrictByProvince: GenFields<DistrictResults> = [
  'totalCount',
  {
    districts: [
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
      'provinceCode',
      'provinceName',
    ],
  },
];
