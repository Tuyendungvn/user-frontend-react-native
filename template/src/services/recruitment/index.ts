import {UserResults, ApplyRecruitmentType} from '../../apiCaller';
import {GenFields, RecruitmentResults, Recruitment} from '@apiCaller';

export const fragmentGetAllRecruitment: GenFields<RecruitmentResults> = [
  'totalCount',
  {
    results: [
      '_id',
      'companyName',
      'createdAt',
      'dealSalary',
      'expiredDate',
      'name',
      'salaryMax',
      'salaryMin',
      'createdAt',
      'expiredDate',
      {
        companyLogo: ['default', 'medium', 'small'],
        companyImages: ['default', 'medium', 'small'],
        company: ['_id', 'name'],
        location: ['_id', 'location', 'name'],
      },
    ],
  },
];

export const fragmentGetRecruitmentById: GenFields<Recruitment> = [
  '_id',
  'companyDescription',
  'companyLocation',
  'companyName',
  'companySize',
  'createdAt',
  'description',
  'dealSalary',
  'expiredDate',
  'highlight',
  'isApproved',
  'name',
  'requirement',
  'salaryMax',
  'salaryMin',
  'createdAt',
  'view',
  'expiredDate',
  {
    companyLogo: ['default', 'medium', 'small'],
    companyImages: ['default', 'medium', 'small'],
    company: ['_id', 'name', 'description'],
    viewedUser: ['_id', 'displayName'],
    companyBenefit: [
      '_id',
      'content',
      {
        icon: [
          '_id',
          'description',
          'name',
          'keywords',
          {icon: ['default', 'medium', 'small']},
        ],
      },
    ],
    location: ['_id', 'location', 'name'],
    type: ['_id', 'name', 'description', 'slug'],
    career: ['_id', 'name', 'description', 'slug'],
    level: ['_id', 'name', 'description', 'slug'],
  },
];

export const fragmentGetRecruitmentByCompany: GenFields<RecruitmentResults> = [
  'totalCount',
  {
    results: [
      '_id',
      'companyDescription',
      'companyLocation',
      'companyName',
      'companySize',
      'createdAt',
      'dealSalary',
      'description',
      'expiredDate',
      'highlight',
      'isApproved',
      'name',
      'requirement',
      'salaryMax',
      'salaryMin',
      'createdAt',
      'view',
      'expiredDate',
      {
        companyLogo: ['default', 'medium', 'small'],
        companyImages: ['default', 'medium', 'small'],
        company: ['_id', 'name', 'description'],
        viewedUser: ['_id', 'displayName'],
        companyBenefit: [
          '_id',
          'content',
          {
            icon: [
              '_id',
              'description',
              'name',
              'keywords',
              {icon: ['default', 'medium', 'small']},
            ],
          },
        ],
        location: ['_id', 'location', 'name'],
        type: ['_id', 'name', 'description', 'slug'],
        career: ['_id', 'name', 'description', 'slug'],
        level: ['_id', 'name', 'description', 'slug'],
      },
    ],
  },
];

export const fragmentGetAllRecruitmentByUser: GenFields<RecruitmentResults> = [
  'totalCount',
  {
    results: [
      '_id',
      'companyDescription',
      'companyLocation',
      'companyName',
      'companySize',
      'createdAt',
      'dealSalary',
      'description',
      'expiredDate',
      'highlight',
      'isApproved',
      'name',
      'requirement',
      'salaryMax',
      'salaryMin',
      'createdAt',
      'view',
      'expiredDate',
      {
        companyLogo: ['default', 'medium', 'small'],
        companyImages: ['default', 'medium', 'small'],
        company: ['_id', 'name', 'description'],
        viewedUser: ['_id', 'displayName'],
        companyBenefit: [
          '_id',
          'content',
          {
            icon: [
              '_id',
              'description',
              'name',
              'keywords',
              {icon: ['default', 'medium', 'small']},
            ],
          },
        ],
        location: ['_id', 'location', 'name'],
        type: ['_id', 'name', 'description', 'slug'],
        career: ['_id', 'name', 'description', 'slug'],
        level: ['_id', 'name', 'description', 'slug'],
      },
    ],
  },
];

export const fragmentGetRecruitmentViewdUser: GenFields<UserResults> = [
  'totalCount',
  {
    results: [
      '_id',
      'displayName',
      {
        company: ['location', 'name', {images: ['default', 'medium', 'small']}],
      },
    ],
  },
];

export const fragmentGetSavedRecruitmentByUser: GenFields<Recruitment[]> = [
  '_id',
  'companyDescription',
  'name',
  'companyName',
  'salaryMax',
  'salaryMin',
  'dealSalary',
  'expiredDate',
  'createdAt',
  {companyImages: ['default', 'medium', 'small']},
  {company: [{images: ['default', 'medium', 'small']}, '_id', 'name']},
];

export const fragmentGetAppliedRecruitmentByUser: GenFields<
  ApplyRecruitmentType[]
> = [
  'date',
  {
    recruitment: [
      '_id',
      'companyDescription',
      'name',
      'companyName',
      'salaryMax',
      'salaryMin',
      'dealSalary',
      'expiredDate',
      'createdAt',
      {companyImages: ['default', 'medium', 'small']},
      {company: [{images: ['default', 'medium', 'small']}, '_id', 'name']},
    ],
  },
];
