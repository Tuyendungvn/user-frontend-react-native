import {GenFields, WardResults} from '@apiCaller';

export const fragmentGetWardByDistrict: GenFields<WardResults> = [
  'totalCount',
  {
    wards: [
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
      'districtCode',
      'districtName',
    ],
  },
];
