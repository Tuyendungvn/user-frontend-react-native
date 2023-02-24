import {GenFields, Record} from '@apiCaller';

export const fragmentGetRecordByUser: GenFields<Record> = [
  '_id',
  'createdAt',
  'description',
  'fileNameCV',
  'generalInformation',
  'jobLevelWanted',
  'jobType',
  'keywords',
  'salaryWanted',
  'slug',
  'updatedAt',
  'urlCV',
  {
    benefitsWanted: [
      '_id',
      'description',
      'keywords',
      'name',
      {icon: ['default', 'medium', 'small']},
    ],
    career: ['_id', 'createdAt', 'description', 'keywords', 'name'],
    education: [
      'degree',
      'description',
      'major',
      'schoolName',
      'timeEnd',
      'timeStart',
    ],
    employerSeenRecord: [
      'date',
      'views',
      {
        employer: [
          '_id',
          'displayName',
          {
            company: [
              '_id',
              'name',
              {images: ['default', 'medium', 'small']},
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
              'location',
            ],
          },
        ],
      },
    ],
    user: ['_id', 'displayName'],
    workExperience: [
      'companyName',
      'companyName',
      'description ',
      'experience',
      'jobName',
      'timeEnd',
      'timeStart',
    ],
    workPlace: [
      '_id',
      'code',
      'countryCode',
      'latitude',
      'level',
      'longitude',
      'name',
    ],
  },
];

export const fragmentUpdateRecord: GenFields<Record> = ['_id'];
