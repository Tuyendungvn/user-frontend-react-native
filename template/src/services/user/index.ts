import {GenFields, User} from '@apiCaller';

export const fragmentGetUserById: GenFields<User> = [
  '_id',
  'birthday',
  'clientId',
  'isSeekingJob',
  'code',
  'displayName',
  'email',
  'code',
  'enabled',
  'firstName',
  'gender',
  'history',
  'identityCard',
  'isHot',
  'isVerified',
  'lastName',
  'phoneNumber',
  'point',
  'postedJob',
  'rate',
  {career: ['_id', 'name']},
  {
    appliedRecruitment: [
      'date',
      {
        recruitment: [
          '_id',
          'companyDescription',
          'companyLocation',
          'companyName',
          'companySize',
          'companySlug',
          'companyVideo',
          'createdAt',
          'dealSalary',
          'description',
          'expiredDate',
          'highlight',
        ],
      },
    ],
  },
  'title',
  {
    urlAvt: ['default', 'small', 'medium'],
    appliedRecruitment: ['date'],
    company: ['_id'],
    province: ['_id', 'name', 'code'],
    ward: ['_id', 'name', 'code'],
    district: ['_id', 'name', 'code'],
    street: ['_id', 'name', 'code'],
  },
];

export const fragmentUpdateUserProfile: GenFields<User> = ['_id'];
