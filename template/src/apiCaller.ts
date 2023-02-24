/* eslint-disable */

// *******************************************************
// *******************************************************
// USUM SOFTWARE
// GENERATED FILE, DO NOT MODIFY
//
// *******************************************************
// *******************************************************
// 💙

export type Maybe<T> = T | null;

type NonNullable<T> = Exclude<T, null | undefined>;

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

type KeysNotMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? never : K;
}[keyof T];

type MatchingType = string | number | boolean | string[] | number[] | boolean[];

type FilterMaybe<T> = {[k in keyof T]: NonNullable<T[k]>};

type GenFieldsAll<T> = (
  | KeysMatching<T, MatchingType>
  | {
      [k in KeysNotMatching<T, MatchingType>]?: T[k] extends any[]
        ? GenFields<T[k][number]>
        : GenFields<T[k]>;
    }
)[];

export type GenFields<T> = T extends any[]
  ? GenFieldsAll<FilterMaybe<T[number]>>
  : GenFieldsAll<FilterMaybe<T>>;

const queryBuilder = <T>(fields?: GenFields<T>): string => {
  return fields
    ? fields
        .map((field: any) => {
          if (typeof field === 'object') {
            let result = '';

            Object.entries<any>(field as Record<string, any>).forEach(
              ([key, values], index, array) => {
                result += `${key} ${
                  values.length > 0 ? '{ ' + queryBuilder(values) + ' }' : ''
                }`;

                // If it's not the last item in array, join with comma
                if (index < array.length - 1) {
                  result += ', ';
                }
              },
            );

            return result;
          } else {
            return `${field}`;
          }
        })
        .join('\n ')
    : '';
};

const guessFragmentType = (fragment: string | DocumentNode) => {
  let isString = false;
  let isFragment = false;
  let fragmentName = '';
  if (typeof fragment === 'string') {
    isString = true;
  } else if (typeof fragment === 'object' && fragment.definitions.length) {
    isFragment = true;
    const definition = fragment.definitions[0];
    if (definition.kind === 'FragmentDefinition') {
      fragmentName = definition.name.value;
    } else {
      throw new Error(
        `The argument passed is not a fragment definition, got ${definition.kind} instead`,
      );
    }
  }
  return {isString, isFragment, fragmentName};
};

import {
  DocumentNode,
  gql,
  useMutation,
  useLazyQuery,
  useSubscription,
  QueryHookOptions,
  MutationHookOptions,
  SubscriptionHookOptions,
  MutationTuple,
} from '@apollo/client';

export interface AbenlaApiResponse {
  Code: Maybe<number>;
  Message: Maybe<string>;
}

export interface VerifyOtpInput {
  otpCode: string;
  phoneNumber: string;
  permission: string;
}

export interface ResetPasswordOtpInput {
  otpCode: string;
  phoneNumber: string;
  permission: string;
  newPassword: string;
}

export interface RegisterOptInput {
  permission: string;
  phoneNumber: string;
  password: string;
  displayName?: string;
  email?: string;
}

export interface LoginUserInput {
  username: string;
  password: string;
}

export interface AboutUs {
  _id: Maybe<undefined>;
  images: Maybe<CustomSizeImages[]>;
  user: Maybe<User>;
  aboutUs: Maybe<string>;
  vision: Maybe<string>;
  coreValues: Maybe<string>;
  potentialCandidate: Maybe<string>;
  contact: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface AboutUsCreateInput {
  images?: File[];
  user: string;
  aboutUs: string;
  vision?: string;
  coreValues?: string;
  potentialCandidate?: string;
  contact: string;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface AboutUsUpdateInput {
  images?: CustomUploadInput[];
  user?: string;
  aboutUs?: string;
  vision?: string;
  coreValues?: string;
  potentialCandidate?: string;
  contact?: string;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface AboutUsResults {
  results: Maybe<AboutUs[]>;
  totalCount: Maybe<number>;
}

export interface FilterAds {
  codeOrImg?: boolean;
  isSlide?: boolean;
  displayLocation?: string;
  language?: string;
}

export interface Ads {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  code: Maybe<string>;
  urlImage: Maybe<CustomSizeImages>;
  slideImg: Maybe<CustomSizeImages[]>;
  displayLocation: Maybe<Types>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
  link: Maybe<string>;
  language: Maybe<string>;
}

export interface CreateAdsInput {
  name: string;
  code?: string;
  urlImage?: File;
  slideImg?: File[];
  link: string;
  displayLocation: string;
  language?: string;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface UpdateAdsInput {
  name?: string;
  code?: string;
  urlImage?: File;
  slideImg?: CustomUploadInput[];
  link?: string;
  displayLocation?: string;
  language?: string;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface Benefit {
  _id: Maybe<undefined>;
  icon: Maybe<CustomSizeImages>;
  name: Maybe<string>;
  description: Maybe<string>;
  keywords: Maybe<string>;
}

export interface BenefitInput {
  icon?: File;
  name?: string;
  description?: string;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface BenefitResults {
  results: Maybe<Benefit[]>;
  totalCount: Maybe<number>;
}

export interface FilterBenefit {
  name?: string;
}

export interface CareerCounseling {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  description: Maybe<string>;
  content: Maybe<string>;
  urlImage: Maybe<CustomSizeImages>;
  videos: Maybe<string[]>;
  code: Maybe<string>;
  highlight: Maybe<boolean>;
  enabled: Maybe<boolean>;
  language: Maybe<string>;
  category: Maybe<Category>;
  tags: Maybe<Tag[]>;
  target: Maybe<targetType>;
  slug: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface CareerCounselingCreateInput {
  name: string;
  description: string;
  content: string;
  urlImage?: File;
  videos?: File[];
  code?: string;
  highlight?: boolean;
  enabled?: boolean;
  language?: string;
  category: string;
  tags: string[];
  target?: targetType;
  slug?: string;
  keywords?: string;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface CareerCounselingUpdateInput {
  name?: string;
  description?: string;
  content?: string;
  urlImage?: File;
  videos?: File[];
  code?: string;
  highlight?: boolean;
  enabled?: boolean;
  language?: string;
  category?: string;
  tags?: string[];
  target?: targetType;
  slug?: string;
  keywords?: string;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface FilterCareerCounseling {
  name?: string;
  code?: string;
  highlight?: boolean;
  category?: string;
  tags?: string;
  target?: targetType;
}

export interface CareerCounselingResults {
  results: Maybe<CareerCounseling[]>;
  totalCount: Maybe<number>;
}

export enum targetType {
  Candidate = 'CANDIDATE',
  Employer = 'EMPLOYER',
}
export interface CategoryLevel1 {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  description: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface CategoryLevel1Results {
  results: Maybe<CategoryLevel1[]>;
  totalCount: Maybe<number>;
}

export interface CategoryLevel1Input {
  name?: string;
  description?: string;
}

export interface FilterCategoryLevel1 {
  name?: string;
}

export interface CategoryLevel2 {
  _id: Maybe<undefined>;
  icon: Maybe<CustomSizeImages>;
  name: Maybe<string>;
  categoryLevel1: Maybe<CategoryLevel1>;
  description: Maybe<string>;
  keywords: Maybe<string>;
  slug: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface CategoryLevel2Input {
  icon?: File;
  name?: string;
  categoryLevel1?: string;
  description?: string;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface FilterCategoryLevel2 {
  name?: string;
  categoryLevel1?: string;
}

export interface CategoryLevel2Results {
  results: Maybe<CategoryLevel2[]>;
  totalCount: Maybe<number>;
}

export interface Category {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  description: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface CategoryResults {
  results: Maybe<Category[]>;
  totalCount: Maybe<number>;
}

export interface FilterCategory {
  name?: string;
}

export interface CategoryInput {
  name?: string;
  description?: string;
}

export interface ImageSizeInput {
  width?: number;
  height?: number;
}

export interface CustomSizeImagesInput {
  medium?: ImageSizeInput;
  small?: ImageSizeInput;
}

export interface CustomSizeImages {
  default: Maybe<string>;
  medium: Maybe<string>;
  small: Maybe<string>;
}

export interface URLCustomSizeImages {
  default?: string;
  medium?: string;
  small?: string;
}

export interface CustomUploadInput {
  type?: EditImageType;
  url?: URLCustomSizeImages;
  file?: File;
}

export interface CustomUploadInputVideo {
  type?: EditImageType;
  url?: string;
  file?: File;
}

export interface IJwtPayload {
  id: Maybe<string>;
}

export interface JwtPayload {
  accessToken: Maybe<string>;
  refreshToken: Maybe<string>;
  userId: Maybe<IJwtPayload>;
  userInfo: Maybe<User>;
}

export interface LocationType {
  province: Maybe<string>;
  district: Maybe<string>;
  ward: Maybe<string>;
  street: Maybe<string>;
  latitude: Maybe<number>;
  longitude: Maybe<number>;
}

export interface LocationTypeInput {
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
  streetCode?: string;
  streetName?: string;
  longitude?: number;
  latitude?: number;
}

export interface TypePoint {
  type: Maybe<string>;
}

export interface PointGeometry {
  type: Maybe<TypePoint>;
  coordinates: Maybe<number[]>;
}

export interface PointInput {
  type: string;
  coordinates: number[];
}

export interface WorkExperienceType {
  companyName: Maybe<string>;
  jobName: Maybe<string>;
  timeStart: Maybe<string>;
  timeEnd: Maybe<string>;
  experience: Maybe<number>;
  description: Maybe<string>;
}

export interface WorkExperienceTypeInput {
  companyName?: string;
  jobName?: string;
  timeStart?: string;
  timeEnd?: string;
  description?: string;
}

export interface EducationType {
  schoolName: Maybe<string>;
  degree: Maybe<string>;
  major: Maybe<string>;
  timeStart: Maybe<string>;
  timeEnd: Maybe<string>;
  description: Maybe<string>;
}

export interface EducationTypeInput {
  schoolName?: string;
  degree?: string;
  major?: string;
  timeStart?: string;
  timeEnd?: string;
  description?: string;
}

export interface OverviewResults {
  totalEmployer: Maybe<number>;
  totalCandidate: Maybe<number>;
  totalRecruitment: Maybe<number>;
  totalRecruitmentAvailable: Maybe<number>;
  totalRecruitmentExpired: Maybe<number>;
  totalEvaluate: Maybe<number>;
}

export enum EditImageType {
  String = 'STRING',
  File = 'FILE',
}
export enum RandomCodeEnum {
  Lower = 'LOWER',
  Upper = 'UPPER',
  Number = 'NUMBER',
}
export interface Company {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  code: Maybe<string>;
  highlight: Maybe<boolean>;
  description: Maybe<string>;
  defaultRecord: Maybe<boolean>;
  career: Maybe<CategoryLevel2[]>;
  careerName: Maybe<string[]>;
  size: Maybe<string>;
  isHot: Maybe<boolean>;
  isTop: Maybe<boolean>;
  status: Maybe<boolean>;
  view: Maybe<number>;
  applied: Maybe<number>;
  subscribe: Maybe<number>;
  location: Maybe<string>;
  province: Maybe<ProvinceType[]>;
  user: Maybe<User>;
  contactName: Maybe<string>;
  phoneNumber: Maybe<string>;
  benefits: Maybe<BenefitType[]>;
  images: Maybe<CustomSizeImages[]>;
  logo: Maybe<CustomSizeImages>;
  videos: Maybe<string>;
  point: Maybe<number>;
  slug: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
  hasEvaluated: Maybe<boolean>;
  isIdentified: Maybe<boolean>;
}

export interface CompanyCreateInput {
  name: string;
  code?: string;
  highlight?: boolean;
  description: string;
  defaultRecord?: boolean;
  career?: string[];
  careerName?: string[];
  size?: string;
  isHot?: boolean;
  isTop?: boolean;
  status?: boolean;
  view?: number;
  subscribe?: number;
  location?: string;
  user: string;
  contactName?: string;
  phoneNumber: string;
  benefits?: BenefitTypeInput[];
  images?: File[];
  logo?: File;
  videos?: string;
  point?: number;
  isIdentified?: boolean;
  customSizeForUploadLogo?: CustomSizeImagesInput;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface CompanyUpdateInput {
  name?: string;
  code?: string;
  highlight?: boolean;
  description?: string;
  defaultRecord?: boolean;
  career?: string[];
  careerName?: string[];
  size?: string;
  isHot?: boolean;
  isTop?: boolean;
  status?: boolean;
  view?: number;
  subscribe?: number;
  location?: string;
  user?: string;
  contactName?: string;
  phoneNumber?: string;
  benefits?: BenefitTypeInput[];
  images?: CustomUploadInput[];
  logo?: CustomUploadInput;
  videos?: string;
  point?: number;
  isIdentified?: boolean;
  customSizeForUploadLogo?: CustomSizeImagesInput;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface BenefitType {
  _id: Maybe<string>;
  icon: Maybe<Benefit>;
  content: Maybe<string>;
}

export interface BenefitTypeInput {
  icon?: string;
  content?: string;
}

export interface FilterCompany {
  name?: string;
  highlight?: boolean;
  slug?: string;
  status?: boolean;
  isTop?: boolean;
  slugCareer?: string;
  sortType?: CompanySortType;
  isRecruiting?: boolean;
  provinceId?: string;
  slugProvince?: string;
  hasEvaluated?: boolean;
  nameOrCode?: string;
  listProvinceSlug?: string[];
  listCareerSlug?: string[];
}

export enum CompanySortType {
  Latest = 'latest',
  Mostview = 'mostView',
  Mostsub = 'mostSub',
  Mostapplied = 'mostApplied',
}
export interface CompanyResults {
  results: Maybe<Company[]>;
  totalCount: Maybe<number>;
}

export interface Contact {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  title: Maybe<string>;
  description: Maybe<string>;
  email: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface ContactResults {
  results: Maybe<Contact[]>;
  totalCount: Maybe<number>;
}

export interface ContactInput {
  name: string;
  title?: string;
  description?: string;
  email: string;
}

export interface ContentWebsite {
  _id: Maybe<undefined>;
  whiteLogo: Maybe<CustomSizeImages>;
  colorLogo: Maybe<CustomSizeImages>;
  photos: Maybe<CustomSizeImages>;
  address: Maybe<string>;
  phone: Maybe<string>;
  footerUserInfo: Maybe<string[]>;
  footerEmployerInfo: Maybe<string[]>;
  customCodeHeader: Maybe<string>;
  customCodeFooter: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface ContentWebsiteCreateInput {
  whiteLogo?: File;
  colorLogo?: File;
  photos?: File;
  address: string;
  phone: string;
  footerUserInfo?: string[];
  footerEmployerInfo?: string[];
  customCodeHeader?: string;
  customCodeFooter?: string;
  customSizeImageForWhiteLogo?: CustomSizeImagesInput;
  customSizeImageForColorLogo?: CustomSizeImagesInput;
}

export interface ContentWebsiteUpdateInput {
  whiteLogo?: File;
  colorLogo?: File;
  photos?: File;
  address?: string;
  phone?: string;
  footerUserInfo?: string[];
  footerEmployerInfo?: string[];
  customCodeHeader?: string;
  customCodeFooter?: string;
  customSizeImageForWhiteLogo?: CustomSizeImagesInput;
  customSizeImageForColorLogo?: CustomSizeImagesInput;
}

export interface FilterContentWebsite {
  phone?: string;
}

export interface ContentWebsiteResults {
  results: Maybe<ContentWebsite[]>;
  totalCount: Maybe<number>;
}

export interface DistrictType {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  code: Maybe<string>;
  provinceName: Maybe<string>;
  provinceCode: Maybe<string>;
  slug: Maybe<string>;
  level: Maybe<string>;
  longitude: Maybe<number>;
  latitude: Maybe<number>;
  slugEn: Maybe<string>;
  nameEn: Maybe<string>;
  keyword: Maybe<string>;
}

export interface DistrictResults {
  districts: Maybe<DistrictType[]>;
  totalCount: Maybe<number>;
}

export interface DistrictInput {
  name?: string;
  code?: string;
  provinceName?: string;
  provinceCode?: string;
  slug?: string;
  level?: string;
  longitude?: number;
  latitude?: number;
  slugEn?: string;
  nameEn?: string;
}

export interface Evaluate {
  _id: Maybe<undefined>;
  user: Maybe<User>;
  evaluator: Maybe<User>;
  answer1: Maybe<EvaluateDetail>;
  answer2: Maybe<EvaluateDetail>;
  answer3: Maybe<EvaluateDetail>;
  answer4: Maybe<EvaluateDetail>;
  answer5: Maybe<EvaluateDetail>;
  answer6: Maybe<EvaluateDetail>;
  answer7: Maybe<EvaluateDetail>;
  answer8: Maybe<EvaluateDetail>;
  answer9: Maybe<EvaluateDetail>;
  answer10: Maybe<EvaluateDetail>;
  avgPoint: Maybe<number>;
}

export interface EvaluateCreateInput {
  user: string;
  evaluator: string;
  answer1: EvaluateDetailInput;
  answer2: EvaluateDetailInput;
  answer3: EvaluateDetailInput;
  answer4: EvaluateDetailInput;
  answer5: EvaluateDetailInput;
  answer6: EvaluateDetailInput;
  answer7: EvaluateDetailInput;
  answer8: EvaluateDetailInput;
  answer9: EvaluateDetailInput;
  answer10: EvaluateDetailInput;
}

export interface EvaluateUpdateInput {
  user?: string;
  evaluator?: string;
  answer1?: EvaluateDetailInput;
  answer2?: EvaluateDetailInput;
  answer3?: EvaluateDetailInput;
  answer4?: EvaluateDetailInput;
  answer5?: EvaluateDetailInput;
  answer6?: EvaluateDetailInput;
  answer7?: EvaluateDetailInput;
  answer8?: EvaluateDetailInput;
  answer9?: EvaluateDetailInput;
  answer10?: EvaluateDetailInput;
}

export interface EvaluateDetail {
  name: Maybe<string>;
  point: Maybe<number>;
}

export interface EvaluateDetailInput {
  name?: Answer;
  point?: number;
}

export enum Answer {
  Siengnang = 'siengnang',
  Tuduysangtao = 'tuduysangtao',
  Hoatdongcongdong = 'hoatdongcongdong',
  Hoadongthanthien = 'hoadongthanthien',
  Lanhloihoatbat = 'lanhloihoatbat',
  Nanglucchuyenmon = 'nanglucchuyenmon',
  Lamviecnhom = 'lamviecnhom',
  Quanlynhom = 'quanlynhom',
  Thuyettrinh = 'thuyettrinh',
  Kinhnghiemlamviec = 'kinhnghiemlamviec',
}
export interface EvaluateResults {
  results: Maybe<Evaluate[]>;
  totalCount: Maybe<number>;
}

export enum InvitationApplyStatusEnum {
  Accept = 'accept',
  Deny = 'deny',
}
export interface InvitationApply {
  _id: Maybe<string>;
  positionApply: Maybe<string>;
  address: Maybe<string>;
  receiver: Maybe<User>;
  sender: Maybe<User>;
  senderName: Maybe<string>;
  senderPhone: Maybe<string>;
  senderEmail: Maybe<string>;
  company: Maybe<Company>;
  recruitment: Maybe<Recruitment>;
  status: Maybe<InvitationApplyStatusEnum>;
  isConfirmFromReceiver: Maybe<boolean>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface InvitationApplyResult {
  results: Maybe<InvitationApply[]>;
  totalCount: Maybe<number>;
}

export interface CreateInvitationApplyInput {
  positionApply?: string;
  address?: string;
  receiver?: string;
  sender?: string;
  senderName?: string;
  senderPhone?: string;
  senderEmail?: string;
  company?: string;
  recruitment?: string;
  status?: InvitationApplyStatusEnum;
}

export interface InvitationApplyInput {
  positionApply?: string;
  address?: string;
  receiver?: string;
  sender?: string;
  senderName?: string;
  senderPhone?: string;
  senderEmail?: string;
  company?: string;
  recruitment?: string;
  status?: InvitationApplyStatusEnum;
}

export interface FilterInvitationApply {
  receiver?: string;
  sender?: string;
  company?: string;
  recruitment?: string;
  status?: InvitationApplyStatusEnum;
  isConfirmFromReceiver?: boolean;
}

export interface JobLevel {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  description: Maybe<string>;
  keywords: Maybe<string>;
  slug: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface JobLevelResults {
  results: Maybe<JobLevel[]>;
  totalCount: Maybe<number>;
}

export interface JobLevelInput {
  name?: string;
  description?: string;
}

export interface JobType {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  description: Maybe<string>;
  keywords: Maybe<string>;
  slug: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface JobTypeResults {
  results: Maybe<JobType[]>;
  totalCount: Maybe<number>;
}

export interface JobTypeInput {
  name?: string;
  description?: string;
}

export interface FilterJobType {
  name?: string;
}

export interface Keyword {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  description: Maybe<string>;
  keywords: Maybe<string>;
  slug: Maybe<string>;
  isHot: Maybe<boolean>;
  searchTime: Maybe<number>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface KeywordResults {
  results: Maybe<Keyword[]>;
  totalCount: Maybe<number>;
}

export interface FilterKeyword {
  name?: string;
}

export interface KeywordInput {
  name?: string;
  description?: string;
  isHot?: boolean;
}

export interface LevelPrice {
  _id: Maybe<undefined>;
  displayName: Maybe<string>;
  priceFrom: Maybe<number>;
  priceTo: Maybe<number>;
  language: Maybe<string>;
  slug: Maybe<string>;
  customSlug: Maybe<string>;
  keywords: Maybe<string>;
}

export interface CreateLevelPriceInput {
  displayName?: string;
  priceFrom?: number;
  priceTo?: number;
  language?: string;
  slug?: string;
  customSlug?: string;
}

export interface UpdateLevelPriceInput {
  displayName?: string;
  priceFrom?: number;
  priceTo?: number;
  language?: string;
  slug?: string;
  customSlug?: string;
}

export interface FilterLevelPrice {
  displayName?: string;
  language?: string;
}

export interface LevelPriceResult {
  results: Maybe<LevelPrice[]>;
  totalCount: Maybe<number>;
}

export interface NotifySetting {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  description: Maybe<string>;
  permission: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface NotifySettingResults {
  results: Maybe<NotifySetting[]>;
  totalCount: Maybe<number>;
}

export interface FilterNotifySetting {
  name?: string;
  permission?: string;
}

export interface NotifySettingInput {
  name?: string;
  description?: string;
  permission?: string;
}

export interface Notify {
  _id: Maybe<undefined>;
  user: Maybe<User>;
  name: Maybe<string>;
  company: Maybe<Company>;
  description: Maybe<string>;
  seen: Maybe<boolean>;
  scheduleInterview: Maybe<ScheduleInterview>;
  invitationApply: Maybe<InvitationApply>;
  slug: Maybe<string>;
  keywords: Maybe<string>;
  recruitmentId: Maybe<string>;
  noticeExpiration: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface NotifyCreateInput {
  noticeExpiration?: string;
  user: string;
  name: string;
  company: string;
  description: string;
  recruitmentId?: string;
  scheduleInterview?: string;
  invitationApply?: string;
}

export interface NotifyUpdateInput {
  noticeExpiration?: string;
  user?: string;
  name?: string;
  company?: string;
  description?: string;
  recruitmentId?: string;
  scheduleInterview?: string;
  invitationApply?: string;
}

export interface FilterNotify {
  name?: string;
}

export interface NotifyResults {
  results: Maybe<Notify[]>;
  totalCount: Maybe<number>;
}

export enum Priority {
  High = 'high',
  Normal = 'normal',
}
export interface FirebaseError {
  code: Maybe<string>;
  message: Maybe<string>;
}

export interface FirebaseNotificationResponse {
  success: Maybe<boolean>;
  messageId: Maybe<string>;
  error: Maybe<FirebaseError>;
}

export interface FirebaseNotificationResult {
  responses: Maybe<FirebaseNotificationResponse[]>;
  successCount: Maybe<number>;
  failureCount: Maybe<number>;
}

export interface AndroidNotificationConfig {
  ttl: number;
  priority: Priority;
}

export interface IOSNotificationConfig {
  ttl: number;
  priority: number;
}

export interface FirebaseNotification {
  title: string;
  body: string;
  imageUrl?: string;
}

export interface FilterPages {
  name?: string;
  slug?: string;
  type?: string;
}

export interface PagesResult {
  results: Maybe<Pages[]>;
  totalCount: Maybe<number>;
}

export interface Pages {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  type: Maybe<Types>;
  content: Maybe<string>;
  url: Maybe<string>;
  slug: Maybe<string>;
  createdAt: Maybe<string>;
  image: Maybe<CustomSizeImages>;
}

export interface CreatePagesInput {
  name: string;
  type: string;
  url: string;
  content: string;
  image?: File;
  customImageSizeUpload?: CustomSizeImagesInput;
}

export interface UpdatePagesInput {
  name?: string;
  type?: string;
  url?: string;
  content?: string;
  image?: File;
  customImageSizeUpload?: CustomSizeImagesInput;
}

export interface PointSetting {
  _id: Maybe<undefined>;
  postPoint: Maybe<number>;
  ratePoint: Maybe<number>;
  viewPoint: Maybe<number>;
  expiredTime: Maybe<number>;
  defaultPoint: Maybe<number>;
  schedulePoint: Maybe<number>;
}

export interface PointSettingInput {
  postPoint?: number;
  ratePoint?: number;
  viewPoint?: number;
  expiredTime?: number;
  defaultPoint?: number;
  schedulePoint?: number;
}

export interface Position {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  description: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface PositionResults {
  results: Maybe<Position[]>;
  totalCount: Maybe<number>;
}

export interface PositionInput {
  name?: string;
  description?: string;
}

export interface FilterPosition {
  name?: string;
}

export interface ProvinceType {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  code: Maybe<string>;
  countryCode: Maybe<string>;
  slug: Maybe<string>;
  level: Maybe<string>;
  longitude: Maybe<number>;
  latitude: Maybe<number>;
  slugEn: Maybe<string>;
  nameEn: Maybe<string>;
  keyword: Maybe<string>;
}

export interface ProvinceResults {
  provinces: Maybe<ProvinceType[]>;
  totalCount: Maybe<number>;
}

export interface ProvinceInput {
  name?: string;
  code?: string;
  countryCode?: string;
  slug?: string;
  level?: string;
  longitude?: number;
  latitude?: number;
  slugEn?: string;
  nameEn?: string;
}

export interface Rating {
  _id: Maybe<undefined>;
  user: Maybe<User>;
  rate: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface RatingResults {
  results: Maybe<Rating[]>;
  totalCount: Maybe<number>;
}

export interface RatingCreateInput {
  user: string;
  rate: string;
  point?: number;
}

export interface RatingUpdateInput {
  rate?: string;
  point?: number;
}

export interface FilterRating {
  userPermission?: string;
  userName?: string;
  userDisplayName?: string;
}

export interface Record {
  _id: Maybe<undefined>;
  user: Maybe<User>;
  jobType: Maybe<string[]>;
  generalInformation: Maybe<string>;
  workExperience: Maybe<WorkExperienceType[]>;
  education: Maybe<EducationType[]>;
  workPlace: Maybe<ProvinceType>;
  career: Maybe<CategoryLevel2[]>;
  jobLevelWanted: Maybe<string>;
  salaryWanted: Maybe<number>;
  benefitsWanted: Maybe<Benefit[]>;
  employerSeenRecord: Maybe<EmployerSeenRecord[]>;
  description: Maybe<string>;
  urlCV: Maybe<string>;
  fileNameCV: Maybe<string>;
  slug: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface EmployerSeenRecord {
  employer: Maybe<User>;
  date: Maybe<string>;
  views: Maybe<number>;
}

export interface RecordCreateInput {
  user: string;
  candidateCode?: string;
  generalInformation?: string;
  workExperience?: WorkExperienceTypeInput[];
  education?: EducationTypeInput[];
  workPlace?: string;
  career?: string[];
  jobLevelWanted?: string;
  salaryWanted?: number;
  benefitsWanted?: string[];
  slug?: string;
  keywords?: string;
  urlCV?: File;
  fileNameCV?: string;
  description?: string;
}

export interface RecordUpdateInput {
  user?: string;
  candidateCode?: string;
  generalInformation?: string;
  workExperience?: WorkExperienceTypeInput[];
  education?: EducationTypeInput[];
  workPlace?: string;
  career?: string[];
  jobLevelWanted?: string;
  salaryWanted?: number;
  benefitsWanted?: string[];
  slug?: string;
  keywords?: string;
  urlCV?: File;
  fileNameCV?: string;
  description?: string;
}

export interface RecordResults {
  results: Maybe<Record[]>;
  totalCount: Maybe<number>;
}

export interface FilterRecord {
  displayName?: string;
  candidateCode?: string;
  point?: number;
  province?: string;
  experience?: number;
  jobType?: string;
  career?: string;
}

export interface RecruitmentLanguage {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  description: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface RecruitmentLanguageResults {
  results: Maybe<RecruitmentLanguage[]>;
  totalCount: Maybe<number>;
}

export interface RecruitmentLanguageInput {
  name?: string;
  description?: string;
}

export interface Recruitment {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  type: Maybe<JobType>;
  level: Maybe<JobLevel>;
  view: Maybe<number>;
  description: Maybe<string>;
  requirement: Maybe<string>;
  career: Maybe<CategoryLevel2[]>;
  location: Maybe<WorkLocation[]>;
  highlight: Maybe<boolean>;
  user: Maybe<User>;
  viewedUser: Maybe<User[]>;
  appliedUser: Maybe<User[]>;
  approvedUser: Maybe<User[]>;
  company: Maybe<Company>;
  salaryMin: Maybe<number>;
  salaryMax: Maybe<number>;
  dealSalary: Maybe<boolean>;
  isApproved: Maybe<boolean>;
  slug: Maybe<string>;
  keywords: Maybe<Keyword[]>;
  expiredDate: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
  companyName: Maybe<string>;
  companySize: Maybe<string>;
  companyLocation: Maybe<string>;
  companyBenefit: Maybe<BenefitType[]>;
  companyDescription: Maybe<string>;
  companyLogo: Maybe<CustomSizeImages>;
  companyImages: Maybe<CustomSizeImages[]>;
  companyVideo: Maybe<string>;
  companySlug: Maybe<string>;
}

export interface RecruitmentNews {
  name: Maybe<string>;
  position: Maybe<string>;
  expiredDate: Maybe<string>;
  createdAt: Maybe<string>;
}

export interface RecruitmentCreateInput {
  name: string;
  type?: string;
  level: string;
  description: string;
  requirement: string;
  career: string[];
  user?: string;
  company: string;
  location: string[];
  salaryMin: number;
  salaryMax: number;
  dealSalary?: boolean;
  expiredDate?: string;
  keywords: string[];
  companyName: string;
  companySize?: string;
  companyLocation?: string;
  companyBenefit?: BenefitTypeInput[];
  companyDescription: string;
  companyLogo?: File;
  companyImages?: CustomUploadInput[];
  companyVideo?: string;
  customSizeForUploadLogo?: CustomSizeImagesInput;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface RecruitmentUpdateInput {
  name?: string;
  type?: string;
  level?: string;
  description?: string;
  requirement?: string;
  career?: string[];
  user?: string;
  company?: string;
  location?: string[];
  salaryMin?: number;
  salaryMax?: number;
  dealSalary?: boolean;
  expiredDate?: string;
  keywords?: string[];
  companyName?: string;
  companySize?: string;
  companyLocation?: string;
  companyBenefit?: BenefitTypeInput[];
  companyDescription?: string;
  companyLogo?: File;
  companyImages?: CustomUploadInput[];
  companyVideo?: string;
  customSizeForUploadLogo?: CustomSizeImagesInput;
  customSizeForUploadImage?: CustomSizeImagesInput;
}

export interface RecruitmentResults {
  results: Maybe<Recruitment[]>;
  totalCount: Maybe<number>;
}

export interface FilterRecruitment {
  name?: string;
  keywords?: string;
  slugProvince?: string;
  userCode?: string;
  slugCareer?: string;
  slugLevel?: string;
  slugLevelPrice?: string;
  highlight?: boolean;
  isApproved?: boolean;
  slugType?: string;
  sortType?: RecruitmentSortType;
  companyCode?: string;
  companyName?: string;
  companySlug?: string;
  isExpired?: boolean;
  userId?: string;
  candidateId?: string;
  companyId?: string;
  listProvinceSlug?: string[];
  listCareerSlug?: string[];
  listLevelSlug?: string[];
  listTypeSlug?: string[];
  createdAt?: Timeline;
}

export enum RecruitmentSortType {
  Latest = 'latest',
  Oldest = 'oldest',
  Highsalary = 'highSalary',
  Lowsalary = 'lowSalary',
}
export interface FilterRequestReview {
  candidate?: string;
  nameOrCode?: string;
  employer?: string;
  status?: RequestReviewStatus;
  displayNameCandidate?: string;
}

export enum RequestReviewStatus {
  Waiting_for_review = 'waiting_for_review',
  Reviewed = 'reviewed',
  Schedule_interviewed = 'schedule_interviewed',
}
export interface RequestReviewResult {
  results: Maybe<RequestReview[]>;
  totalCount: Maybe<number>;
}

export interface RequestReview {
  _id: Maybe<undefined>;
  candidate: Maybe<User>;
  employer: Maybe<User>;
  status: Maybe<RequestReviewStatus>;
  evaluate: Maybe<Evaluate>;
}

export interface CreateRequestReviewInput {
  candidate?: string;
  employer?: string;
  status?: RequestReviewStatus;
  evaluate?: string;
}

export interface UpdateRequestReviewInput {
  candidate?: string;
  employer?: string;
  status?: RequestReviewStatus;
  evaluate?: string;
}

export enum ScheduleInterviewTypeEnum {
  Online = 'Online',
  Offline = 'Offline',
}
export enum ScheduleInterviewStatusEnum {
  Expired = 'expired',
  Due = 'due',
  Canceled = 'canceled',
}
export interface ScheduleInterview {
  _id: Maybe<string>;
  positionInterview: Maybe<string>;
  scheduleType: Maybe<ScheduleInterviewTypeEnum>;
  scheduleTime: Maybe<string>;
  scheduleLocation: Maybe<string>;
  receiver: Maybe<User>;
  sender: Maybe<User>;
  company: Maybe<Company>;
  recruitment: Maybe<Recruitment>;
  interviewerName: Maybe<string>;
  interviewerPhone: Maybe<string>;
  interviewerEmail: Maybe<string>;
  status: Maybe<ScheduleInterviewStatusEnum>;
  isConfirmFromReceiver: Maybe<boolean>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface ScheduleInterviewResult {
  results: Maybe<ScheduleInterview[]>;
  totalCount: Maybe<number>;
}

export interface CreateScheduleInterviewInput {
  positionInterview: string;
  scheduleType: ScheduleInterviewTypeEnum;
  scheduleTime: string;
  scheduleLocation?: string;
  receiver: string;
  company: string;
  recruitment: string;
  interviewerName?: string;
  interviewerPhone?: string;
  interviewerEmail?: string;
}

export interface ScheduleInterviewInput {
  positionInterview?: string;
  scheduleType?: ScheduleInterviewTypeEnum;
  scheduleTime?: string;
  scheduleLocation?: string;
  receiver?: string;
  company?: string;
  recruitment?: string;
  interviewerName?: string;
  interviewerPhone?: string;
  interviewerEmail?: string;
}

export interface FilterScheduleInterview {
  scheduleType?: ScheduleInterviewTypeEnum;
  receiver?: string;
  sender?: string;
  company?: string;
  recruitment?: string;
  status?: ScheduleInterviewStatusEnum;
  isConfirmFromReceiver?: boolean;
}

export interface Seo {
  _id: Maybe<undefined>;
  seoTitle: Maybe<string>;
  seoKeyword: Maybe<string[]>;
  author: Maybe<string>;
  seoSiteMap: Maybe<string>;
  seoDescription: Maybe<string>;
  footerContentOfHomepage: Maybe<string>;
  footerContentOfJobPosting: Maybe<string>;
  footerContentOfEmployee: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
  language: Maybe<string>;
}

export interface UpdateSeoInput {
  seoTitle?: string;
  seoKeyword?: string[];
  author?: string;
  seoSiteMap?: string;
  seoDescription?: string;
  footerContentOfHomepage?: string;
  footerContentOfJobPosting?: string;
  footerContentOfEmployee?: string;
  language: string;
}

export interface Services {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  price: Maybe<number>;
  types: Maybe<number>;
  code: Maybe<string>;
  language: Maybe<string>;
  description: Maybe<string>;
  slug: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface CreateServicesInput {
  name: string;
  price: number;
  types: string;
  code: string;
  language?: string;
  description: string;
  slug?: string;
  keywords?: string;
}

export interface UpdateServicesInput {
  name?: string;
  price?: number;
  types?: string;
  code?: string;
  language?: string;
  description?: string;
  slug?: string;
  keywords?: string;
}

export interface ServicesResult {
  results: Maybe<Services[]>;
  totalCount: Maybe<number>;
}

export interface FilterServices {
  name?: string;
  types?: string;
  language?: string;
}

export interface StreetType {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  code: Maybe<string>;
  province: Maybe<ProvinceType>;
  district: Maybe<DistrictType>;
  ward: Maybe<WardType>;
  slug: Maybe<string>;
  longitude: Maybe<number>;
  latitude: Maybe<number>;
  keywords: Maybe<string>;
}

export interface StreetTypeInput {
  name: string;
  code?: string;
  province: string;
  district: string;
  ward: string;
  longitude?: number;
  latitude?: number;
  slug?: string;
  keywords?: string;
}

export interface StreetTypeResults {
  streets: Maybe<StreetType[]>;
  totalCount: Maybe<number>;
}

export interface FilterStreetType {
  name?: string;
  province?: string;
  district?: string;
  ward?: string;
}

export interface Tag {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  isHot: Maybe<boolean>;
  status: Maybe<boolean>;
  description: Maybe<string>;
  keywords: Maybe<string>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface TagResults {
  results: Maybe<Tag[]>;
  totalCount: Maybe<number>;
}

export interface TagInput {
  name?: string;
  isHot?: boolean;
  status?: boolean;
  description?: string;
}

export interface FilterTag {
  name?: string;
  isHot?: boolean;
}

export interface Types {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  code: Maybe<string>;
  value: Maybe<string>;
  slug: Maybe<string>;
  language: Maybe<string>;
}

export interface CreateTypesInput {
  name: string;
  value: string;
  code: string;
  slug?: string;
  language?: string;
}

export interface UpdateTypesInput {
  name?: string;
  value?: string;
  code?: string;
  slug?: string;
  language?: string;
}

export interface User {
  _id: Maybe<undefined>;
  clientId: Maybe<string>;
  provider: Maybe<string>;
  birthday: Maybe<string>;
  gender: Maybe<GenderType>;
  urlAvt: Maybe<CustomSizeImages>;
  firstName: Maybe<string>;
  lastName: Maybe<string>;
  displayName: Maybe<string>;
  company: Maybe<Company>;
  username: Maybe<string>;
  email: Maybe<string>;
  phoneNumber: Maybe<string>;
  permission: Maybe<string>;
  identityCard: Maybe<string>;
  code: Maybe<string>;
  title: Maybe<string>;
  history: Maybe<string>;
  province: Maybe<ProvinceType>;
  district: Maybe<DistrictType>;
  ward: Maybe<WardType>;
  street: Maybe<StreetType>;
  password: Maybe<string>;
  isVerified: Maybe<boolean>;
  isHot: Maybe<boolean>;
  point: Maybe<number>;
  rate: Maybe<string>;
  postedJob: Maybe<number>;
  subscribedCompany: Maybe<Company[]>;
  seenCompany: Maybe<Company[]>;
  seenRecruitment: Maybe<Recruitment[]>;
  appliedRecruitment: Maybe<ApplyRecruitmentType[]>;
  savedRecruitment: Maybe<Recruitment[]>;
  otpCode: Maybe<string>;
  otpExpires: Maybe<number>;
  otpCountDown: Maybe<number>;
  career: Maybe<CategoryLevel2[]>;
  isSeekingJob: Maybe<boolean>;
  tokenFirebaseNotification: Maybe<string>;
  slug: Maybe<string>;
  keyword: Maybe<string>;
  slugTitle: Maybe<string>;
  keywords: Maybe<string>;
  language: Maybe<string>;
  enabled: Maybe<boolean>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface ApplyRecruitmentType {
  recruitment: Maybe<Recruitment>;
  date: Maybe<string>;
}

export interface UserInfo {
  _id: Maybe<undefined>;
  clientId: Maybe<string>;
  provider: Maybe<string>;
  birthday: Maybe<string>;
  gender: Maybe<GenderType>;
  urlAvt: Maybe<CustomSizeImages>;
  firstName: Maybe<string>;
  lastName: Maybe<string>;
  displayName: Maybe<string>;
  company: Maybe<Company>;
  username: Maybe<string>;
  password: Maybe<string>;
  email: Maybe<string>;
  phoneNumber: Maybe<string>;
  permission: Maybe<string>;
  identityCard: Maybe<string>;
  code: Maybe<string>;
  title: Maybe<string>;
  history: Maybe<string>;
  province: Maybe<ProvinceType>;
  district: Maybe<DistrictType>;
  ward: Maybe<WardType>;
  street: Maybe<StreetType>;
  isVerified: Maybe<boolean>;
  isHot: Maybe<boolean>;
  point: Maybe<number>;
  rate: Maybe<string>;
  postedJob: Maybe<number>;
  subscribedCompany: Maybe<Company[]>;
  seenCompany: Maybe<Company[]>;
  seenRecruitment: Maybe<Recruitment[]>;
  appliedRecruitment: Maybe<ApplyRecruitmentType[]>;
  savedRecruitment: Maybe<Recruitment[]>;
  slug: Maybe<string>;
  slugTitle: Maybe<string>;
  keywords: Maybe<string>;
  keyword: Maybe<string>;
  language: Maybe<string>;
  otpCode: Maybe<string>;
  otpExpires: Maybe<number>;
  otpCountDown: Maybe<number>;
  career: Maybe<CategoryLevel2[]>;
  isSeekingJob: Maybe<boolean>;
  tokenFirebaseNotification: Maybe<string>;
  currentHashedRefreshToken: Maybe<string>;
  enabled: Maybe<boolean>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface Timeline {
  from?: string;
  to?: string;
}

export interface FilterUser {
  username?: string;
  displayName?: string;
  phoneNumber?: string;
  isHot?: boolean;
  permission?: string;
  email?: string;
  provinceId?: string;
  slugProvince?: string;
  slugCareer?: string;
  nameOrCode?: string;
  createdAt?: Timeline;
  career?: string;
  nameCompany?: string;
  isExistProfile?: boolean;
  isSeekingJob?: boolean;
}

export interface UpdateUserInput {
  provider?: string;
  companyName?: string;
  password?: string;
  phoneNumber?: string;
  username?: string;
  permission?: string;
  identityCard?: string;
  title?: string;
  history?: string;
  company?: string;
  email?: string;
  birthday?: string;
  gender?: GenderType;
  urlAvt?: File;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  locationTypeInput?: LocationTypeInput;
  isVerified?: boolean;
  isHot?: boolean;
  point?: number;
  language?: string;
  keywords?: string;
  enabled?: boolean;
  customSizeForUploadImage?: CustomSizeImagesInput;
  career?: string[];
  isSeekingJob?: boolean;
  tokenFirebaseNotification?: string;
}

export interface CreateUserInput {
  provider?: string;
  username?: string;
  phoneNumber: string;
  email: string;
  password: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  permission?: string;
  identityCard?: string;
  title?: string;
  company?: string;
  urlAvt?: File;
  birthday?: string;
  locationTypeInput?: LocationTypeInput;
  gender?: GenderType;
  point?: number;
  isVerified?: boolean;
  isHot?: boolean;
  keywords?: string;
  enabled?: boolean;
  customSizeForUploadImage?: CustomSizeImagesInput;
  career?: string[];
  isSeekingJob?: boolean;
  tokenFirebaseNotification?: string;
}

export interface CreateCandidateInput {
  username?: string;
  phoneNumber: string;
  email: string;
  password: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  permission?: string;
  identityCard?: string;
  title?: string;
  history?: string;
  urlAvt?: File;
  birthday?: string;
  locationTypeInput?: LocationTypeInput;
  gender?: GenderType;
  point?: number;
  isVerified?: boolean;
  isHot?: boolean;
  keywords?: string;
  enabled?: boolean;
  customSizeForUploadImage?: CustomSizeImagesInput;
  career?: string[];
  tokenFirebaseNotification?: string;
}

export enum GenderType {
  Male = 'male',
  Female = 'female',
}
export interface UserResults {
  results: Maybe<User[]>;
  totalCount: Maybe<number>;
}

export interface UserStatusResults {
  user: Maybe<User[]>;
  status: Maybe<string[]>;
}

export interface UserRecruitmentResults {
  results: Maybe<UserStatusResults>;
  totalCount: Maybe<number>;
}

export interface UpdatePasswordInput {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export interface WardType {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  code: Maybe<string>;
  districtCode: Maybe<string>;
  districtName: Maybe<string>;
  provinceCode: Maybe<string>;
  provinceName: Maybe<string>;
  slug: Maybe<string>;
  level: Maybe<string>;
  longitude: Maybe<number>;
  latitude: Maybe<number>;
  slugEn: Maybe<string>;
  nameEn: Maybe<string>;
  keyword: Maybe<string>;
}

export interface WardResults {
  wards: Maybe<WardType[]>;
  totalCount: Maybe<number>;
}

export interface WardInput {
  name?: string;
  code?: string;
  level?: string;
  districtCode?: string;
  districtName?: string;
  provinceCode?: string;
  provinceName?: string;
  longitude?: number;
  latitude?: number;
  slugEn?: string;
  nameEn?: string;
}

export interface WorkLocation {
  _id: Maybe<undefined>;
  name: Maybe<string>;
  province: Maybe<ProvinceType>;
  location: Maybe<string>;
  company: Maybe<Company>;
  createdAt: Maybe<string>;
  updatedAt: Maybe<string>;
}

export interface WorkLocationCreateInput {
  name?: string;
  province?: string;
  location?: string;
  company: string;
}

export interface WorkLocationUpdateInput {
  name?: string;
  province?: string;
  location?: string;
  company?: string;
}

export interface WorkLocationResults {
  results: Maybe<WorkLocation[]>;
  totalCount: Maybe<number>;
}

export interface RefreshTokenArgs {}

export interface GetAllAboutUsArgs {
  page?: number;
  size?: number;
}

export interface GetAboutUsByIdArgs {
  id: string;
}

export interface GetAboutUsByUserArgs {
  id: string;
}

export interface GetAdsAllArgs {
  filterAds?: FilterAds;
}

export interface GetAdsAllByLocationArgs {
  displayLocation: string;
}

export interface GetAdsByIdArgs {
  id: string;
}

export interface GetAllBenefitArgs {
  filterBenefit?: FilterBenefit;
  page?: number;
  size?: number;
}

export interface GetBenefitByIdArgs {
  id: string;
}

export interface GetAllCareerCounselingArgs {
  filterCareerCounseling?: FilterCareerCounseling;
  page?: number;
  size?: number;
}

export interface GetCareerCounselingByIdArgs {
  id: string;
}

export interface GetCareerCounselingCategoryArgs {}

export interface GetCareerCounselingTagsArgs {}

export interface GetCareerCounselingBySlugArgs {
  slug: string;
}

export interface GetAllCategoryLevel1Args {
  filterCategoryLevel1?: FilterCategoryLevel1;
  page?: number;
  size?: number;
}

export interface GetCategoryLevel1ByIdArgs {
  id: string;
}

export interface GetAllCategoryLevel2Args {
  filterCategoryLevel2?: FilterCategoryLevel2;
  page?: number;
  size?: number;
}

export interface GetCategoryLevel2ByIdArgs {
  id: string;
}

export interface GetAllCategoryArgs {
  filterCategory?: FilterCategory;
  page?: number;
  size?: number;
}

export interface GetCategoryByIdArgs {
  id: string;
}

export interface GetCompaniesArgs {
  keyword?: string;
  filterCompany?: FilterCompany;
  page?: number;
  size?: number;
}

export interface GetCompanyByIdArgs {
  id: string;
}

export interface GetIsHotCompanyArgs {
  filterCompany?: FilterCompany;
  page?: number;
  size?: number;
}

export interface GetCompanyBySlugArgs {
  slug: string;
}

export interface GetAllContactArgs {}

export interface GetContactByIdArgs {
  id: string;
}

export interface GetContentWebsiteByIdArgs {
  id: string;
}

export interface GetAllContentWebsiteArgs {
  filterContentWebsite?: FilterContentWebsite;
  page?: number;
  size?: number;
}

export interface GetDistrictsArgs {
  name?: string;
  page?: number;
  size?: number;
}

export interface GetDistrictByIdArgs {
  id: string;
}

export interface GetDistrictsByProvinceArgs {
  provinceCode?: string;
  districtName?: string;
  page?: number;
  size?: number;
}

export interface GetEvaluateByUserArgs {
  userId: string;
}

export interface GetEvaluateByIdArgs {
  id: string;
}

export interface GetAllEvaluateArgs {
  page?: number;
  size?: number;
}

export interface GetEvaluateByEvaluatorArgs {
  evaluatorId: string;
  page?: number;
  size?: number;
}

export interface GetEvaluateSeenByEmployerArgs {
  id: string;
  employerId: string;
}

export interface GetCompanyIdOfEvaluatorArgs {}

export interface GetAllInvitationApplyArgs {
  filterInvitationApply?: FilterInvitationApply;
  page?: number;
  size?: number;
}

export interface GetInvitationApplyByIdArgs {
  id?: string;
}

export interface GetAllJobLevelArgs {}

export interface GetJobLevelByIdArgs {
  id: string;
}

export interface GetAllJobTypeArgs {
  filterJobType?: FilterJobType;
  page?: number;
  size?: number;
}

export interface GetJobTypeByIdArgs {
  id: string;
}

export interface GetAllKeywordArgs {
  filterKeyword?: FilterKeyword;
  page?: number;
  size?: number;
}

export interface GetKeywordByIdArgs {
  id: string;
}

export interface GetMostSearchKeywordArgs {}

export interface GetLevelPriceByIdArgs {
  id: string;
}

export interface FilterLevelPriceArgs {
  filterLevelPrice?: FilterLevelPrice;
  page?: number;
  size?: number;
}

export interface GetAllNotifySettingArgs {
  filterNotifySetting?: FilterNotifySetting;
  page?: number;
  size?: number;
}

export interface GetNotifySettingByIdArgs {
  id: string;
}

export interface GetAllNotifyByAdminArgs {
  filterNotify?: FilterNotify;
  page?: number;
  size?: number;
}

export interface GetNotifyByIdArgs {
  id: string;
}

export interface GetNotifyByUserArgs {
  userId: string;
  page?: number;
  size?: number;
}

export interface GetPagesByIdArgs {
  id?: string;
}

export interface GetPagesBySlugArgs {
  slug?: string;
}

export interface GetAllPagesArgs {
  page?: number;
  size?: number;
  filterPages?: FilterPages;
}

export interface GetPointSettingArgs {}

export interface GetAllPositionArgs {
  filterPosition?: FilterPosition;
  page?: number;
  size?: number;
}

export interface GetPositionByIdArgs {
  id: string;
}

export interface GetProvincesArgs {
  name?: string;
  page?: number;
  size?: number;
}

export interface GetProvinceByIdArgs {
  id: string;
}

export interface GetProvincesByCountryArgs {
  name?: string;
  countryCode?: string;
  page?: number;
  size?: number;
}

export interface GetAllRatingsArgs {
  filterRating?: FilterRating;
  page?: number;
  size?: number;
}

export interface GetRatingByIdArgs {
  id?: string;
}

export interface GetRatingByUserArgs {
  userId: string;
}

export interface GetAllRecordArgs {
  filterRecord?: FilterRecord;
  page?: number;
  size?: number;
}

export interface GetRecordByIdArgs {
  id: string;
}

export interface GetRecordByUserArgs {
  userId: string;
}

export interface GetRecordSeenByEmployerArgs {
  employerId: string;
  recordId: string;
}

export interface GetOverViewArgs {}

export interface CheckRecordUserExistArgs {}

export interface GetAllRecruitmentLanguageArgs {}

export interface GetRecruitmentLanguageByIdArgs {
  id: string;
}

export interface GetAllRecruitmentArgs {
  keyword?: string;
  filterRecruitment?: FilterRecruitment;
  page?: number;
  size?: number;
}

export interface GetRecruitmentByIdArgs {
  id: string;
}

export interface GetRecruitmentBySlugArgs {
  slug: string;
}

export interface GetRecruitmentByCompanyArgs {
  companyId: string;
}

export interface GetRecruitmentByUserArgs {
  userId: string;
}

export interface GetRecruitmentNewsByIdArgs {
  id: string;
}

export interface GetRecruitmentTypeArgs {}

export interface GetRecruitmentPositionByTypeArgs {
  type: string;
}

export interface GetRecruitmentAppliedUserArgs {
  id: string;
  page?: number;
  size?: number;
}

export interface GetRecruitmentViewedUserArgs {
  id: string;
  page?: number;
  size?: number;
}

export interface GetRecruitmentApprovedUserArgs {
  id: string;
  page?: number;
  size?: number;
}

export interface GetBestRecruitmentArgs {
  page?: number;
  size?: number;
}

export interface GetUserByRecruitmentArgs {
  idRecruitment?: string;
  page?: number;
  size?: number;
  createdAt?: Timeline;
}

export interface GetUserStatusViewByRecruitmentArgs {
  idRecruitment?: string;
  page?: number;
  size?: number;
  createdAt?: Timeline;
}

export interface GetAllRequestReviewArgs {
  filterRequestReview?: FilterRequestReview;
  page?: number;
  size?: number;
}

export interface GetRequestReviewByIdArgs {
  id?: string;
}

export interface GetAllScheduleInterviewArgs {
  filterScheduleInterview?: FilterScheduleInterview;
  page?: number;
  size?: number;
}

export interface GetScheduleInterviewByIdArgs {
  id?: string;
}

export interface GetSeoArgs {
  language: string;
}

export interface GetAllServicesArgs {
  filterServices?: FilterServices;
  page?: number;
  size?: number;
}

export interface GetServicesByIdArgs {
  id: string;
}

export interface GetStreetsArgs {
  filterStreetType?: FilterStreetType;
  page?: number;
  size?: number;
}

export interface GetStreetByIdArgs {
  id: string;
}

export interface GetStreetsByWardArgs {
  wardId: string;
  page?: number;
  size?: number;
}

export interface GetAllTagArgs {
  filterTag?: FilterTag;
  page?: number;
  size?: number;
}

export interface GetTagByIdArgs {
  id: string;
}

export interface GetTypesByCodeArgs {
  code: string;
  language?: string;
}

export interface GetTypesByIdArgs {
  id: string;
}

export interface GetTypeBySlugAndCodeArgs {
  slug: string;
  code: string;
}

export interface GetTypeByValueAndCodeArgs {
  value: string;
  code: string;
}

export interface IsExistPasswordAndPhoneArgs {
  id?: string;
}

export interface IsExistPhoneNumberArgs {
  phoneNumber: string;
}

export interface IsExistEmailArgs {
  email: string;
}

export interface GetAllUsersArgs {
  filterUser?: FilterUser;
  page?: number;
  size?: number;
}

export interface GetUserByIdArgs {
  id: string;
}

export interface GetAllUserHasPermissionsArgs {
  permissions: string[];
  page?: number;
  size?: number;
  filterUser?: FilterUser;
}

export interface GetIdByPhoneNumberArgs {
  phoneNumber: string;
}

export interface CheckProfileUserExistArgs {}

export interface GetAppliedRecruitmentByUserIdArgs {
  userId?: string;
}

export interface GetSavedRecruitmentByUserIdArgs {
  userId?: string;
}

export interface RefreshProfileArgs {}

export interface GetWardsArgs {
  name?: string;
  page?: number;
  size?: number;
}

export interface GetWardByIdArgs {
  id: string;
}

export interface GetWardsByDistrictArgs {
  districtCode?: string;
  wardName?: string;
  page?: number;
  size?: number;
}

export interface GetAllWorkLocationArgs {}

export interface GetWorkLocationByIdArgs {
  id: string;
}

export interface GetWorkLocationByCompanyArgs {
  companyId?: string;
  page?: number;
  size?: number;
}

export interface LoginArgs {
  user: LoginUserInput;
}

export interface SendOtpVoiceArgs {
  phoneNumber: string;
}

export interface RegisterOtpVoiceArgs {
  input: RegisterOptInput;
}

export interface VerifyOtpVoiceArgs {
  input: VerifyOtpInput;
}

export interface VerifyOtpResetPasswordArgs {
  input: VerifyOtpInput;
}

export interface ResetPasswordOtpVoiceArgs {
  input: ResetPasswordOtpInput;
}

export interface CreateAboutUsArgs {
  aboutUsCreateInput: AboutUsCreateInput;
}

export interface UpdateAboutUsArgs {
  id: string;
  aboutUsUpdateInput: AboutUsUpdateInput;
}

export interface DeleteAboutUsArgs {
  id: string;
}

export interface DeleteAllAboutUsArgs {}

export interface CreateAdsArgs {
  createAdsInput: CreateAdsInput;
}

export interface UpdateAdsArgs {
  fieldsToUpdate: UpdateAdsInput;
  id: string;
}

export interface RemoveAdsArgs {
  id: string;
}

export interface CreateBenefitArgs {
  benefitInput: BenefitInput;
}

export interface UpdateBenefitArgs {
  id: string;
  benefitInput: BenefitInput;
}

export interface DeleteBenefitArgs {
  id: string;
}

export interface DeleteAllBenefitArgs {}

export interface CreateCareerCounselingArgs {
  careerCounselingCreateInput: CareerCounselingCreateInput;
}

export interface UpdateCareerCounselingArgs {
  id: string;
  careerCounselingUpdateInput?: CareerCounselingUpdateInput;
}

export interface DeleteCareerCounselingArgs {
  id: string;
}

export interface CreateCategoryLevel1Args {
  categoryLevel1Input: CategoryLevel1Input;
}

export interface UpdateCategoryLevel1Args {
  id: string;
  categoryLevel1Input: CategoryLevel1Input;
}

export interface DeleteCategoryLevel1Args {
  id: string;
}

export interface DeleteAllCategoryLevel1Args {}

export interface CreateCategoryLevel2Args {
  categoryLevel2Input: CategoryLevel2Input;
}

export interface UpdateCategoryLevel2Args {
  id: string;
  categoryLevel2Input: CategoryLevel2Input;
}

export interface DeleteCategoryLevel2Args {
  id: string;
}

export interface DeleteAllCategoryLevel2Args {}

export interface CreateCategoryArgs {
  categoryInput: CategoryInput;
}

export interface UpdateCategoryArgs {
  id: string;
  categoryInput: CategoryInput;
}

export interface DeleteCategoryArgs {
  id: string;
}

export interface DeleteAllCategoryArgs {}

export interface CreateCompanyArgs {
  companyCreateInput: CompanyCreateInput;
}

export interface UpdateCompanyArgs {
  id: string;
  companyUpdateInput: CompanyUpdateInput;
}

export interface DeleteCompanyArgs {
  id: string;
}

export interface DeleteAllCompanyArgs {}

export interface SetApprovedCompanyArgs {
  id: string;
  value: boolean;
}

export interface SetIsHotCompanyArgs {
  id: string;
  value: boolean;
}

export interface UpdateCompanyProvinceArgs {}

export interface CreateContactArgs {
  contactInput: ContactInput;
}

export interface DeleteContactArgs {
  id: string;
}

export interface DeleteAllContactArgs {}

export interface CreateContentWebsiteArgs {
  contentWebsiteCreateInput: ContentWebsiteCreateInput;
}

export interface DeleteContentWebsiteByIdArgs {
  id: string;
}

export interface UpdateContentWebsiteArgs {
  fieldsToUpdate: ContentWebsiteUpdateInput;
  id: string;
}

export interface CreateDistrictArgs {
  districtInput: DistrictInput;
}

export interface UpdateDistrictArgs {
  id: string;
  districtInput: DistrictInput;
}

export interface DeleteDistrictArgs {
  id: string;
}

export interface CreateEvaluateArgs {
  evaluateCreateInput: EvaluateCreateInput;
}

export interface UpdateEvaluateArgs {
  id: string;
  evaluateUpdateInput: EvaluateUpdateInput;
}

export interface CreateInvitationApplyArgs {
  input: InvitationApplyInput;
}

export interface UpdateInvitationApplyArgs {
  id: string;
  input?: InvitationApplyInput;
}

export interface DeleteInvitationApplyArgs {
  id: string;
}

export interface ConfirmTheInvitationArgs {
  id: string;
}

export interface CreateJobLevelArgs {
  jobLevelInput: JobLevelInput;
}

export interface UpdateJobLevelArgs {
  id: string;
  jobLevelInput: JobLevelInput;
}

export interface DeleteJobLevelArgs {
  id: string;
}

export interface DeleteAllJobLevelArgs {}

export interface CreateJobTypeArgs {
  jobTypeInput: JobTypeInput;
}

export interface UpdateJobTypeArgs {
  id: string;
  jobTypeInput: JobTypeInput;
}

export interface DeleteJobTypeArgs {
  id: string;
}

export interface DeleteAllJobTypeArgs {}

export interface CreateKeywordArgs {
  keywordInput: KeywordInput;
}

export interface UpdateKeywordArgs {
  id: string;
  keywordInput: KeywordInput;
}

export interface DeleteKeywordArgs {
  id: string;
}

export interface DeleteAllKeywordArgs {}

export interface CreateLevelPriceArgs {
  createLevelPriceInput?: CreateLevelPriceInput;
}

export interface UpdateLevelPriceArgs {
  fieldsToUpdate?: UpdateLevelPriceInput;
  id?: string;
}

export interface RemoveLevelPriceArgs {
  id: string;
}

export interface CreateNotifySettingArgs {
  notifySettingInput: NotifySettingInput;
}

export interface UpdateNotifySettingArgs {
  id: string;
  notifySettingInput: NotifySettingInput;
}

export interface DeleteNotifySettingArgs {
  id: string;
}

export interface DeleteAllNotifySettingArgs {}

export interface CreateNotifyArgs {
  notifyCreateInput: NotifyCreateInput;
}

export interface UpdateNotifyArgs {
  id: string;
  notifyUpdateInput: NotifyUpdateInput;
}

export interface DeleteNotifyArgs {
  id: string;
}

export interface SetSeenForNotifyArgs {
  userId: string;
}

export interface SetOneSeenNotifyArgs {
  notifyId: string;
  userId: string;
}

export interface CreatePagesArgs {
  createPagesInput?: CreatePagesInput;
}

export interface UpdatePagesArgs {
  fieldsToUpdate?: UpdatePagesInput;
  id?: string;
}

export interface RemovePagesArgs {
  id: string;
}

export interface UpdatePointSettingArgs {
  pointSettingInput: PointSettingInput;
}

export interface CreatePositionArgs {
  positionInput: PositionInput;
}

export interface UpdatePositionArgs {
  id: string;
  positionInput: PositionInput;
}

export interface DeletePositionArgs {
  id: string;
}

export interface DeleteAllPositionArgs {}

export interface CreateProvinceArgs {
  provinceInput: ProvinceInput;
}

export interface UpdateProvinceArgs {
  id: string;
  provinceInput: ProvinceInput;
}

export interface DeleteProvinceArgs {
  id: string;
}

export interface CreateRatingArgs {
  ratingCreateInput: RatingCreateInput;
}

export interface UpdateRatingArgs {
  id: string;
  ratingUpdateInput: RatingUpdateInput;
}

export interface DeleteRatingByIdArgs {
  id: string;
}

export interface DeleteAllRatingArgs {}

export interface CreateRecordArgs {
  recordCreateInput: RecordCreateInput;
}

export interface UpdateRecordArgs {
  id: string;
  recordUpdateInput: RecordUpdateInput;
}

export interface DeleteRecordByIdArgs {
  id: string;
}

export interface DeleteAllRecordArgs {}

export interface CreateRecruitmentLanguageArgs {
  recruitmentLanguageInput: RecruitmentLanguageInput;
}

export interface UpdateRecruitmentLanguageArgs {
  id: string;
  recruitmentLanguageInput: RecruitmentLanguageInput;
}

export interface DeleteRecruitmentLanguageArgs {
  id: string;
}

export interface DeleteAllRecruitmentLanguageArgs {}

export interface CreateRecruitmentArgs {
  recruitmentCreateInput: RecruitmentCreateInput;
}

export interface UpdateRecruitmentArgs {
  id: string;
  recruitmentUpdateInput: RecruitmentUpdateInput;
}

export interface DeleteRecruitmentArgs {
  id: string;
}

export interface DeleteAllRecruitmentArgs {}

export interface SetApprovedRecruitmentArgs {
  id: string;
}

export interface SetRecruitmentAppliedUserToApprovedArgs {
  id: string;
  userId: string;
}

export interface RemoveAppliedUserRecruitmentArgs {
  recruitmentId: string;
  userId: string;
}

export interface CreateRequestReviewArgs {
  createRequestReviewInput?: CreateRequestReviewInput;
}

export interface UpdateRequestReviewArgs {
  fieldsToUpdate: UpdateRequestReviewInput;
  id?: string;
}

export interface RemoveRequestReviewArgs {
  id: string;
}

export interface CreateScheduleInterviewArgs {
  input: ScheduleInterviewInput;
}

export interface UpdateScheduleInterviewArgs {
  id: string;
  input?: ScheduleInterviewInput;
}

export interface DeleteScheduleInterviewArgs {
  id: string;
}

export interface ConfirmTheScheduleInterviewArgs {
  id: string;
}

export interface CancelTheScheduleInterviewArgs {
  id: string;
}

export interface UpdateSeoArgs {
  fieldsToUpdate: UpdateSeoInput;
}

export interface CreateServicesArgs {
  createServicesInput: CreateServicesInput;
}

export interface UpdateServicesArgs {
  id: string;
  updateServicesInput: UpdateServicesInput;
}

export interface RemoveServicesArgs {
  id: string;
}

export interface CreateStreetArgs {
  streetTypeInput: StreetTypeInput;
}

export interface UpdateStreetArgs {
  id: string;
  streetTypeInput: StreetTypeInput;
}

export interface DeleteStreetArgs {
  id: string;
}

export interface CreateTagArgs {
  tagInput: TagInput;
}

export interface UpdateTagArgs {
  id: string;
  tagInput: TagInput;
}

export interface DeleteTagArgs {
  id: string;
}

export interface DeleteAllTagArgs {}

export interface CreateTypesArgs {
  createTypesInput: CreateTypesInput;
}

export interface UpdateTypesArgs {
  fieldsToUpdate: UpdateTypesInput;
  id: string;
}

export interface RemoveTypesArgs {
  id: string;
}

export interface UpdateNewPasswordArgs {
  id: string;
  phoneNumber: string;
  password: string;
}

export interface UpdateUserPasswordArgs {
  updatePasswordInput: UpdatePasswordInput;
}

export interface UpdateUserProfileByAdminArgs {
  id: string;
  password: string;
  updateUserInput: UpdateUserInput;
}

export interface UpdateUserEmailPasswordArgs {
  idUser?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserProfileArgs {
  updateUserInput: UpdateUserInput;
}

export interface CreateUserByAdminArgs {
  createUserInput?: CreateUserInput;
}

export interface CreateEmployerArgs {
  createUserInput: CreateUserInput;
}

export interface CreateEmployerWithEmptyCompanyArgs {
  createUserInput: CreateUserInput;
}

export interface CreateCandidateArgs {
  createUserInput: CreateCandidateInput;
}

export interface DeleteUserArgs {
  id: string;
}

export interface SetPermissionByAdminArgs {
  id: string;
  permission: string;
}

export interface UpdateUserByAdminArgs {
  id: string;
  updateUserInput: UpdateUserInput;
}

export interface SetEnabledUserArgs {
  id: string;
  enabled: boolean;
}

export interface SetIsHotUserArgs {
  id: string;
  isHot?: boolean;
}

export interface SetSubscribedCompanyArgs {
  userId: string;
  companyId: string;
}

export interface SetUnSubscribedCompanyArgs {
  userId: string;
  companyId: string;
}

export interface SetSeenRecruitmentArgs {
  userId: string;
  recruitmentId: string;
}

export interface SetSeenCompanyArgs {
  userId: string;
  companyId: string;
}

export interface SetAppliedRecruitmentArgs {
  userId: string;
  recruitmentId: string;
}

export interface SetSavedRecruitmentArgs {
  userId: string;
  recruitmentId: string;
}

export interface ResetPasswordArgs {
  username: string;
  newPassword: string;
  oldPassword: string;
}

export interface AdminGivePointToEmployerArgs {
  adminId: string;
  employerId: string;
  point: number;
}

export interface SetIsVerifiedUserArgs {
  id: string;
  isVerified?: boolean;
}

export interface RemoveSavedRecruitmentUserArgs {
  userId: string;
  recruitmentId: string;
}

export interface TurnOnSeekingJobArgs {}

export interface TurnOffSeekingJobArgs {}

export interface CreateWardArgs {
  wardInput: WardInput;
}

export interface UpdateWardArgs {
  id: string;
  wardInput: WardInput;
}

export interface DeleteWardArgs {
  id: string;
}

export interface CreateWorkLocationArgs {
  workLocationInput: WorkLocationCreateInput;
}

export interface UpdateWorkLocationArgs {
  id: string;
  workLocationInput: WorkLocationUpdateInput;
}

export interface DeleteWorkLocationArgs {
  id: string;
}

export interface DeleteAllWorkLocationArgs {}

export const useRefreshToken = (
  fields: GenFields<JwtPayload>,
  options?: QueryHookOptions<{refreshToken: JwtPayload}>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query refreshToken  {
        refreshToken {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{refreshToken: JwtPayload}>(query, options);
};

export const useGetAllAboutUs = (
  fields: GenFields<AboutUsResults>,
  options?: QueryHookOptions<
    {getAllAboutUs: AboutUsResults},
    GetAllAboutUsArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllAboutUs ($page: Int,$size: Int) {
        getAllAboutUs(page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllAboutUs: AboutUsResults}, GetAllAboutUsArgs>(
    query,
    options,
  );
};

export const useGetAboutUsById = (
  fields: GenFields<AboutUs>,
  options?: QueryHookOptions<{getAboutUsById: AboutUs}, GetAboutUsByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAboutUsById ($id: String!) {
        getAboutUsById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAboutUsById: AboutUs}, GetAboutUsByIdArgs>(
    query,
    options,
  );
};

export const useGetAboutUsByUser = (
  fields: GenFields<AboutUs>,
  options?: QueryHookOptions<{getAboutUsByUser: AboutUs}, GetAboutUsByUserArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAboutUsByUser ($id: String!) {
        getAboutUsByUser(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAboutUsByUser: AboutUs}, GetAboutUsByUserArgs>(
    query,
    options,
  );
};

export const useGetAdsAll = (
  fields: GenFields<Ads[]>,
  options?: QueryHookOptions<{getAdsAll: Ads[]}, GetAdsAllArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAdsAll ($filterAds: FilterAds) {
        getAdsAll(filterAds: $filterAds) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAdsAll: Ads[]}, GetAdsAllArgs>(query, options);
};

export const useGetAdsAllByLocation = (
  fields: GenFields<Ads[]>,
  options?: QueryHookOptions<
    {getAdsAllByLocation: Ads[]},
    GetAdsAllByLocationArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAdsAllByLocation ($displayLocation: String!) {
        getAdsAllByLocation(displayLocation: $displayLocation) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAdsAllByLocation: Ads[]}, GetAdsAllByLocationArgs>(
    query,
    options,
  );
};

export const useGetAdsById = (
  fields: GenFields<Ads>,
  options?: QueryHookOptions<{getAdsById: Ads}, GetAdsByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAdsById ($id: String!) {
        getAdsById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAdsById: Ads}, GetAdsByIdArgs>(query, options);
};

export const useGetAllBenefit = (
  fields: GenFields<BenefitResults>,
  options?: QueryHookOptions<
    {getAllBenefit: BenefitResults},
    GetAllBenefitArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllBenefit ($filterBenefit: FilterBenefit,$page: Int,$size: Int) {
        getAllBenefit(filterBenefit: $filterBenefit,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllBenefit: BenefitResults}, GetAllBenefitArgs>(
    query,
    options,
  );
};

export const useGetBenefitById = (
  fields: GenFields<Benefit>,
  options?: QueryHookOptions<{getBenefitById: Benefit}, GetBenefitByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getBenefitById ($id: String!) {
        getBenefitById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getBenefitById: Benefit}, GetBenefitByIdArgs>(
    query,
    options,
  );
};

export const useGetAllCareerCounseling = (
  fields: GenFields<CareerCounselingResults>,
  options?: QueryHookOptions<
    {getAllCareerCounseling: CareerCounselingResults},
    GetAllCareerCounselingArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllCareerCounseling ($filterCareerCounseling: FilterCareerCounseling,$page: Int,$size: Int) {
        getAllCareerCounseling(filterCareerCounseling: $filterCareerCounseling,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllCareerCounseling: CareerCounselingResults},
    GetAllCareerCounselingArgs
  >(query, options);
};

export const useGetCareerCounselingById = (
  fields: GenFields<CareerCounseling>,
  options?: QueryHookOptions<
    {getCareerCounselingById: CareerCounseling},
    GetCareerCounselingByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getCareerCounselingById ($id: String!) {
        getCareerCounselingById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getCareerCounselingById: CareerCounseling},
    GetCareerCounselingByIdArgs
  >(query, options);
};

export const useGetCareerCounselingCategory = (
  fields: GenFields<Category[]>,
  options?: QueryHookOptions<{getCareerCounselingCategory: Category[]}>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getCareerCounselingCategory  {
        getCareerCounselingCategory {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getCareerCounselingCategory: Category[]}>(
    query,
    options,
  );
};

export const useGetCareerCounselingTags = (
  fields: GenFields<Tag[]>,
  options?: QueryHookOptions<{getCareerCounselingTags: Tag[]}>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getCareerCounselingTags  {
        getCareerCounselingTags {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getCareerCounselingTags: Tag[]}>(query, options);
};

export const useGetCareerCounselingBySlug = (
  fields: GenFields<CareerCounseling>,
  options?: QueryHookOptions<
    {getCareerCounselingBySlug: CareerCounseling},
    GetCareerCounselingBySlugArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getCareerCounselingBySlug ($slug: String!) {
        getCareerCounselingBySlug(slug: $slug) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getCareerCounselingBySlug: CareerCounseling},
    GetCareerCounselingBySlugArgs
  >(query, options);
};

export const useGetAllCategoryLevel1 = (
  fields: GenFields<CategoryLevel1Results>,
  options?: QueryHookOptions<
    {getAllCategoryLevel1: CategoryLevel1Results},
    GetAllCategoryLevel1Args
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllCategoryLevel1 ($filterCategoryLevel1: FilterCategoryLevel1,$page: Int,$size: Int) {
        getAllCategoryLevel1(filterCategoryLevel1: $filterCategoryLevel1,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllCategoryLevel1: CategoryLevel1Results},
    GetAllCategoryLevel1Args
  >(query, options);
};

export const useGetCategoryLevel1ById = (
  fields: GenFields<CategoryLevel1>,
  options?: QueryHookOptions<
    {getCategoryLevel1ById: CategoryLevel1},
    GetCategoryLevel1ByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getCategoryLevel1ById ($id: String!) {
        getCategoryLevel1ById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getCategoryLevel1ById: CategoryLevel1},
    GetCategoryLevel1ByIdArgs
  >(query, options);
};

export const useGetAllCategoryLevel2 = (
  fields: GenFields<CategoryLevel2Results>,
  options?: QueryHookOptions<
    {getAllCategoryLevel2: CategoryLevel2Results},
    GetAllCategoryLevel2Args
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllCategoryLevel2 ($filterCategoryLevel2: FilterCategoryLevel2,$page: Int,$size: Int) {
        getAllCategoryLevel2(filterCategoryLevel2: $filterCategoryLevel2,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllCategoryLevel2: CategoryLevel2Results},
    GetAllCategoryLevel2Args
  >(query, options);
};

export const useGetCategoryLevel2ById = (
  fields: GenFields<CategoryLevel2>,
  options?: QueryHookOptions<
    {getCategoryLevel2ById: CategoryLevel2},
    GetCategoryLevel2ByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getCategoryLevel2ById ($id: String!) {
        getCategoryLevel2ById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getCategoryLevel2ById: CategoryLevel2},
    GetCategoryLevel2ByIdArgs
  >(query, options);
};

export const useGetAllCategory = (
  fields: GenFields<CategoryResults>,
  options?: QueryHookOptions<
    {getAllCategory: CategoryResults},
    GetAllCategoryArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllCategory ($filterCategory: FilterCategory,$page: Int,$size: Int) {
        getAllCategory(filterCategory: $filterCategory,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllCategory: CategoryResults}, GetAllCategoryArgs>(
    query,
    options,
  );
};

export const useGetCategoryById = (
  fields: GenFields<Category>,
  options?: QueryHookOptions<{getCategoryById: Category}, GetCategoryByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getCategoryById ($id: String!) {
        getCategoryById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getCategoryById: Category}, GetCategoryByIdArgs>(
    query,
    options,
  );
};

export const useGetCompanies = (
  fields: GenFields<CompanyResults>,
  options?: QueryHookOptions<{getCompanies: CompanyResults}, GetCompaniesArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getCompanies ($keyword: String,$filterCompany: FilterCompany,$page: Int,$size: Int) {
        getCompanies(keyword: $keyword,filterCompany: $filterCompany,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getCompanies: CompanyResults}, GetCompaniesArgs>(
    query,
    options,
  );
};

export const useGetCompanyById = (
  fields: GenFields<Company>,
  options?: QueryHookOptions<{getCompanyById: Company}, GetCompanyByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getCompanyById ($id: String!) {
        getCompanyById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getCompanyById: Company}, GetCompanyByIdArgs>(
    query,
    options,
  );
};

export const useGetIsHotCompany = (
  fields: GenFields<CompanyResults>,
  options?: QueryHookOptions<
    {getIsHotCompany: CompanyResults},
    GetIsHotCompanyArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getIsHotCompany ($filterCompany: FilterCompany,$page: Int,$size: Int) {
        getIsHotCompany(filterCompany: $filterCompany,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getIsHotCompany: CompanyResults}, GetIsHotCompanyArgs>(
    query,
    options,
  );
};

export const useGetCompanyBySlug = (
  fields: GenFields<Company>,
  options?: QueryHookOptions<{getCompanyBySlug: Company}, GetCompanyBySlugArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getCompanyBySlug ($slug: String!) {
        getCompanyBySlug(slug: $slug) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getCompanyBySlug: Company}, GetCompanyBySlugArgs>(
    query,
    options,
  );
};

export const useGetAllContact = (
  fields: GenFields<ContactResults>,
  options?: QueryHookOptions<{getAllContact: ContactResults}>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllContact  {
        getAllContact {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllContact: ContactResults}>(query, options);
};

export const useGetContactById = (
  fields: GenFields<Contact>,
  options?: QueryHookOptions<{getContactById: Contact}, GetContactByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getContactById ($id: String!) {
        getContactById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getContactById: Contact}, GetContactByIdArgs>(
    query,
    options,
  );
};

export const useGetContentWebsiteById = (
  fields: GenFields<ContentWebsite>,
  options?: QueryHookOptions<
    {getContentWebsiteById: ContentWebsite},
    GetContentWebsiteByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getContentWebsiteById ($id: String!) {
        getContentWebsiteById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getContentWebsiteById: ContentWebsite},
    GetContentWebsiteByIdArgs
  >(query, options);
};

export const useGetAllContentWebsite = (
  fields: GenFields<ContentWebsiteResults>,
  options?: QueryHookOptions<
    {getAllContentWebsite: ContentWebsiteResults},
    GetAllContentWebsiteArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllContentWebsite ($filterContentWebsite: FilterContentWebsite,$page: Int,$size: Int) {
        getAllContentWebsite(filterContentWebsite: $filterContentWebsite,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllContentWebsite: ContentWebsiteResults},
    GetAllContentWebsiteArgs
  >(query, options);
};

export const useGetDistricts = (
  fields: GenFields<DistrictResults>,
  options?: QueryHookOptions<{getDistricts: DistrictResults}, GetDistrictsArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getDistricts ($name: String,$page: Int,$size: Int) {
        getDistricts(name: $name,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getDistricts: DistrictResults}, GetDistrictsArgs>(
    query,
    options,
  );
};

export const useGetDistrictById = (
  fields: GenFields<DistrictType>,
  options?: QueryHookOptions<
    {getDistrictById: DistrictType},
    GetDistrictByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getDistrictById ($id: String!) {
        getDistrictById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getDistrictById: DistrictType}, GetDistrictByIdArgs>(
    query,
    options,
  );
};

export const useGetDistrictsByProvince = (
  fields: GenFields<DistrictResults>,
  options?: QueryHookOptions<
    {getDistrictsByProvince: DistrictResults},
    GetDistrictsByProvinceArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getDistrictsByProvince ($provinceCode: String,$districtName: String,$page: Int,$size: Int) {
        getDistrictsByProvince(provinceCode: $provinceCode,districtName: $districtName,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getDistrictsByProvince: DistrictResults},
    GetDistrictsByProvinceArgs
  >(query, options);
};

export const useGetEvaluateByUser = (
  fields: GenFields<Evaluate[]>,
  options?: QueryHookOptions<
    {getEvaluateByUser: Evaluate[]},
    GetEvaluateByUserArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getEvaluateByUser ($userId: String!) {
        getEvaluateByUser(userId: $userId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getEvaluateByUser: Evaluate[]}, GetEvaluateByUserArgs>(
    query,
    options,
  );
};

export const useGetEvaluateById = (
  fields: GenFields<Evaluate>,
  options?: QueryHookOptions<{getEvaluateById: Evaluate}, GetEvaluateByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getEvaluateById ($id: String!) {
        getEvaluateById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getEvaluateById: Evaluate}, GetEvaluateByIdArgs>(
    query,
    options,
  );
};

export const useGetAllEvaluate = (
  fields: GenFields<EvaluateResults>,
  options?: QueryHookOptions<
    {getAllEvaluate: EvaluateResults},
    GetAllEvaluateArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllEvaluate ($page: Int,$size: Int) {
        getAllEvaluate(page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllEvaluate: EvaluateResults}, GetAllEvaluateArgs>(
    query,
    options,
  );
};

export const useGetEvaluateByEvaluator = (
  fields: GenFields<EvaluateResults>,
  options?: QueryHookOptions<
    {getEvaluateByEvaluator: EvaluateResults},
    GetEvaluateByEvaluatorArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getEvaluateByEvaluator ($evaluatorId: String!,$page: Int,$size: Int) {
        getEvaluateByEvaluator(evaluatorId: $evaluatorId,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getEvaluateByEvaluator: EvaluateResults},
    GetEvaluateByEvaluatorArgs
  >(query, options);
};

export const useGetEvaluateSeenByEmployer = (
  fields: GenFields<Evaluate>,
  options?: QueryHookOptions<
    {getEvaluateSeenByEmployer: Evaluate},
    GetEvaluateSeenByEmployerArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getEvaluateSeenByEmployer ($id: String!,$employerId: String!) {
        getEvaluateSeenByEmployer(id: $id,employerId: $employerId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getEvaluateSeenByEmployer: Evaluate},
    GetEvaluateSeenByEmployerArgs
  >(query, options);
};

export const useGetCompanyIdOfEvaluator = (
  options?: QueryHookOptions<{getCompanyIdOfEvaluator: string[]}>,
) => {
  const query = gql`
    query getCompanyIdOfEvaluator {
      getCompanyIdOfEvaluator
    }
  `;
  return useLazyQuery<{getCompanyIdOfEvaluator: string[]}>(query, options);
};

export const useGetAllInvitationApply = (
  fields: GenFields<InvitationApplyResult>,
  options?: QueryHookOptions<
    {getAllInvitationApply: InvitationApplyResult},
    GetAllInvitationApplyArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllInvitationApply ($filterInvitationApply: FilterInvitationApply,$page: Int,$size: Int) {
        getAllInvitationApply(filterInvitationApply: $filterInvitationApply,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllInvitationApply: InvitationApplyResult},
    GetAllInvitationApplyArgs
  >(query, options);
};

export const useGetInvitationApplyById = (
  fields: GenFields<InvitationApply>,
  options?: QueryHookOptions<
    {getInvitationApplyById: InvitationApply},
    GetInvitationApplyByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getInvitationApplyById ($id: String) {
        getInvitationApplyById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getInvitationApplyById: InvitationApply},
    GetInvitationApplyByIdArgs
  >(query, options);
};

export const useGetAllJobLevel = (
  fields: GenFields<JobLevelResults>,
  options?: QueryHookOptions<{getAllJobLevel: JobLevelResults}>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllJobLevel  {
        getAllJobLevel {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllJobLevel: JobLevelResults}>(query, options);
};

export const useGetJobLevelById = (
  fields: GenFields<JobLevel>,
  options?: QueryHookOptions<{getJobLevelById: JobLevel}, GetJobLevelByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getJobLevelById ($id: String!) {
        getJobLevelById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getJobLevelById: JobLevel}, GetJobLevelByIdArgs>(
    query,
    options,
  );
};

export const useGetAllJobType = (
  fields: GenFields<JobTypeResults>,
  options?: QueryHookOptions<
    {getAllJobType: JobTypeResults},
    GetAllJobTypeArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllJobType ($filterJobType: FilterJobType,$page: Int,$size: Int) {
        getAllJobType(filterJobType: $filterJobType,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllJobType: JobTypeResults}, GetAllJobTypeArgs>(
    query,
    options,
  );
};

export const useGetJobTypeById = (
  fields: GenFields<JobType>,
  options?: QueryHookOptions<{getJobTypeById: JobType}, GetJobTypeByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getJobTypeById ($id: String!) {
        getJobTypeById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getJobTypeById: JobType}, GetJobTypeByIdArgs>(
    query,
    options,
  );
};

export const useGetAllKeyword = (
  fields: GenFields<KeywordResults>,
  options?: QueryHookOptions<
    {getAllKeyword: KeywordResults},
    GetAllKeywordArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllKeyword ($filterKeyword: FilterKeyword,$page: Int,$size: Int) {
        getAllKeyword(filterKeyword: $filterKeyword,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllKeyword: KeywordResults}, GetAllKeywordArgs>(
    query,
    options,
  );
};

export const useGetKeywordById = (
  fields: GenFields<Keyword>,
  options?: QueryHookOptions<{getKeywordById: Keyword}, GetKeywordByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getKeywordById ($id: String!) {
        getKeywordById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getKeywordById: Keyword}, GetKeywordByIdArgs>(
    query,
    options,
  );
};

export const useGetMostSearchKeyword = (
  fields: GenFields<Keyword[]>,
  options?: QueryHookOptions<{getMostSearchKeyword: Keyword[]}>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getMostSearchKeyword  {
        getMostSearchKeyword {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getMostSearchKeyword: Keyword[]}>(query, options);
};

export const useGetLevelPriceById = (
  fields: GenFields<LevelPrice>,
  options?: QueryHookOptions<
    {getLevelPriceById: LevelPrice},
    GetLevelPriceByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getLevelPriceById ($id: String!) {
        getLevelPriceById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getLevelPriceById: LevelPrice}, GetLevelPriceByIdArgs>(
    query,
    options,
  );
};

export const useFilterLevelPrice = (
  fields: GenFields<LevelPriceResult>,
  options?: QueryHookOptions<
    {filterLevelPrice: LevelPriceResult},
    FilterLevelPriceArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query filterLevelPrice ($filterLevelPrice: FilterLevelPrice,$page: Int,$size: Int) {
        filterLevelPrice(filterLevelPrice: $filterLevelPrice,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {filterLevelPrice: LevelPriceResult},
    FilterLevelPriceArgs
  >(query, options);
};

export const useGetAllNotifySetting = (
  fields: GenFields<NotifySettingResults>,
  options?: QueryHookOptions<
    {getAllNotifySetting: NotifySettingResults},
    GetAllNotifySettingArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllNotifySetting ($filterNotifySetting: FilterNotifySetting,$page: Int,$size: Int) {
        getAllNotifySetting(filterNotifySetting: $filterNotifySetting,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllNotifySetting: NotifySettingResults},
    GetAllNotifySettingArgs
  >(query, options);
};

export const useGetNotifySettingById = (
  fields: GenFields<NotifySetting>,
  options?: QueryHookOptions<
    {getNotifySettingById: NotifySetting},
    GetNotifySettingByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getNotifySettingById ($id: String!) {
        getNotifySettingById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getNotifySettingById: NotifySetting},
    GetNotifySettingByIdArgs
  >(query, options);
};

export const useGetAllNotifyByAdmin = (
  fields: GenFields<NotifyResults>,
  options?: QueryHookOptions<
    {getAllNotifyByAdmin: NotifyResults},
    GetAllNotifyByAdminArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllNotifyByAdmin ($filterNotify: FilterNotify,$page: Int,$size: Int) {
        getAllNotifyByAdmin(filterNotify: $filterNotify,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllNotifyByAdmin: NotifyResults},
    GetAllNotifyByAdminArgs
  >(query, options);
};

export const useGetNotifyById = (
  fields: GenFields<Notify>,
  options?: QueryHookOptions<{getNotifyById: Notify}, GetNotifyByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getNotifyById ($id: String!) {
        getNotifyById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getNotifyById: Notify}, GetNotifyByIdArgs>(
    query,
    options,
  );
};

export const useGetNotifyByUser = (
  fields: GenFields<Notify[]>,
  options?: QueryHookOptions<{getNotifyByUser: Notify[]}, GetNotifyByUserArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getNotifyByUser ($userId: String!,$page: Int,$size: Int) {
        getNotifyByUser(userId: $userId,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getNotifyByUser: Notify[]}, GetNotifyByUserArgs>(
    query,
    options,
  );
};

export const useGetPagesById = (
  fields: GenFields<Pages>,
  options?: QueryHookOptions<{getPagesById: Pages}, GetPagesByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getPagesById ($id: String) {
        getPagesById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getPagesById: Pages}, GetPagesByIdArgs>(query, options);
};

export const useGetPagesBySlug = (
  fields: GenFields<Pages>,
  options?: QueryHookOptions<{getPagesBySlug: Pages}, GetPagesBySlugArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getPagesBySlug ($slug: String) {
        getPagesBySlug(slug: $slug) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getPagesBySlug: Pages}, GetPagesBySlugArgs>(
    query,
    options,
  );
};

export const useGetAllPages = (
  fields: GenFields<PagesResult>,
  options?: QueryHookOptions<{getAllPages: PagesResult}, GetAllPagesArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllPages ($page: Int,$size: Int,$filterPages: FilterPages) {
        getAllPages(page: $page,size: $size,filterPages: $filterPages) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllPages: PagesResult}, GetAllPagesArgs>(
    query,
    options,
  );
};

export const useGetPointSetting = (
  fields: GenFields<PointSetting>,
  options?: QueryHookOptions<{getPointSetting: PointSetting}>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getPointSetting  {
        getPointSetting {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getPointSetting: PointSetting}>(query, options);
};

export const useGetAllPosition = (
  fields: GenFields<PositionResults>,
  options?: QueryHookOptions<
    {getAllPosition: PositionResults},
    GetAllPositionArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllPosition ($filterPosition: FilterPosition,$page: Int,$size: Int) {
        getAllPosition(filterPosition: $filterPosition,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllPosition: PositionResults}, GetAllPositionArgs>(
    query,
    options,
  );
};

export const useGetPositionById = (
  fields: GenFields<Position>,
  options?: QueryHookOptions<{getPositionById: Position}, GetPositionByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getPositionById ($id: String!) {
        getPositionById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getPositionById: Position}, GetPositionByIdArgs>(
    query,
    options,
  );
};

export const useGetProvinces = (
  fields: GenFields<ProvinceResults>,
  options?: QueryHookOptions<{getProvinces: ProvinceResults}, GetProvincesArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getProvinces ($name: String,$page: Int,$size: Int) {
        getProvinces(name: $name,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getProvinces: ProvinceResults}, GetProvincesArgs>(
    query,
    options,
  );
};

export const useGetProvinceById = (
  fields: GenFields<ProvinceType>,
  options?: QueryHookOptions<
    {getProvinceById: ProvinceType},
    GetProvinceByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getProvinceById ($id: String!) {
        getProvinceById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getProvinceById: ProvinceType}, GetProvinceByIdArgs>(
    query,
    options,
  );
};

export const useGetProvincesByCountry = (
  fields: GenFields<ProvinceResults>,
  options?: QueryHookOptions<
    {getProvincesByCountry: ProvinceResults},
    GetProvincesByCountryArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getProvincesByCountry ($name: String,$countryCode: String,$page: Int,$size: Int) {
        getProvincesByCountry(name: $name,countryCode: $countryCode,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getProvincesByCountry: ProvinceResults},
    GetProvincesByCountryArgs
  >(query, options);
};

export const useGetAllRatings = (
  fields: GenFields<RatingResults>,
  options?: QueryHookOptions<{getAllRatings: RatingResults}, GetAllRatingsArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllRatings ($filterRating: FilterRating,$page: Int,$size: Int) {
        getAllRatings(filterRating: $filterRating,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllRatings: RatingResults}, GetAllRatingsArgs>(
    query,
    options,
  );
};

export const useGetRatingById = (
  fields: GenFields<Rating>,
  options?: QueryHookOptions<{getRatingById: Rating}, GetRatingByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRatingById ($id: String) {
        getRatingById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getRatingById: Rating}, GetRatingByIdArgs>(
    query,
    options,
  );
};

export const useGetRatingByUser = (
  fields: GenFields<Rating>,
  options?: QueryHookOptions<{getRatingByUser: Rating}, GetRatingByUserArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRatingByUser ($userId: String!) {
        getRatingByUser(userId: $userId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getRatingByUser: Rating}, GetRatingByUserArgs>(
    query,
    options,
  );
};

export const useGetAllRecord = (
  fields: GenFields<RecordResults>,
  options?: QueryHookOptions<{getAllRecord: RecordResults}, GetAllRecordArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllRecord ($filterRecord: FilterRecord,$page: Int,$size: Int) {
        getAllRecord(filterRecord: $filterRecord,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllRecord: RecordResults}, GetAllRecordArgs>(
    query,
    options,
  );
};

export const useGetRecordById = (
  fields: GenFields<Record>,
  options?: QueryHookOptions<{getRecordById: Record}, GetRecordByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecordById ($id: String!) {
        getRecordById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getRecordById: Record}, GetRecordByIdArgs>(
    query,
    options,
  );
};

export const useGetRecordByUser = (
  fields: GenFields<Record>,
  options?: QueryHookOptions<{getRecordByUser: Record}, GetRecordByUserArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecordByUser ($userId: String!) {
        getRecordByUser(userId: $userId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getRecordByUser: Record}, GetRecordByUserArgs>(
    query,
    options,
  );
};

export const useGetRecordSeenByEmployer = (
  fields: GenFields<Record>,
  options?: QueryHookOptions<
    {getRecordSeenByEmployer: Record},
    GetRecordSeenByEmployerArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecordSeenByEmployer ($employerId: String!,$recordId: String!) {
        getRecordSeenByEmployer(employerId: $employerId,recordId: $recordId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRecordSeenByEmployer: Record},
    GetRecordSeenByEmployerArgs
  >(query, options);
};

export const useGetOverView = (
  fields: GenFields<OverviewResults>,
  options?: QueryHookOptions<{getOverView: OverviewResults}>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getOverView  {
        getOverView {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getOverView: OverviewResults}>(query, options);
};

export const useCheckRecordUserExist = (
  options?: QueryHookOptions<{checkRecordUserExist: boolean}>,
) => {
  const query = gql`
    query checkRecordUserExist {
      checkRecordUserExist
    }
  `;
  return useLazyQuery<{checkRecordUserExist: boolean}>(query, options);
};

export const useGetAllRecruitmentLanguage = (
  fields: GenFields<RecruitmentLanguageResults>,
  options?: QueryHookOptions<{
    getAllRecruitmentLanguage: RecruitmentLanguageResults;
  }>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllRecruitmentLanguage  {
        getAllRecruitmentLanguage {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{
    getAllRecruitmentLanguage: RecruitmentLanguageResults;
  }>(query, options);
};

export const useGetRecruitmentLanguageById = (
  fields: GenFields<RecruitmentLanguage>,
  options?: QueryHookOptions<
    {getRecruitmentLanguageById: RecruitmentLanguage},
    GetRecruitmentLanguageByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecruitmentLanguageById ($id: String!) {
        getRecruitmentLanguageById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRecruitmentLanguageById: RecruitmentLanguage},
    GetRecruitmentLanguageByIdArgs
  >(query, options);
};

export const useGetAllRecruitment = (
  fields: GenFields<RecruitmentResults>,
  options?: QueryHookOptions<
    {getAllRecruitment: RecruitmentResults},
    GetAllRecruitmentArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllRecruitment ($keyword: String,$filterRecruitment: FilterRecruitment,$page: Int,$size: Int) {
        getAllRecruitment(keyword: $keyword,filterRecruitment: $filterRecruitment,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllRecruitment: RecruitmentResults},
    GetAllRecruitmentArgs
  >(query, options);
};

export const useGetRecruitmentById = (
  fields: GenFields<Recruitment>,
  options?: QueryHookOptions<
    {getRecruitmentById: Recruitment},
    GetRecruitmentByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecruitmentById ($id: String!) {
        getRecruitmentById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRecruitmentById: Recruitment},
    GetRecruitmentByIdArgs
  >(query, options);
};

export const useGetRecruitmentBySlug = (
  fields: GenFields<Recruitment>,
  options?: QueryHookOptions<
    {getRecruitmentBySlug: Recruitment},
    GetRecruitmentBySlugArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecruitmentBySlug ($slug: String!) {
        getRecruitmentBySlug(slug: $slug) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRecruitmentBySlug: Recruitment},
    GetRecruitmentBySlugArgs
  >(query, options);
};

export const useGetRecruitmentByCompany = (
  fields: GenFields<RecruitmentResults>,
  options?: QueryHookOptions<
    {getRecruitmentByCompany: RecruitmentResults},
    GetRecruitmentByCompanyArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecruitmentByCompany ($companyId: String!) {
        getRecruitmentByCompany(companyId: $companyId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRecruitmentByCompany: RecruitmentResults},
    GetRecruitmentByCompanyArgs
  >(query, options);
};

export const useGetRecruitmentByUser = (
  fields: GenFields<RecruitmentResults>,
  options?: QueryHookOptions<
    {getRecruitmentByUser: RecruitmentResults},
    GetRecruitmentByUserArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecruitmentByUser ($userId: String!) {
        getRecruitmentByUser(userId: $userId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRecruitmentByUser: RecruitmentResults},
    GetRecruitmentByUserArgs
  >(query, options);
};

export const useGetRecruitmentNewsById = (
  fields: GenFields<Recruitment>,
  options?: QueryHookOptions<
    {getRecruitmentNewsById: Recruitment},
    GetRecruitmentNewsByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecruitmentNewsById ($id: String!) {
        getRecruitmentNewsById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRecruitmentNewsById: Recruitment},
    GetRecruitmentNewsByIdArgs
  >(query, options);
};

export const useGetRecruitmentType = (
  options?: QueryHookOptions<{getRecruitmentType: string[]}>,
) => {
  const query = gql`
    query getRecruitmentType {
      getRecruitmentType
    }
  `;
  return useLazyQuery<{getRecruitmentType: string[]}>(query, options);
};

export const useGetRecruitmentPositionByType = (
  options?: QueryHookOptions<
    {getRecruitmentPositionByType: string[]},
    GetRecruitmentPositionByTypeArgs
  >,
) => {
  const query = gql`
    query getRecruitmentPositionByType($type: String!) {
      getRecruitmentPositionByType(type: $type)
    }
  `;
  return useLazyQuery<
    {getRecruitmentPositionByType: string[]},
    GetRecruitmentPositionByTypeArgs
  >(query, options);
};

export const useGetRecruitmentAppliedUser = (
  fields: GenFields<UserResults>,
  options?: QueryHookOptions<
    {getRecruitmentAppliedUser: UserResults},
    GetRecruitmentAppliedUserArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecruitmentAppliedUser ($id: String!,$page: Int,$size: Int) {
        getRecruitmentAppliedUser(id: $id,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRecruitmentAppliedUser: UserResults},
    GetRecruitmentAppliedUserArgs
  >(query, options);
};

export const useGetRecruitmentViewedUser = (
  fields: GenFields<UserResults>,
  options?: QueryHookOptions<
    {getRecruitmentViewedUser: UserResults},
    GetRecruitmentViewedUserArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecruitmentViewedUser ($id: String!,$page: Int,$size: Int) {
        getRecruitmentViewedUser(id: $id,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRecruitmentViewedUser: UserResults},
    GetRecruitmentViewedUserArgs
  >(query, options);
};

export const useGetRecruitmentApprovedUser = (
  fields: GenFields<UserResults>,
  options?: QueryHookOptions<
    {getRecruitmentApprovedUser: UserResults},
    GetRecruitmentApprovedUserArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRecruitmentApprovedUser ($id: String!,$page: Int,$size: Int) {
        getRecruitmentApprovedUser(id: $id,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRecruitmentApprovedUser: UserResults},
    GetRecruitmentApprovedUserArgs
  >(query, options);
};

export const useGetBestRecruitment = (
  fields: GenFields<RecruitmentResults>,
  options?: QueryHookOptions<
    {getBestRecruitment: RecruitmentResults},
    GetBestRecruitmentArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getBestRecruitment ($page: Int,$size: Int) {
        getBestRecruitment(page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getBestRecruitment: RecruitmentResults},
    GetBestRecruitmentArgs
  >(query, options);
};

export const useGetUserByRecruitment = (
  fields: GenFields<UserRecruitmentResults>,
  options?: QueryHookOptions<
    {getUserByRecruitment: UserRecruitmentResults},
    GetUserByRecruitmentArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getUserByRecruitment ($idRecruitment: String,$page: Int,$size: Int,$createdAt: Timeline) {
        getUserByRecruitment(idRecruitment: $idRecruitment,page: $page,size: $size,createdAt: $createdAt) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getUserByRecruitment: UserRecruitmentResults},
    GetUserByRecruitmentArgs
  >(query, options);
};

export const useGetUserStatusViewByRecruitment = (
  fields: GenFields<UserRecruitmentResults>,
  options?: QueryHookOptions<
    {getUserStatusViewByRecruitment: UserRecruitmentResults},
    GetUserStatusViewByRecruitmentArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getUserStatusViewByRecruitment ($idRecruitment: String,$page: Int,$size: Int,$createdAt: Timeline) {
        getUserStatusViewByRecruitment(idRecruitment: $idRecruitment,page: $page,size: $size,createdAt: $createdAt) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getUserStatusViewByRecruitment: UserRecruitmentResults},
    GetUserStatusViewByRecruitmentArgs
  >(query, options);
};

export const useGetAllRequestReview = (
  fields: GenFields<RequestReviewResult>,
  options?: QueryHookOptions<
    {getAllRequestReview: RequestReviewResult},
    GetAllRequestReviewArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllRequestReview ($filterRequestReview: FilterRequestReview,$page: Int,$size: Int) {
        getAllRequestReview(filterRequestReview: $filterRequestReview,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllRequestReview: RequestReviewResult},
    GetAllRequestReviewArgs
  >(query, options);
};

export const useGetRequestReviewById = (
  fields: GenFields<RequestReview>,
  options?: QueryHookOptions<
    {getRequestReviewById: RequestReview},
    GetRequestReviewByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getRequestReviewById ($id: String) {
        getRequestReviewById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getRequestReviewById: RequestReview},
    GetRequestReviewByIdArgs
  >(query, options);
};

export const useGetAllScheduleInterview = (
  fields: GenFields<ScheduleInterviewResult>,
  options?: QueryHookOptions<
    {getAllScheduleInterview: ScheduleInterviewResult},
    GetAllScheduleInterviewArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllScheduleInterview ($filterScheduleInterview: FilterScheduleInterview,$page: Int,$size: Int) {
        getAllScheduleInterview(filterScheduleInterview: $filterScheduleInterview,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllScheduleInterview: ScheduleInterviewResult},
    GetAllScheduleInterviewArgs
  >(query, options);
};

export const useGetScheduleInterviewById = (
  fields: GenFields<ScheduleInterview>,
  options?: QueryHookOptions<
    {getScheduleInterviewById: ScheduleInterview},
    GetScheduleInterviewByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getScheduleInterviewById ($id: String) {
        getScheduleInterviewById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getScheduleInterviewById: ScheduleInterview},
    GetScheduleInterviewByIdArgs
  >(query, options);
};

export const useGetSeo = (
  fields: GenFields<Seo>,
  options?: QueryHookOptions<{getSeo: Seo}, GetSeoArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getSeo ($language: String!) {
        getSeo(language: $language) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getSeo: Seo}, GetSeoArgs>(query, options);
};

export const useGetAllServices = (
  fields: GenFields<ServicesResult>,
  options?: QueryHookOptions<
    {getAllServices: ServicesResult},
    GetAllServicesArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllServices ($filterServices: FilterServices,$page: Int,$size: Int) {
        getAllServices(filterServices: $filterServices,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllServices: ServicesResult}, GetAllServicesArgs>(
    query,
    options,
  );
};

export const useGetServicesById = (
  fields: GenFields<Services>,
  options?: QueryHookOptions<{getServicesById: Services}, GetServicesByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getServicesById ($id: String!) {
        getServicesById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getServicesById: Services}, GetServicesByIdArgs>(
    query,
    options,
  );
};

export const useGetStreets = (
  fields: GenFields<StreetTypeResults>,
  options?: QueryHookOptions<{getStreets: StreetTypeResults}, GetStreetsArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getStreets ($filterStreetType: FilterStreetType,$page: Int,$size: Int) {
        getStreets(filterStreetType: $filterStreetType,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getStreets: StreetTypeResults}, GetStreetsArgs>(
    query,
    options,
  );
};

export const useGetStreetById = (
  fields: GenFields<StreetType>,
  options?: QueryHookOptions<{getStreetById: StreetType}, GetStreetByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getStreetById ($id: String!) {
        getStreetById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getStreetById: StreetType}, GetStreetByIdArgs>(
    query,
    options,
  );
};

export const useGetStreetsByWard = (
  fields: GenFields<StreetTypeResults>,
  options?: QueryHookOptions<
    {getStreetsByWard: StreetTypeResults},
    GetStreetsByWardArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getStreetsByWard ($wardId: String!,$page: Int,$size: Int) {
        getStreetsByWard(wardId: $wardId,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getStreetsByWard: StreetTypeResults},
    GetStreetsByWardArgs
  >(query, options);
};

export const useGetAllTag = (
  fields: GenFields<TagResults>,
  options?: QueryHookOptions<{getAllTag: TagResults}, GetAllTagArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllTag ($filterTag: FilterTag,$page: Int,$size: Int) {
        getAllTag(filterTag: $filterTag,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllTag: TagResults}, GetAllTagArgs>(query, options);
};

export const useGetTagById = (
  fields: GenFields<Tag>,
  options?: QueryHookOptions<{getTagById: Tag}, GetTagByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getTagById ($id: String!) {
        getTagById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getTagById: Tag}, GetTagByIdArgs>(query, options);
};

export const useGetTypesByCode = (
  fields: GenFields<Types[]>,
  options?: QueryHookOptions<{getTypesByCode: Types[]}, GetTypesByCodeArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getTypesByCode ($code: String!,$language: String) {
        getTypesByCode(code: $code,language: $language) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getTypesByCode: Types[]}, GetTypesByCodeArgs>(
    query,
    options,
  );
};

export const useGetTypesById = (
  fields: GenFields<Types>,
  options?: QueryHookOptions<{getTypesById: Types}, GetTypesByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getTypesById ($id: String!) {
        getTypesById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getTypesById: Types}, GetTypesByIdArgs>(query, options);
};

export const useGetTypeBySlugAndCode = (
  fields: GenFields<Types>,
  options?: QueryHookOptions<
    {getTypeBySlugAndCode: Types},
    GetTypeBySlugAndCodeArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getTypeBySlugAndCode ($slug: String!,$code: String!) {
        getTypeBySlugAndCode(slug: $slug,code: $code) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getTypeBySlugAndCode: Types}, GetTypeBySlugAndCodeArgs>(
    query,
    options,
  );
};

export const useGetTypeByValueAndCode = (
  fields: GenFields<Types>,
  options?: QueryHookOptions<
    {getTypeByValueAndCode: Types},
    GetTypeByValueAndCodeArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getTypeByValueAndCode ($value: String!,$code: String!) {
        getTypeByValueAndCode(value: $value,code: $code) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getTypeByValueAndCode: Types},
    GetTypeByValueAndCodeArgs
  >(query, options);
};

export const useIsExistPasswordAndPhone = (
  options?: QueryHookOptions<
    {isExistPasswordAndPhone: boolean},
    IsExistPasswordAndPhoneArgs
  >,
) => {
  const query = gql`
    query isExistPasswordAndPhone($id: String) {
      isExistPasswordAndPhone(id: $id)
    }
  `;
  return useLazyQuery<
    {isExistPasswordAndPhone: boolean},
    IsExistPasswordAndPhoneArgs
  >(query, options);
};

export const useIsExistPhoneNumber = (
  options?: QueryHookOptions<
    {isExistPhoneNumber: boolean},
    IsExistPhoneNumberArgs
  >,
) => {
  const query = gql`
    query isExistPhoneNumber($phoneNumber: String!) {
      isExistPhoneNumber(phoneNumber: $phoneNumber)
    }
  `;
  return useLazyQuery<{isExistPhoneNumber: boolean}, IsExistPhoneNumberArgs>(
    query,
    options,
  );
};

export const useIsExistEmail = (
  options?: QueryHookOptions<{isExistEmail: boolean}, IsExistEmailArgs>,
) => {
  const query = gql`
    query isExistEmail($email: String!) {
      isExistEmail(email: $email)
    }
  `;
  return useLazyQuery<{isExistEmail: boolean}, IsExistEmailArgs>(
    query,
    options,
  );
};

export const useGetAllUsers = (
  fields: GenFields<UserResults>,
  options?: QueryHookOptions<{getAllUsers: UserResults}, GetAllUsersArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllUsers ($filterUser: FilterUser,$page: Int,$size: Int) {
        getAllUsers(filterUser: $filterUser,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllUsers: UserResults}, GetAllUsersArgs>(
    query,
    options,
  );
};

export const useGetUserById = (
  fields: GenFields<User>,
  options?: QueryHookOptions<{getUserById: User}, GetUserByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getUserById ($id: String!) {
        getUserById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getUserById: User}, GetUserByIdArgs>(query, options);
};

export const useGetAllUserHasPermissions = (
  fields: GenFields<UserResults>,
  options?: QueryHookOptions<
    {getAllUserHasPermissions: UserResults},
    GetAllUserHasPermissionsArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllUserHasPermissions ($permissions: [String]!,$page: Int,$size: Int,$filterUser: FilterUser) {
        getAllUserHasPermissions(permissions: $permissions,page: $page,size: $size,filterUser: $filterUser) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAllUserHasPermissions: UserResults},
    GetAllUserHasPermissionsArgs
  >(query, options);
};

export const useGetIdByPhoneNumber = (
  fields: GenFields<User>,
  options?: QueryHookOptions<
    {getIdByPhoneNumber: User},
    GetIdByPhoneNumberArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getIdByPhoneNumber ($phoneNumber: String!) {
        getIdByPhoneNumber(phoneNumber: $phoneNumber) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getIdByPhoneNumber: User}, GetIdByPhoneNumberArgs>(
    query,
    options,
  );
};

export const useCheckProfileUserExist = (
  options?: QueryHookOptions<{checkProfileUserExist: boolean}>,
) => {
  const query = gql`
    query checkProfileUserExist {
      checkProfileUserExist
    }
  `;
  return useLazyQuery<{checkProfileUserExist: boolean}>(query, options);
};

export const useGetAppliedRecruitmentByUserId = (
  fields: GenFields<ApplyRecruitmentType[]>,
  options?: QueryHookOptions<
    {getAppliedRecruitmentByUserId: ApplyRecruitmentType[]},
    GetAppliedRecruitmentByUserIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAppliedRecruitmentByUserId ($userId: String) {
        getAppliedRecruitmentByUserId(userId: $userId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getAppliedRecruitmentByUserId: ApplyRecruitmentType[]},
    GetAppliedRecruitmentByUserIdArgs
  >(query, options);
};

export const useGetSavedRecruitmentByUserId = (
  fields: GenFields<Recruitment[]>,
  options?: QueryHookOptions<
    {getSavedRecruitmentByUserId: Recruitment[]},
    GetSavedRecruitmentByUserIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getSavedRecruitmentByUserId ($userId: String) {
        getSavedRecruitmentByUserId(userId: $userId) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getSavedRecruitmentByUserId: Recruitment[]},
    GetSavedRecruitmentByUserIdArgs
  >(query, options);
};

export const useRefreshProfile = (
  fields: GenFields<User>,
  options?: QueryHookOptions<{refreshProfile: User}>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query refreshProfile  {
        refreshProfile {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{refreshProfile: User}>(query, options);
};

export const useGetWards = (
  fields: GenFields<WardResults>,
  options?: QueryHookOptions<{getWards: WardResults}, GetWardsArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getWards ($name: String,$page: Int,$size: Int) {
        getWards(name: $name,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getWards: WardResults}, GetWardsArgs>(query, options);
};

export const useGetWardById = (
  fields: GenFields<WardType>,
  options?: QueryHookOptions<{getWardById: WardType}, GetWardByIdArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getWardById ($id: String!) {
        getWardById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getWardById: WardType}, GetWardByIdArgs>(query, options);
};

export const useGetWardsByDistrict = (
  fields: GenFields<WardResults>,
  options?: QueryHookOptions<
    {getWardsByDistrict: WardResults},
    GetWardsByDistrictArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getWardsByDistrict ($districtCode: String,$wardName: String,$page: Int,$size: Int) {
        getWardsByDistrict(districtCode: $districtCode,wardName: $wardName,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getWardsByDistrict: WardResults},
    GetWardsByDistrictArgs
  >(query, options);
};

export const useGetAllWorkLocation = (
  fields: GenFields<WorkLocationResults>,
  options?: QueryHookOptions<{getAllWorkLocation: WorkLocationResults}>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getAllWorkLocation  {
        getAllWorkLocation {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<{getAllWorkLocation: WorkLocationResults}>(
    query,
    options,
  );
};

export const useGetWorkLocationById = (
  fields: GenFields<WorkLocation>,
  options?: QueryHookOptions<
    {getWorkLocationById: WorkLocation},
    GetWorkLocationByIdArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getWorkLocationById ($id: String!) {
        getWorkLocationById(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getWorkLocationById: WorkLocation},
    GetWorkLocationByIdArgs
  >(query, options);
};

export const useGetWorkLocationByCompany = (
  fields: GenFields<WorkLocationResults>,
  options?: QueryHookOptions<
    {getWorkLocationByCompany: WorkLocationResults},
    GetWorkLocationByCompanyArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const query = gql`
      query getWorkLocationByCompany ($companyId: String,$page: Int,$size: Int) {
        getWorkLocationByCompany(companyId: $companyId,page: $page,size: $size) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useLazyQuery<
    {getWorkLocationByCompany: WorkLocationResults},
    GetWorkLocationByCompanyArgs
  >(query, options);
};

export const useLogin = (
  fields: GenFields<JwtPayload>,
  options?: MutationHookOptions<{login: JwtPayload}, LoginArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation login ($user: LoginUserInput!) {
        login(user: $user) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{login: JwtPayload}, LoginArgs>(mutation, options);
};

export const useSendOtpVoice = (
  fields: GenFields<AbenlaApiResponse>,
  options?: MutationHookOptions<
    {sendOtpVoice: AbenlaApiResponse},
    SendOtpVoiceArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation sendOtpVoice ($phoneNumber: String!) {
        sendOtpVoice(phoneNumber: $phoneNumber) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{sendOtpVoice: AbenlaApiResponse}, SendOtpVoiceArgs>(
    mutation,
    options,
  );
};

export const useRegisterOtpVoice = (
  fields: GenFields<AbenlaApiResponse>,
  options?: MutationHookOptions<
    {registerOtpVoice: AbenlaApiResponse},
    RegisterOtpVoiceArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation registerOtpVoice ($input: RegisterOptInput!) {
        registerOtpVoice(input: $input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {registerOtpVoice: AbenlaApiResponse},
    RegisterOtpVoiceArgs
  >(mutation, options);
};

export const useVerifyOtpVoice = (
  options?: MutationHookOptions<{verifyOtpVoice: boolean}, VerifyOtpVoiceArgs>,
) => {
  const mutation = gql`
    mutation verifyOtpVoice($input: VerifyOtpInput!) {
      verifyOtpVoice(input: $input)
    }
  `;
  return useMutation<{verifyOtpVoice: boolean}, VerifyOtpVoiceArgs>(
    mutation,
    options,
  );
};

export const useVerifyOtpResetPassword = (
  options?: MutationHookOptions<
    {verifyOtpResetPassword: boolean},
    VerifyOtpResetPasswordArgs
  >,
) => {
  const mutation = gql`
    mutation verifyOtpResetPassword($input: VerifyOtpInput!) {
      verifyOtpResetPassword(input: $input)
    }
  `;
  return useMutation<
    {verifyOtpResetPassword: boolean},
    VerifyOtpResetPasswordArgs
  >(mutation, options);
};

export const useResetPasswordOtpVoice = (
  options?: MutationHookOptions<
    {resetPasswordOtpVoice: boolean},
    ResetPasswordOtpVoiceArgs
  >,
) => {
  const mutation = gql`
    mutation resetPasswordOtpVoice($input: ResetPasswordOtpInput!) {
      resetPasswordOtpVoice(input: $input)
    }
  `;
  return useMutation<
    {resetPasswordOtpVoice: boolean},
    ResetPasswordOtpVoiceArgs
  >(mutation, options);
};

export const useCreateAboutUs = (
  fields: GenFields<AboutUs>,
  options?: MutationHookOptions<{createAboutUs: AboutUs}, CreateAboutUsArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createAboutUs ($aboutUsCreateInput: AboutUsCreateInput!) {
        createAboutUs(aboutUsCreateInput: $aboutUsCreateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createAboutUs: AboutUs}, CreateAboutUsArgs>(
    mutation,
    options,
  );
};

export const useUpdateAboutUs = (
  fields: GenFields<AboutUs>,
  options?: MutationHookOptions<{updateAboutUs: AboutUs}, UpdateAboutUsArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateAboutUs ($id: String!,$aboutUsUpdateInput: AboutUsUpdateInput!) {
        updateAboutUs(id: $id,aboutUsUpdateInput: $aboutUsUpdateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateAboutUs: AboutUs}, UpdateAboutUsArgs>(
    mutation,
    options,
  );
};

export const useDeleteAboutUs = (
  options?: MutationHookOptions<{deleteAboutUs: boolean}, DeleteAboutUsArgs>,
) => {
  const mutation = gql`
    mutation deleteAboutUs($id: String!) {
      deleteAboutUs(id: $id)
    }
  `;
  return useMutation<{deleteAboutUs: boolean}, DeleteAboutUsArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllAboutUs = (
  options?: MutationHookOptions<{deleteAllAboutUs: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllAboutUs {
      deleteAllAboutUs
    }
  `;
  return useMutation<{deleteAllAboutUs: boolean}>(mutation, options);
};

export const useCreateAds = (
  fields: GenFields<Ads>,
  options?: MutationHookOptions<{createAds: Ads}, CreateAdsArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createAds ($createAdsInput: CreateAdsInput!) {
        createAds(createAdsInput: $createAdsInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createAds: Ads}, CreateAdsArgs>(mutation, options);
};

export const useUpdateAds = (
  fields: GenFields<Ads>,
  options?: MutationHookOptions<{updateAds: Ads}, UpdateAdsArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateAds ($fieldsToUpdate: UpdateAdsInput!,$id: String!) {
        updateAds(fieldsToUpdate: $fieldsToUpdate,id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateAds: Ads}, UpdateAdsArgs>(mutation, options);
};

export const useRemoveAds = (
  options?: MutationHookOptions<{removeAds: boolean}, RemoveAdsArgs>,
) => {
  const mutation = gql`
    mutation removeAds($id: String!) {
      removeAds(id: $id)
    }
  `;
  return useMutation<{removeAds: boolean}, RemoveAdsArgs>(mutation, options);
};

export const useCreateBenefit = (
  fields: GenFields<Benefit>,
  options?: MutationHookOptions<{createBenefit: Benefit}, CreateBenefitArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createBenefit ($benefitInput: BenefitInput!) {
        createBenefit(benefitInput: $benefitInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createBenefit: Benefit}, CreateBenefitArgs>(
    mutation,
    options,
  );
};

export const useUpdateBenefit = (
  fields: GenFields<Benefit>,
  options?: MutationHookOptions<{updateBenefit: Benefit}, UpdateBenefitArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateBenefit ($id: String!,$benefitInput: BenefitInput!) {
        updateBenefit(id: $id,benefitInput: $benefitInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateBenefit: Benefit}, UpdateBenefitArgs>(
    mutation,
    options,
  );
};

export const useDeleteBenefit = (
  options?: MutationHookOptions<{deleteBenefit: boolean}, DeleteBenefitArgs>,
) => {
  const mutation = gql`
    mutation deleteBenefit($id: String!) {
      deleteBenefit(id: $id)
    }
  `;
  return useMutation<{deleteBenefit: boolean}, DeleteBenefitArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllBenefit = (
  options?: MutationHookOptions<{deleteAllBenefit: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllBenefit {
      deleteAllBenefit
    }
  `;
  return useMutation<{deleteAllBenefit: boolean}>(mutation, options);
};

export const useCreateCareerCounseling = (
  fields: GenFields<CareerCounseling>,
  options?: MutationHookOptions<
    {createCareerCounseling: CareerCounseling},
    CreateCareerCounselingArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createCareerCounseling ($careerCounselingCreateInput: CareerCounselingCreateInput!) {
        createCareerCounseling(careerCounselingCreateInput: $careerCounselingCreateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createCareerCounseling: CareerCounseling},
    CreateCareerCounselingArgs
  >(mutation, options);
};

export const useUpdateCareerCounseling = (
  fields: GenFields<CareerCounseling>,
  options?: MutationHookOptions<
    {updateCareerCounseling: CareerCounseling},
    UpdateCareerCounselingArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateCareerCounseling ($id: String!,$careerCounselingUpdateInput: CareerCounselingUpdateInput) {
        updateCareerCounseling(id: $id,careerCounselingUpdateInput: $careerCounselingUpdateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateCareerCounseling: CareerCounseling},
    UpdateCareerCounselingArgs
  >(mutation, options);
};

export const useDeleteCareerCounseling = (
  options?: MutationHookOptions<
    {deleteCareerCounseling: boolean},
    DeleteCareerCounselingArgs
  >,
) => {
  const mutation = gql`
    mutation deleteCareerCounseling($id: String!) {
      deleteCareerCounseling(id: $id)
    }
  `;
  return useMutation<
    {deleteCareerCounseling: boolean},
    DeleteCareerCounselingArgs
  >(mutation, options);
};

export const useCreateCategoryLevel1 = (
  fields: GenFields<CategoryLevel1>,
  options?: MutationHookOptions<
    {createCategoryLevel1: CategoryLevel1},
    CreateCategoryLevel1Args
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createCategoryLevel1 ($categoryLevel1Input: CategoryLevel1Input!) {
        createCategoryLevel1(categoryLevel1Input: $categoryLevel1Input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createCategoryLevel1: CategoryLevel1},
    CreateCategoryLevel1Args
  >(mutation, options);
};

export const useUpdateCategoryLevel1 = (
  fields: GenFields<CategoryLevel1>,
  options?: MutationHookOptions<
    {updateCategoryLevel1: CategoryLevel1},
    UpdateCategoryLevel1Args
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateCategoryLevel1 ($id: String!,$categoryLevel1Input: CategoryLevel1Input!) {
        updateCategoryLevel1(id: $id,categoryLevel1Input: $categoryLevel1Input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateCategoryLevel1: CategoryLevel1},
    UpdateCategoryLevel1Args
  >(mutation, options);
};

export const useDeleteCategoryLevel1 = (
  options?: MutationHookOptions<
    {deleteCategoryLevel1: boolean},
    DeleteCategoryLevel1Args
  >,
) => {
  const mutation = gql`
    mutation deleteCategoryLevel1($id: String!) {
      deleteCategoryLevel1(id: $id)
    }
  `;
  return useMutation<{deleteCategoryLevel1: boolean}, DeleteCategoryLevel1Args>(
    mutation,
    options,
  );
};

export const useDeleteAllCategoryLevel1 = (
  options?: MutationHookOptions<{deleteAllCategoryLevel1: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllCategoryLevel1 {
      deleteAllCategoryLevel1
    }
  `;
  return useMutation<{deleteAllCategoryLevel1: boolean}>(mutation, options);
};

export const useCreateCategoryLevel2 = (
  fields: GenFields<CategoryLevel2>,
  options?: MutationHookOptions<
    {createCategoryLevel2: CategoryLevel2},
    CreateCategoryLevel2Args
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createCategoryLevel2 ($categoryLevel2Input: CategoryLevel2Input!) {
        createCategoryLevel2(categoryLevel2Input: $categoryLevel2Input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createCategoryLevel2: CategoryLevel2},
    CreateCategoryLevel2Args
  >(mutation, options);
};

export const useUpdateCategoryLevel2 = (
  fields: GenFields<CategoryLevel2>,
  options?: MutationHookOptions<
    {updateCategoryLevel2: CategoryLevel2},
    UpdateCategoryLevel2Args
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateCategoryLevel2 ($id: String!,$categoryLevel2Input: CategoryLevel2Input!) {
        updateCategoryLevel2(id: $id,categoryLevel2Input: $categoryLevel2Input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateCategoryLevel2: CategoryLevel2},
    UpdateCategoryLevel2Args
  >(mutation, options);
};

export const useDeleteCategoryLevel2 = (
  options?: MutationHookOptions<
    {deleteCategoryLevel2: boolean},
    DeleteCategoryLevel2Args
  >,
) => {
  const mutation = gql`
    mutation deleteCategoryLevel2($id: String!) {
      deleteCategoryLevel2(id: $id)
    }
  `;
  return useMutation<{deleteCategoryLevel2: boolean}, DeleteCategoryLevel2Args>(
    mutation,
    options,
  );
};

export const useDeleteAllCategoryLevel2 = (
  options?: MutationHookOptions<{deleteAllCategoryLevel2: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllCategoryLevel2 {
      deleteAllCategoryLevel2
    }
  `;
  return useMutation<{deleteAllCategoryLevel2: boolean}>(mutation, options);
};

export const useCreateCategory = (
  fields: GenFields<Category>,
  options?: MutationHookOptions<{createCategory: Category}, CreateCategoryArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createCategory ($categoryInput: CategoryInput!) {
        createCategory(categoryInput: $categoryInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createCategory: Category}, CreateCategoryArgs>(
    mutation,
    options,
  );
};

export const useUpdateCategory = (
  fields: GenFields<Category>,
  options?: MutationHookOptions<{updateCategory: Category}, UpdateCategoryArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateCategory ($id: String!,$categoryInput: CategoryInput!) {
        updateCategory(id: $id,categoryInput: $categoryInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateCategory: Category}, UpdateCategoryArgs>(
    mutation,
    options,
  );
};

export const useDeleteCategory = (
  options?: MutationHookOptions<{deleteCategory: boolean}, DeleteCategoryArgs>,
) => {
  const mutation = gql`
    mutation deleteCategory($id: String!) {
      deleteCategory(id: $id)
    }
  `;
  return useMutation<{deleteCategory: boolean}, DeleteCategoryArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllCategory = (
  options?: MutationHookOptions<{deleteAllCategory: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllCategory {
      deleteAllCategory
    }
  `;
  return useMutation<{deleteAllCategory: boolean}>(mutation, options);
};

export const useCreateCompany = (
  fields: GenFields<Company>,
  options?: MutationHookOptions<{createCompany: Company}, CreateCompanyArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createCompany ($companyCreateInput: CompanyCreateInput!) {
        createCompany(companyCreateInput: $companyCreateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createCompany: Company}, CreateCompanyArgs>(
    mutation,
    options,
  );
};

export const useUpdateCompany = (
  fields: GenFields<Company>,
  options?: MutationHookOptions<{updateCompany: Company}, UpdateCompanyArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateCompany ($id: String!,$companyUpdateInput: CompanyUpdateInput!) {
        updateCompany(id: $id,companyUpdateInput: $companyUpdateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateCompany: Company}, UpdateCompanyArgs>(
    mutation,
    options,
  );
};

export const useDeleteCompany = (
  options?: MutationHookOptions<{deleteCompany: boolean}, DeleteCompanyArgs>,
) => {
  const mutation = gql`
    mutation deleteCompany($id: String!) {
      deleteCompany(id: $id)
    }
  `;
  return useMutation<{deleteCompany: boolean}, DeleteCompanyArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllCompany = (
  options?: MutationHookOptions<{deleteAllCompany: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllCompany {
      deleteAllCompany
    }
  `;
  return useMutation<{deleteAllCompany: boolean}>(mutation, options);
};

export const useSetApprovedCompany = (
  options?: MutationHookOptions<
    {setApprovedCompany: boolean},
    SetApprovedCompanyArgs
  >,
) => {
  const mutation = gql`
    mutation setApprovedCompany($id: String!, $value: Boolean!) {
      setApprovedCompany(id: $id, value: $value)
    }
  `;
  return useMutation<{setApprovedCompany: boolean}, SetApprovedCompanyArgs>(
    mutation,
    options,
  );
};

export const useSetIsHotCompany = (
  options?: MutationHookOptions<
    {setIsHotCompany: boolean},
    SetIsHotCompanyArgs
  >,
) => {
  const mutation = gql`
    mutation setIsHotCompany($id: String!, $value: Boolean!) {
      setIsHotCompany(id: $id, value: $value)
    }
  `;
  return useMutation<{setIsHotCompany: boolean}, SetIsHotCompanyArgs>(
    mutation,
    options,
  );
};

export const useUpdateCompanyProvince = (
  options?: MutationHookOptions<{updateCompanyProvince: boolean}>,
) => {
  const mutation = gql`
    mutation updateCompanyProvince {
      updateCompanyProvince
    }
  `;
  return useMutation<{updateCompanyProvince: boolean}>(mutation, options);
};

export const useCreateContact = (
  fields: GenFields<Contact>,
  options?: MutationHookOptions<{createContact: Contact}, CreateContactArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createContact ($contactInput: ContactInput!) {
        createContact(contactInput: $contactInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createContact: Contact}, CreateContactArgs>(
    mutation,
    options,
  );
};

export const useDeleteContact = (
  options?: MutationHookOptions<{deleteContact: boolean}, DeleteContactArgs>,
) => {
  const mutation = gql`
    mutation deleteContact($id: String!) {
      deleteContact(id: $id)
    }
  `;
  return useMutation<{deleteContact: boolean}, DeleteContactArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllContact = (
  options?: MutationHookOptions<{deleteAllContact: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllContact {
      deleteAllContact
    }
  `;
  return useMutation<{deleteAllContact: boolean}>(mutation, options);
};

export const useCreateContentWebsite = (
  fields: GenFields<ContentWebsite>,
  options?: MutationHookOptions<
    {createContentWebsite: ContentWebsite},
    CreateContentWebsiteArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createContentWebsite ($contentWebsiteCreateInput: ContentWebsiteCreateInput!) {
        createContentWebsite(contentWebsiteCreateInput: $contentWebsiteCreateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createContentWebsite: ContentWebsite},
    CreateContentWebsiteArgs
  >(mutation, options);
};

export const useDeleteContentWebsiteById = (
  options?: MutationHookOptions<
    {deleteContentWebsiteById: boolean},
    DeleteContentWebsiteByIdArgs
  >,
) => {
  const mutation = gql`
    mutation deleteContentWebsiteById($id: String!) {
      deleteContentWebsiteById(id: $id)
    }
  `;
  return useMutation<
    {deleteContentWebsiteById: boolean},
    DeleteContentWebsiteByIdArgs
  >(mutation, options);
};

export const useUpdateContentWebsite = (
  fields: GenFields<ContentWebsite>,
  options?: MutationHookOptions<
    {updateContentWebsite: ContentWebsite},
    UpdateContentWebsiteArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateContentWebsite ($fieldsToUpdate: ContentWebsiteUpdateInput!,$id: String!) {
        updateContentWebsite(fieldsToUpdate: $fieldsToUpdate,id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateContentWebsite: ContentWebsite},
    UpdateContentWebsiteArgs
  >(mutation, options);
};

export const useCreateDistrict = (
  fields: GenFields<DistrictType>,
  options?: MutationHookOptions<
    {createDistrict: DistrictType},
    CreateDistrictArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createDistrict ($districtInput: DistrictInput!) {
        createDistrict(districtInput: $districtInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createDistrict: DistrictType}, CreateDistrictArgs>(
    mutation,
    options,
  );
};

export const useUpdateDistrict = (
  fields: GenFields<DistrictType>,
  options?: MutationHookOptions<
    {updateDistrict: DistrictType},
    UpdateDistrictArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateDistrict ($id: String!,$districtInput: DistrictInput!) {
        updateDistrict(id: $id,districtInput: $districtInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateDistrict: DistrictType}, UpdateDistrictArgs>(
    mutation,
    options,
  );
};

export const useDeleteDistrict = (
  options?: MutationHookOptions<{deleteDistrict: boolean}, DeleteDistrictArgs>,
) => {
  const mutation = gql`
    mutation deleteDistrict($id: String!) {
      deleteDistrict(id: $id)
    }
  `;
  return useMutation<{deleteDistrict: boolean}, DeleteDistrictArgs>(
    mutation,
    options,
  );
};

export const useCreateEvaluate = (
  fields: GenFields<Evaluate>,
  options?: MutationHookOptions<{createEvaluate: Evaluate}, CreateEvaluateArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createEvaluate ($evaluateCreateInput: EvaluateCreateInput!) {
        createEvaluate(evaluateCreateInput: $evaluateCreateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createEvaluate: Evaluate}, CreateEvaluateArgs>(
    mutation,
    options,
  );
};

export const useUpdateEvaluate = (
  fields: GenFields<Evaluate>,
  options?: MutationHookOptions<{updateEvaluate: Evaluate}, UpdateEvaluateArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateEvaluate ($id: String!,$evaluateUpdateInput: EvaluateUpdateInput!) {
        updateEvaluate(id: $id,evaluateUpdateInput: $evaluateUpdateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateEvaluate: Evaluate}, UpdateEvaluateArgs>(
    mutation,
    options,
  );
};

export const useCreateInvitationApply = (
  fields: GenFields<InvitationApply>,
  options?: MutationHookOptions<
    {createInvitationApply: InvitationApply},
    CreateInvitationApplyArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createInvitationApply ($input: InvitationApplyInput!) {
        createInvitationApply(input: $input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createInvitationApply: InvitationApply},
    CreateInvitationApplyArgs
  >(mutation, options);
};

export const useUpdateInvitationApply = (
  fields: GenFields<InvitationApply>,
  options?: MutationHookOptions<
    {updateInvitationApply: InvitationApply},
    UpdateInvitationApplyArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateInvitationApply ($id: String!,$input: InvitationApplyInput) {
        updateInvitationApply(id: $id,input: $input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateInvitationApply: InvitationApply},
    UpdateInvitationApplyArgs
  >(mutation, options);
};

export const useDeleteInvitationApply = (
  options?: MutationHookOptions<
    {deleteInvitationApply: boolean},
    DeleteInvitationApplyArgs
  >,
) => {
  const mutation = gql`
    mutation deleteInvitationApply($id: String!) {
      deleteInvitationApply(id: $id)
    }
  `;
  return useMutation<
    {deleteInvitationApply: boolean},
    DeleteInvitationApplyArgs
  >(mutation, options);
};

export const useConfirmTheInvitation = (
  options?: MutationHookOptions<
    {confirmTheInvitation: boolean},
    ConfirmTheInvitationArgs
  >,
) => {
  const mutation = gql`
    mutation confirmTheInvitation($id: String!) {
      confirmTheInvitation(id: $id)
    }
  `;
  return useMutation<{confirmTheInvitation: boolean}, ConfirmTheInvitationArgs>(
    mutation,
    options,
  );
};

export const useCreateJobLevel = (
  fields: GenFields<JobLevel>,
  options?: MutationHookOptions<{createJobLevel: JobLevel}, CreateJobLevelArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createJobLevel ($jobLevelInput: JobLevelInput!) {
        createJobLevel(jobLevelInput: $jobLevelInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createJobLevel: JobLevel}, CreateJobLevelArgs>(
    mutation,
    options,
  );
};

export const useUpdateJobLevel = (
  fields: GenFields<JobLevel>,
  options?: MutationHookOptions<{updateJobLevel: JobLevel}, UpdateJobLevelArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateJobLevel ($id: String!,$jobLevelInput: JobLevelInput!) {
        updateJobLevel(id: $id,jobLevelInput: $jobLevelInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateJobLevel: JobLevel}, UpdateJobLevelArgs>(
    mutation,
    options,
  );
};

export const useDeleteJobLevel = (
  options?: MutationHookOptions<{deleteJobLevel: boolean}, DeleteJobLevelArgs>,
) => {
  const mutation = gql`
    mutation deleteJobLevel($id: String!) {
      deleteJobLevel(id: $id)
    }
  `;
  return useMutation<{deleteJobLevel: boolean}, DeleteJobLevelArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllJobLevel = (
  options?: MutationHookOptions<{deleteAllJobLevel: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllJobLevel {
      deleteAllJobLevel
    }
  `;
  return useMutation<{deleteAllJobLevel: boolean}>(mutation, options);
};

export const useCreateJobType = (
  fields: GenFields<JobType>,
  options?: MutationHookOptions<{createJobType: JobType}, CreateJobTypeArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createJobType ($jobTypeInput: JobTypeInput!) {
        createJobType(jobTypeInput: $jobTypeInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createJobType: JobType}, CreateJobTypeArgs>(
    mutation,
    options,
  );
};

export const useUpdateJobType = (
  fields: GenFields<JobType>,
  options?: MutationHookOptions<{updateJobType: JobType}, UpdateJobTypeArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateJobType ($id: String!,$jobTypeInput: JobTypeInput!) {
        updateJobType(id: $id,jobTypeInput: $jobTypeInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateJobType: JobType}, UpdateJobTypeArgs>(
    mutation,
    options,
  );
};

export const useDeleteJobType = (
  options?: MutationHookOptions<{deleteJobType: boolean}, DeleteJobTypeArgs>,
) => {
  const mutation = gql`
    mutation deleteJobType($id: String!) {
      deleteJobType(id: $id)
    }
  `;
  return useMutation<{deleteJobType: boolean}, DeleteJobTypeArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllJobType = (
  options?: MutationHookOptions<{deleteAllJobType: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllJobType {
      deleteAllJobType
    }
  `;
  return useMutation<{deleteAllJobType: boolean}>(mutation, options);
};

export const useCreateKeyword = (
  fields: GenFields<Keyword>,
  options?: MutationHookOptions<{createKeyword: Keyword}, CreateKeywordArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createKeyword ($keywordInput: KeywordInput!) {
        createKeyword(keywordInput: $keywordInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createKeyword: Keyword}, CreateKeywordArgs>(
    mutation,
    options,
  );
};

export const useUpdateKeyword = (
  fields: GenFields<Keyword>,
  options?: MutationHookOptions<{updateKeyword: Keyword}, UpdateKeywordArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateKeyword ($id: String!,$keywordInput: KeywordInput!) {
        updateKeyword(id: $id,keywordInput: $keywordInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateKeyword: Keyword}, UpdateKeywordArgs>(
    mutation,
    options,
  );
};

export const useDeleteKeyword = (
  options?: MutationHookOptions<{deleteKeyword: boolean}, DeleteKeywordArgs>,
) => {
  const mutation = gql`
    mutation deleteKeyword($id: String!) {
      deleteKeyword(id: $id)
    }
  `;
  return useMutation<{deleteKeyword: boolean}, DeleteKeywordArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllKeyword = (
  options?: MutationHookOptions<{deleteAllKeyword: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllKeyword {
      deleteAllKeyword
    }
  `;
  return useMutation<{deleteAllKeyword: boolean}>(mutation, options);
};

export const useCreateLevelPrice = (
  fields: GenFields<LevelPrice>,
  options?: MutationHookOptions<
    {createLevelPrice: LevelPrice},
    CreateLevelPriceArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createLevelPrice ($createLevelPriceInput: CreateLevelPriceInput) {
        createLevelPrice(createLevelPriceInput: $createLevelPriceInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createLevelPrice: LevelPrice}, CreateLevelPriceArgs>(
    mutation,
    options,
  );
};

export const useUpdateLevelPrice = (
  fields: GenFields<LevelPrice>,
  options?: MutationHookOptions<
    {updateLevelPrice: LevelPrice},
    UpdateLevelPriceArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateLevelPrice ($fieldsToUpdate: UpdateLevelPriceInput,$id: String) {
        updateLevelPrice(fieldsToUpdate: $fieldsToUpdate,id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateLevelPrice: LevelPrice}, UpdateLevelPriceArgs>(
    mutation,
    options,
  );
};

export const useRemoveLevelPrice = (
  options?: MutationHookOptions<
    {removeLevelPrice: boolean},
    RemoveLevelPriceArgs
  >,
) => {
  const mutation = gql`
    mutation removeLevelPrice($id: String!) {
      removeLevelPrice(id: $id)
    }
  `;
  return useMutation<{removeLevelPrice: boolean}, RemoveLevelPriceArgs>(
    mutation,
    options,
  );
};

export const useCreateNotifySetting = (
  fields: GenFields<NotifySetting>,
  options?: MutationHookOptions<
    {createNotifySetting: NotifySetting},
    CreateNotifySettingArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createNotifySetting ($notifySettingInput: NotifySettingInput!) {
        createNotifySetting(notifySettingInput: $notifySettingInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createNotifySetting: NotifySetting},
    CreateNotifySettingArgs
  >(mutation, options);
};

export const useUpdateNotifySetting = (
  fields: GenFields<NotifySetting>,
  options?: MutationHookOptions<
    {updateNotifySetting: NotifySetting},
    UpdateNotifySettingArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateNotifySetting ($id: String!,$notifySettingInput: NotifySettingInput!) {
        updateNotifySetting(id: $id,notifySettingInput: $notifySettingInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateNotifySetting: NotifySetting},
    UpdateNotifySettingArgs
  >(mutation, options);
};

export const useDeleteNotifySetting = (
  options?: MutationHookOptions<
    {deleteNotifySetting: boolean},
    DeleteNotifySettingArgs
  >,
) => {
  const mutation = gql`
    mutation deleteNotifySetting($id: String!) {
      deleteNotifySetting(id: $id)
    }
  `;
  return useMutation<{deleteNotifySetting: boolean}, DeleteNotifySettingArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllNotifySetting = (
  options?: MutationHookOptions<{deleteAllNotifySetting: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllNotifySetting {
      deleteAllNotifySetting
    }
  `;
  return useMutation<{deleteAllNotifySetting: boolean}>(mutation, options);
};

export const useCreateNotify = (
  fields: GenFields<Notify>,
  options?: MutationHookOptions<{createNotify: Notify}, CreateNotifyArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createNotify ($notifyCreateInput: NotifyCreateInput!) {
        createNotify(notifyCreateInput: $notifyCreateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createNotify: Notify}, CreateNotifyArgs>(
    mutation,
    options,
  );
};

export const useUpdateNotify = (
  fields: GenFields<Notify>,
  options?: MutationHookOptions<{updateNotify: Notify}, UpdateNotifyArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateNotify ($id: String!,$notifyUpdateInput: NotifyUpdateInput!) {
        updateNotify(id: $id,notifyUpdateInput: $notifyUpdateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateNotify: Notify}, UpdateNotifyArgs>(
    mutation,
    options,
  );
};

export const useDeleteNotify = (
  options?: MutationHookOptions<{deleteNotify: boolean}, DeleteNotifyArgs>,
) => {
  const mutation = gql`
    mutation deleteNotify($id: String!) {
      deleteNotify(id: $id)
    }
  `;
  return useMutation<{deleteNotify: boolean}, DeleteNotifyArgs>(
    mutation,
    options,
  );
};

export const useSetSeenForNotify = (
  options?: MutationHookOptions<
    {setSeenForNotify: boolean},
    SetSeenForNotifyArgs
  >,
) => {
  const mutation = gql`
    mutation setSeenForNotify($userId: String!) {
      setSeenForNotify(userId: $userId)
    }
  `;
  return useMutation<{setSeenForNotify: boolean}, SetSeenForNotifyArgs>(
    mutation,
    options,
  );
};

export const useSetOneSeenNotify = (
  options?: MutationHookOptions<
    {setOneSeenNotify: boolean},
    SetOneSeenNotifyArgs
  >,
) => {
  const mutation = gql`
    mutation setOneSeenNotify($notifyId: String!, $userId: String!) {
      setOneSeenNotify(notifyId: $notifyId, userId: $userId)
    }
  `;
  return useMutation<{setOneSeenNotify: boolean}, SetOneSeenNotifyArgs>(
    mutation,
    options,
  );
};

export const useCreatePages = (
  fields: GenFields<Pages>,
  options?: MutationHookOptions<{createPages: Pages}, CreatePagesArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createPages ($createPagesInput: CreatePagesInput) {
        createPages(createPagesInput: $createPagesInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createPages: Pages}, CreatePagesArgs>(mutation, options);
};

export const useUpdatePages = (
  fields: GenFields<Pages>,
  options?: MutationHookOptions<{updatePages: Pages}, UpdatePagesArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updatePages ($fieldsToUpdate: UpdatePagesInput,$id: String) {
        updatePages(fieldsToUpdate: $fieldsToUpdate,id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updatePages: Pages}, UpdatePagesArgs>(mutation, options);
};

export const useRemovePages = (
  options?: MutationHookOptions<{removePages: boolean}, RemovePagesArgs>,
) => {
  const mutation = gql`
    mutation removePages($id: String!) {
      removePages(id: $id)
    }
  `;
  return useMutation<{removePages: boolean}, RemovePagesArgs>(
    mutation,
    options,
  );
};

export const useUpdatePointSetting = (
  fields: GenFields<PointSetting>,
  options?: MutationHookOptions<
    {updatePointSetting: PointSetting},
    UpdatePointSettingArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updatePointSetting ($pointSettingInput: PointSettingInput!) {
        updatePointSetting(pointSettingInput: $pointSettingInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updatePointSetting: PointSetting},
    UpdatePointSettingArgs
  >(mutation, options);
};

export const useCreatePosition = (
  fields: GenFields<Position>,
  options?: MutationHookOptions<{createPosition: Position}, CreatePositionArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createPosition ($positionInput: PositionInput!) {
        createPosition(positionInput: $positionInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createPosition: Position}, CreatePositionArgs>(
    mutation,
    options,
  );
};

export const useUpdatePosition = (
  fields: GenFields<Position>,
  options?: MutationHookOptions<{updatePosition: Position}, UpdatePositionArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updatePosition ($id: String!,$positionInput: PositionInput!) {
        updatePosition(id: $id,positionInput: $positionInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updatePosition: Position}, UpdatePositionArgs>(
    mutation,
    options,
  );
};

export const useDeletePosition = (
  options?: MutationHookOptions<{deletePosition: boolean}, DeletePositionArgs>,
) => {
  const mutation = gql`
    mutation deletePosition($id: String!) {
      deletePosition(id: $id)
    }
  `;
  return useMutation<{deletePosition: boolean}, DeletePositionArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllPosition = (
  options?: MutationHookOptions<{deleteAllPosition: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllPosition {
      deleteAllPosition
    }
  `;
  return useMutation<{deleteAllPosition: boolean}>(mutation, options);
};

export const useCreateProvince = (
  fields: GenFields<ProvinceType>,
  options?: MutationHookOptions<
    {createProvince: ProvinceType},
    CreateProvinceArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createProvince ($provinceInput: ProvinceInput!) {
        createProvince(provinceInput: $provinceInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createProvince: ProvinceType}, CreateProvinceArgs>(
    mutation,
    options,
  );
};

export const useUpdateProvince = (
  fields: GenFields<ProvinceType>,
  options?: MutationHookOptions<
    {updateProvince: ProvinceType},
    UpdateProvinceArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateProvince ($id: String!,$provinceInput: ProvinceInput!) {
        updateProvince(id: $id,provinceInput: $provinceInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateProvince: ProvinceType}, UpdateProvinceArgs>(
    mutation,
    options,
  );
};

export const useDeleteProvince = (
  options?: MutationHookOptions<{deleteProvince: boolean}, DeleteProvinceArgs>,
) => {
  const mutation = gql`
    mutation deleteProvince($id: String!) {
      deleteProvince(id: $id)
    }
  `;
  return useMutation<{deleteProvince: boolean}, DeleteProvinceArgs>(
    mutation,
    options,
  );
};

export const useCreateRating = (
  fields: GenFields<Rating>,
  options?: MutationHookOptions<{createRating: Rating}, CreateRatingArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createRating ($ratingCreateInput: RatingCreateInput!) {
        createRating(ratingCreateInput: $ratingCreateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createRating: Rating}, CreateRatingArgs>(
    mutation,
    options,
  );
};

export const useUpdateRating = (
  fields: GenFields<Rating>,
  options?: MutationHookOptions<{updateRating: Rating}, UpdateRatingArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateRating ($id: String!,$ratingUpdateInput: RatingUpdateInput!) {
        updateRating(id: $id,ratingUpdateInput: $ratingUpdateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateRating: Rating}, UpdateRatingArgs>(
    mutation,
    options,
  );
};

export const useDeleteRatingById = (
  options?: MutationHookOptions<
    {deleteRatingById: boolean},
    DeleteRatingByIdArgs
  >,
) => {
  const mutation = gql`
    mutation deleteRatingById($id: String!) {
      deleteRatingById(id: $id)
    }
  `;
  return useMutation<{deleteRatingById: boolean}, DeleteRatingByIdArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllRating = (
  options?: MutationHookOptions<{deleteAllRating: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllRating {
      deleteAllRating
    }
  `;
  return useMutation<{deleteAllRating: boolean}>(mutation, options);
};

export const useCreateRecord = (
  fields: GenFields<Record>,
  options?: MutationHookOptions<{createRecord: Record}, CreateRecordArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createRecord ($recordCreateInput: RecordCreateInput!) {
        createRecord(recordCreateInput: $recordCreateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createRecord: Record}, CreateRecordArgs>(
    mutation,
    options,
  );
};

export const useUpdateRecord = (
  fields: GenFields<Record>,
  options?: MutationHookOptions<{updateRecord: Record}, UpdateRecordArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateRecord ($id: String!,$recordUpdateInput: RecordUpdateInput!) {
        updateRecord(id: $id,recordUpdateInput: $recordUpdateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateRecord: Record}, UpdateRecordArgs>(
    mutation,
    options,
  );
};

export const useDeleteRecordById = (
  options?: MutationHookOptions<
    {deleteRecordById: boolean},
    DeleteRecordByIdArgs
  >,
) => {
  const mutation = gql`
    mutation deleteRecordById($id: String!) {
      deleteRecordById(id: $id)
    }
  `;
  return useMutation<{deleteRecordById: boolean}, DeleteRecordByIdArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllRecord = (
  options?: MutationHookOptions<{deleteAllRecord: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllRecord {
      deleteAllRecord
    }
  `;
  return useMutation<{deleteAllRecord: boolean}>(mutation, options);
};

export const useCreateRecruitmentLanguage = (
  fields: GenFields<RecruitmentLanguage>,
  options?: MutationHookOptions<
    {createRecruitmentLanguage: RecruitmentLanguage},
    CreateRecruitmentLanguageArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createRecruitmentLanguage ($recruitmentLanguageInput: RecruitmentLanguageInput!) {
        createRecruitmentLanguage(recruitmentLanguageInput: $recruitmentLanguageInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createRecruitmentLanguage: RecruitmentLanguage},
    CreateRecruitmentLanguageArgs
  >(mutation, options);
};

export const useUpdateRecruitmentLanguage = (
  fields: GenFields<RecruitmentLanguage>,
  options?: MutationHookOptions<
    {updateRecruitmentLanguage: RecruitmentLanguage},
    UpdateRecruitmentLanguageArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateRecruitmentLanguage ($id: String!,$recruitmentLanguageInput: RecruitmentLanguageInput!) {
        updateRecruitmentLanguage(id: $id,recruitmentLanguageInput: $recruitmentLanguageInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateRecruitmentLanguage: RecruitmentLanguage},
    UpdateRecruitmentLanguageArgs
  >(mutation, options);
};

export const useDeleteRecruitmentLanguage = (
  options?: MutationHookOptions<
    {deleteRecruitmentLanguage: boolean},
    DeleteRecruitmentLanguageArgs
  >,
) => {
  const mutation = gql`
    mutation deleteRecruitmentLanguage($id: String!) {
      deleteRecruitmentLanguage(id: $id)
    }
  `;
  return useMutation<
    {deleteRecruitmentLanguage: boolean},
    DeleteRecruitmentLanguageArgs
  >(mutation, options);
};

export const useDeleteAllRecruitmentLanguage = (
  options?: MutationHookOptions<{deleteAllRecruitmentLanguage: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllRecruitmentLanguage {
      deleteAllRecruitmentLanguage
    }
  `;
  return useMutation<{deleteAllRecruitmentLanguage: boolean}>(
    mutation,
    options,
  );
};

export const useCreateRecruitment = (
  fields: GenFields<Recruitment>,
  options?: MutationHookOptions<
    {createRecruitment: Recruitment},
    CreateRecruitmentArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createRecruitment ($recruitmentCreateInput: RecruitmentCreateInput!) {
        createRecruitment(recruitmentCreateInput: $recruitmentCreateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createRecruitment: Recruitment}, CreateRecruitmentArgs>(
    mutation,
    options,
  );
};

export const useUpdateRecruitment = (
  fields: GenFields<Recruitment>,
  options?: MutationHookOptions<
    {updateRecruitment: Recruitment},
    UpdateRecruitmentArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateRecruitment ($id: String!,$recruitmentUpdateInput: RecruitmentUpdateInput!) {
        updateRecruitment(id: $id,recruitmentUpdateInput: $recruitmentUpdateInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateRecruitment: Recruitment}, UpdateRecruitmentArgs>(
    mutation,
    options,
  );
};

export const useDeleteRecruitment = (
  options?: MutationHookOptions<
    {deleteRecruitment: boolean},
    DeleteRecruitmentArgs
  >,
) => {
  const mutation = gql`
    mutation deleteRecruitment($id: String!) {
      deleteRecruitment(id: $id)
    }
  `;
  return useMutation<{deleteRecruitment: boolean}, DeleteRecruitmentArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllRecruitment = (
  options?: MutationHookOptions<{deleteAllRecruitment: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllRecruitment {
      deleteAllRecruitment
    }
  `;
  return useMutation<{deleteAllRecruitment: boolean}>(mutation, options);
};

export const useSetApprovedRecruitment = (
  options?: MutationHookOptions<
    {setApprovedRecruitment: boolean},
    SetApprovedRecruitmentArgs
  >,
) => {
  const mutation = gql`
    mutation setApprovedRecruitment($id: String!) {
      setApprovedRecruitment(id: $id)
    }
  `;
  return useMutation<
    {setApprovedRecruitment: boolean},
    SetApprovedRecruitmentArgs
  >(mutation, options);
};

export const useSetRecruitmentAppliedUserToApproved = (
  options?: MutationHookOptions<
    {setRecruitmentAppliedUserToApproved: boolean},
    SetRecruitmentAppliedUserToApprovedArgs
  >,
) => {
  const mutation = gql`
    mutation setRecruitmentAppliedUserToApproved(
      $id: String!
      $userId: String!
    ) {
      setRecruitmentAppliedUserToApproved(id: $id, userId: $userId)
    }
  `;
  return useMutation<
    {setRecruitmentAppliedUserToApproved: boolean},
    SetRecruitmentAppliedUserToApprovedArgs
  >(mutation, options);
};

export const useRemoveAppliedUserRecruitment = (
  options?: MutationHookOptions<
    {removeAppliedUserRecruitment: boolean},
    RemoveAppliedUserRecruitmentArgs
  >,
) => {
  const mutation = gql`
    mutation removeAppliedUserRecruitment(
      $recruitmentId: String!
      $userId: String!
    ) {
      removeAppliedUserRecruitment(
        recruitmentId: $recruitmentId
        userId: $userId
      )
    }
  `;
  return useMutation<
    {removeAppliedUserRecruitment: boolean},
    RemoveAppliedUserRecruitmentArgs
  >(mutation, options);
};

export const useCreateRequestReview = (
  fields: GenFields<RequestReview>,
  options?: MutationHookOptions<
    {createRequestReview: RequestReview},
    CreateRequestReviewArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createRequestReview ($createRequestReviewInput: CreateRequestReviewInput) {
        createRequestReview(createRequestReviewInput: $createRequestReviewInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createRequestReview: RequestReview},
    CreateRequestReviewArgs
  >(mutation, options);
};

export const useUpdateRequestReview = (
  fields: GenFields<RequestReview>,
  options?: MutationHookOptions<
    {updateRequestReview: RequestReview},
    UpdateRequestReviewArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateRequestReview ($fieldsToUpdate: UpdateRequestReviewInput!,$id: String) {
        updateRequestReview(fieldsToUpdate: $fieldsToUpdate,id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateRequestReview: RequestReview},
    UpdateRequestReviewArgs
  >(mutation, options);
};

export const useRemoveRequestReview = (
  options?: MutationHookOptions<
    {removeRequestReview: boolean},
    RemoveRequestReviewArgs
  >,
) => {
  const mutation = gql`
    mutation removeRequestReview($id: String!) {
      removeRequestReview(id: $id)
    }
  `;
  return useMutation<{removeRequestReview: boolean}, RemoveRequestReviewArgs>(
    mutation,
    options,
  );
};

export const useCreateScheduleInterview = (
  fields: GenFields<ScheduleInterview>,
  options?: MutationHookOptions<
    {createScheduleInterview: ScheduleInterview},
    CreateScheduleInterviewArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createScheduleInterview ($input: ScheduleInterviewInput!) {
        createScheduleInterview(input: $input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createScheduleInterview: ScheduleInterview},
    CreateScheduleInterviewArgs
  >(mutation, options);
};

export const useUpdateScheduleInterview = (
  fields: GenFields<ScheduleInterview>,
  options?: MutationHookOptions<
    {updateScheduleInterview: ScheduleInterview},
    UpdateScheduleInterviewArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateScheduleInterview ($id: String!,$input: ScheduleInterviewInput) {
        updateScheduleInterview(id: $id,input: $input) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateScheduleInterview: ScheduleInterview},
    UpdateScheduleInterviewArgs
  >(mutation, options);
};

export const useDeleteScheduleInterview = (
  options?: MutationHookOptions<
    {deleteScheduleInterview: boolean},
    DeleteScheduleInterviewArgs
  >,
) => {
  const mutation = gql`
    mutation deleteScheduleInterview($id: String!) {
      deleteScheduleInterview(id: $id)
    }
  `;
  return useMutation<
    {deleteScheduleInterview: boolean},
    DeleteScheduleInterviewArgs
  >(mutation, options);
};

export const useConfirmTheScheduleInterview = (
  options?: MutationHookOptions<
    {confirmTheScheduleInterview: boolean},
    ConfirmTheScheduleInterviewArgs
  >,
) => {
  const mutation = gql`
    mutation confirmTheScheduleInterview($id: String!) {
      confirmTheScheduleInterview(id: $id)
    }
  `;
  return useMutation<
    {confirmTheScheduleInterview: boolean},
    ConfirmTheScheduleInterviewArgs
  >(mutation, options);
};

export const useCancelTheScheduleInterview = (
  options?: MutationHookOptions<
    {cancelTheScheduleInterview: boolean},
    CancelTheScheduleInterviewArgs
  >,
) => {
  const mutation = gql`
    mutation cancelTheScheduleInterview($id: String!) {
      cancelTheScheduleInterview(id: $id)
    }
  `;
  return useMutation<
    {cancelTheScheduleInterview: boolean},
    CancelTheScheduleInterviewArgs
  >(mutation, options);
};

export const useUpdateSeo = (
  fields: GenFields<Seo>,
  options?: MutationHookOptions<{updateSeo: Seo}, UpdateSeoArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateSeo ($fieldsToUpdate: UpdateSeoInput!) {
        updateSeo(fieldsToUpdate: $fieldsToUpdate) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateSeo: Seo}, UpdateSeoArgs>(mutation, options);
};

export const useCreateServices = (
  fields: GenFields<Services>,
  options?: MutationHookOptions<{createServices: Services}, CreateServicesArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createServices ($createServicesInput: CreateServicesInput!) {
        createServices(createServicesInput: $createServicesInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createServices: Services}, CreateServicesArgs>(
    mutation,
    options,
  );
};

export const useUpdateServices = (
  fields: GenFields<Services>,
  options?: MutationHookOptions<{updateServices: Services}, UpdateServicesArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateServices ($id: String!,$updateServicesInput: UpdateServicesInput!) {
        updateServices(id: $id,updateServicesInput: $updateServicesInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateServices: Services}, UpdateServicesArgs>(
    mutation,
    options,
  );
};

export const useRemoveServices = (
  fields: GenFields<Services>,
  options?: MutationHookOptions<{removeServices: Services}, RemoveServicesArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation removeServices ($id: String!) {
        removeServices(id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{removeServices: Services}, RemoveServicesArgs>(
    mutation,
    options,
  );
};

export const useCreateStreet = (
  fields: GenFields<StreetType>,
  options?: MutationHookOptions<{createStreet: StreetType}, CreateStreetArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createStreet ($streetTypeInput: StreetTypeInput!) {
        createStreet(streetTypeInput: $streetTypeInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createStreet: StreetType}, CreateStreetArgs>(
    mutation,
    options,
  );
};

export const useUpdateStreet = (
  fields: GenFields<StreetType>,
  options?: MutationHookOptions<{updateStreet: StreetType}, UpdateStreetArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateStreet ($id: String!,$streetTypeInput: StreetTypeInput!) {
        updateStreet(id: $id,streetTypeInput: $streetTypeInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateStreet: StreetType}, UpdateStreetArgs>(
    mutation,
    options,
  );
};

export const useDeleteStreet = (
  options?: MutationHookOptions<{deleteStreet: boolean}, DeleteStreetArgs>,
) => {
  const mutation = gql`
    mutation deleteStreet($id: String!) {
      deleteStreet(id: $id)
    }
  `;
  return useMutation<{deleteStreet: boolean}, DeleteStreetArgs>(
    mutation,
    options,
  );
};

export const useCreateTag = (
  fields: GenFields<Tag>,
  options?: MutationHookOptions<{createTag: Tag}, CreateTagArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createTag ($tagInput: TagInput!) {
        createTag(tagInput: $tagInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createTag: Tag}, CreateTagArgs>(mutation, options);
};

export const useUpdateTag = (
  fields: GenFields<Tag>,
  options?: MutationHookOptions<{updateTag: Tag}, UpdateTagArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateTag ($id: String!,$tagInput: TagInput!) {
        updateTag(id: $id,tagInput: $tagInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateTag: Tag}, UpdateTagArgs>(mutation, options);
};

export const useDeleteTag = (
  options?: MutationHookOptions<{deleteTag: boolean}, DeleteTagArgs>,
) => {
  const mutation = gql`
    mutation deleteTag($id: String!) {
      deleteTag(id: $id)
    }
  `;
  return useMutation<{deleteTag: boolean}, DeleteTagArgs>(mutation, options);
};

export const useDeleteAllTag = (
  options?: MutationHookOptions<{deleteAllTag: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllTag {
      deleteAllTag
    }
  `;
  return useMutation<{deleteAllTag: boolean}>(mutation, options);
};

export const useCreateTypes = (
  fields: GenFields<Types>,
  options?: MutationHookOptions<{createTypes: Types}, CreateTypesArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createTypes ($createTypesInput: CreateTypesInput!) {
        createTypes(createTypesInput: $createTypesInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createTypes: Types}, CreateTypesArgs>(mutation, options);
};

export const useUpdateTypes = (
  fields: GenFields<Types>,
  options?: MutationHookOptions<{updateTypes: Types}, UpdateTypesArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateTypes ($fieldsToUpdate: UpdateTypesInput!,$id: String!) {
        updateTypes(fieldsToUpdate: $fieldsToUpdate,id: $id) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateTypes: Types}, UpdateTypesArgs>(mutation, options);
};

export const useRemoveTypes = (
  options?: MutationHookOptions<{removeTypes: boolean}, RemoveTypesArgs>,
) => {
  const mutation = gql`
    mutation removeTypes($id: String!) {
      removeTypes(id: $id)
    }
  `;
  return useMutation<{removeTypes: boolean}, RemoveTypesArgs>(
    mutation,
    options,
  );
};

export const useUpdateNewPassword = (
  fields: GenFields<User>,
  options?: MutationHookOptions<
    {updateNewPassword: User},
    UpdateNewPasswordArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateNewPassword ($id: String!,$phoneNumber: String!,$password: String!) {
        updateNewPassword(id: $id,phoneNumber: $phoneNumber,password: $password) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateNewPassword: User}, UpdateNewPasswordArgs>(
    mutation,
    options,
  );
};

export const useUpdateUserPassword = (
  fields: GenFields<User>,
  options?: MutationHookOptions<
    {updateUserPassword: User},
    UpdateUserPasswordArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateUserPassword ($updatePasswordInput: UpdatePasswordInput!) {
        updateUserPassword(updatePasswordInput: $updatePasswordInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateUserPassword: User}, UpdateUserPasswordArgs>(
    mutation,
    options,
  );
};

export const useUpdateUserProfileByAdmin = (
  fields: GenFields<User>,
  options?: MutationHookOptions<
    {updateUserProfileByAdmin: User},
    UpdateUserProfileByAdminArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateUserProfileByAdmin ($id: String!,$password: String!,$updateUserInput: UpdateUserInput!) {
        updateUserProfileByAdmin(id: $id,password: $password,updateUserInput: $updateUserInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateUserProfileByAdmin: User},
    UpdateUserProfileByAdminArgs
  >(mutation, options);
};

export const useUpdateUserEmailPassword = (
  fields: GenFields<User>,
  options?: MutationHookOptions<
    {updateUserEmailPassword: User},
    UpdateUserEmailPasswordArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateUserEmailPassword ($idUser: String,$email: String,$password: String) {
        updateUserEmailPassword(idUser: $idUser,email: $email,password: $password) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateUserEmailPassword: User},
    UpdateUserEmailPasswordArgs
  >(mutation, options);
};

export const useUpdateUserProfile = (
  fields: GenFields<User>,
  options?: MutationHookOptions<
    {updateUserProfile: User},
    UpdateUserProfileArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateUserProfile ($updateUserInput: UpdateUserInput!) {
        updateUserProfile(updateUserInput: $updateUserInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateUserProfile: User}, UpdateUserProfileArgs>(
    mutation,
    options,
  );
};

export const useCreateUserByAdmin = (
  fields: GenFields<User>,
  options?: MutationHookOptions<
    {createUserByAdmin: User},
    CreateUserByAdminArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createUserByAdmin ($createUserInput: CreateUserInput) {
        createUserByAdmin(createUserInput: $createUserInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createUserByAdmin: User}, CreateUserByAdminArgs>(
    mutation,
    options,
  );
};

export const useCreateEmployer = (
  fields: GenFields<User>,
  options?: MutationHookOptions<{createEmployer: User}, CreateEmployerArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createEmployer ($createUserInput: CreateUserInput!) {
        createEmployer(createUserInput: $createUserInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createEmployer: User}, CreateEmployerArgs>(
    mutation,
    options,
  );
};

export const useCreateEmployerWithEmptyCompany = (
  fields: GenFields<User>,
  options?: MutationHookOptions<
    {createEmployerWithEmptyCompany: User},
    CreateEmployerWithEmptyCompanyArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createEmployerWithEmptyCompany ($createUserInput: CreateUserInput!) {
        createEmployerWithEmptyCompany(createUserInput: $createUserInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createEmployerWithEmptyCompany: User},
    CreateEmployerWithEmptyCompanyArgs
  >(mutation, options);
};

export const useCreateCandidate = (
  fields: GenFields<User>,
  options?: MutationHookOptions<{createCandidate: User}, CreateCandidateArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createCandidate ($createUserInput: CreateCandidateInput!) {
        createCandidate(createUserInput: $createUserInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createCandidate: User}, CreateCandidateArgs>(
    mutation,
    options,
  );
};

export const useDeleteUser = (
  options?: MutationHookOptions<{deleteUser: boolean}, DeleteUserArgs>,
) => {
  const mutation = gql`
    mutation deleteUser($id: String!) {
      deleteUser(id: $id)
    }
  `;
  return useMutation<{deleteUser: boolean}, DeleteUserArgs>(mutation, options);
};

export const useSetPermissionByAdmin = (
  options?: MutationHookOptions<
    {setPermissionByAdmin: boolean},
    SetPermissionByAdminArgs
  >,
) => {
  const mutation = gql`
    mutation setPermissionByAdmin($id: String!, $permission: String!) {
      setPermissionByAdmin(id: $id, permission: $permission)
    }
  `;
  return useMutation<{setPermissionByAdmin: boolean}, SetPermissionByAdminArgs>(
    mutation,
    options,
  );
};

export const useUpdateUserByAdmin = (
  fields: GenFields<User>,
  options?: MutationHookOptions<
    {updateUserByAdmin: User},
    UpdateUserByAdminArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateUserByAdmin ($id: String!,$updateUserInput: UpdateUserInput!) {
        updateUserByAdmin(id: $id,updateUserInput: $updateUserInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateUserByAdmin: User}, UpdateUserByAdminArgs>(
    mutation,
    options,
  );
};

export const useSetEnabledUser = (
  options?: MutationHookOptions<{setEnabledUser: boolean}, SetEnabledUserArgs>,
) => {
  const mutation = gql`
    mutation setEnabledUser($id: String!, $enabled: Boolean!) {
      setEnabledUser(id: $id, enabled: $enabled)
    }
  `;
  return useMutation<{setEnabledUser: boolean}, SetEnabledUserArgs>(
    mutation,
    options,
  );
};

export const useSetIsHotUser = (
  options?: MutationHookOptions<{setIsHotUser: boolean}, SetIsHotUserArgs>,
) => {
  const mutation = gql`
    mutation setIsHotUser($id: String!, $isHot: Boolean) {
      setIsHotUser(id: $id, isHot: $isHot)
    }
  `;
  return useMutation<{setIsHotUser: boolean}, SetIsHotUserArgs>(
    mutation,
    options,
  );
};

export const useSetSubscribedCompany = (
  options?: MutationHookOptions<
    {setSubscribedCompany: boolean},
    SetSubscribedCompanyArgs
  >,
) => {
  const mutation = gql`
    mutation setSubscribedCompany($userId: String!, $companyId: String!) {
      setSubscribedCompany(userId: $userId, companyId: $companyId)
    }
  `;
  return useMutation<{setSubscribedCompany: boolean}, SetSubscribedCompanyArgs>(
    mutation,
    options,
  );
};

export const useSetUnSubscribedCompany = (
  options?: MutationHookOptions<
    {setUnSubscribedCompany: boolean},
    SetUnSubscribedCompanyArgs
  >,
) => {
  const mutation = gql`
    mutation setUnSubscribedCompany($userId: String!, $companyId: String!) {
      setUnSubscribedCompany(userId: $userId, companyId: $companyId)
    }
  `;
  return useMutation<
    {setUnSubscribedCompany: boolean},
    SetUnSubscribedCompanyArgs
  >(mutation, options);
};

export const useSetSeenRecruitment = (
  options?: MutationHookOptions<
    {setSeenRecruitment: boolean},
    SetSeenRecruitmentArgs
  >,
) => {
  const mutation = gql`
    mutation setSeenRecruitment($userId: String!, $recruitmentId: String!) {
      setSeenRecruitment(userId: $userId, recruitmentId: $recruitmentId)
    }
  `;
  return useMutation<{setSeenRecruitment: boolean}, SetSeenRecruitmentArgs>(
    mutation,
    options,
  );
};

export const useSetSeenCompany = (
  options?: MutationHookOptions<{setSeenCompany: boolean}, SetSeenCompanyArgs>,
) => {
  const mutation = gql`
    mutation setSeenCompany($userId: String!, $companyId: String!) {
      setSeenCompany(userId: $userId, companyId: $companyId)
    }
  `;
  return useMutation<{setSeenCompany: boolean}, SetSeenCompanyArgs>(
    mutation,
    options,
  );
};

export const useSetAppliedRecruitment = (
  options?: MutationHookOptions<
    {setAppliedRecruitment: boolean},
    SetAppliedRecruitmentArgs
  >,
) => {
  const mutation = gql`
    mutation setAppliedRecruitment($userId: String!, $recruitmentId: String!) {
      setAppliedRecruitment(userId: $userId, recruitmentId: $recruitmentId)
    }
  `;
  return useMutation<
    {setAppliedRecruitment: boolean},
    SetAppliedRecruitmentArgs
  >(mutation, options);
};

export const useSetSavedRecruitment = (
  options?: MutationHookOptions<
    {setSavedRecruitment: boolean},
    SetSavedRecruitmentArgs
  >,
) => {
  const mutation = gql`
    mutation setSavedRecruitment($userId: String!, $recruitmentId: String!) {
      setSavedRecruitment(userId: $userId, recruitmentId: $recruitmentId)
    }
  `;
  return useMutation<{setSavedRecruitment: boolean}, SetSavedRecruitmentArgs>(
    mutation,
    options,
  );
};

export const useResetPassword = (
  options?: MutationHookOptions<{resetPassword: boolean}, ResetPasswordArgs>,
) => {
  const mutation = gql`
    mutation resetPassword(
      $username: String!
      $newPassword: String!
      $oldPassword: String!
    ) {
      resetPassword(
        username: $username
        newPassword: $newPassword
        oldPassword: $oldPassword
      )
    }
  `;
  return useMutation<{resetPassword: boolean}, ResetPasswordArgs>(
    mutation,
    options,
  );
};

export const useAdminGivePointToEmployer = (
  options?: MutationHookOptions<
    {adminGivePointToEmployer: boolean},
    AdminGivePointToEmployerArgs
  >,
) => {
  const mutation = gql`
    mutation adminGivePointToEmployer(
      $adminId: String!
      $employerId: String!
      $point: Int!
    ) {
      adminGivePointToEmployer(
        adminId: $adminId
        employerId: $employerId
        point: $point
      )
    }
  `;
  return useMutation<
    {adminGivePointToEmployer: boolean},
    AdminGivePointToEmployerArgs
  >(mutation, options);
};

export const useSetIsVerifiedUser = (
  options?: MutationHookOptions<
    {setIsVerifiedUser: boolean},
    SetIsVerifiedUserArgs
  >,
) => {
  const mutation = gql`
    mutation setIsVerifiedUser($id: String!, $isVerified: Boolean) {
      setIsVerifiedUser(id: $id, isVerified: $isVerified)
    }
  `;
  return useMutation<{setIsVerifiedUser: boolean}, SetIsVerifiedUserArgs>(
    mutation,
    options,
  );
};

export const useRemoveSavedRecruitmentUser = (
  options?: MutationHookOptions<
    {removeSavedRecruitmentUser: boolean},
    RemoveSavedRecruitmentUserArgs
  >,
) => {
  const mutation = gql`
    mutation removeSavedRecruitmentUser(
      $userId: String!
      $recruitmentId: String!
    ) {
      removeSavedRecruitmentUser(userId: $userId, recruitmentId: $recruitmentId)
    }
  `;
  return useMutation<
    {removeSavedRecruitmentUser: boolean},
    RemoveSavedRecruitmentUserArgs
  >(mutation, options);
};

export const useTurnOnSeekingJob = (
  options?: MutationHookOptions<{turnOnSeekingJob: boolean}>,
) => {
  const mutation = gql`
    mutation turnOnSeekingJob {
      turnOnSeekingJob
    }
  `;
  return useMutation<{turnOnSeekingJob: boolean}>(mutation, options);
};

export const useTurnOffSeekingJob = (
  options?: MutationHookOptions<{turnOffSeekingJob: boolean}>,
) => {
  const mutation = gql`
    mutation turnOffSeekingJob {
      turnOffSeekingJob
    }
  `;
  return useMutation<{turnOffSeekingJob: boolean}>(mutation, options);
};

export const useCreateWard = (
  fields: GenFields<WardType>,
  options?: MutationHookOptions<{createWard: WardType}, CreateWardArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createWard ($wardInput: WardInput!) {
        createWard(wardInput: $wardInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{createWard: WardType}, CreateWardArgs>(mutation, options);
};

export const useUpdateWard = (
  fields: GenFields<WardType>,
  options?: MutationHookOptions<{updateWard: WardType}, UpdateWardArgs>,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateWard ($id: String!,$wardInput: WardInput!) {
        updateWard(id: $id,wardInput: $wardInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<{updateWard: WardType}, UpdateWardArgs>(mutation, options);
};

export const useDeleteWard = (
  options?: MutationHookOptions<{deleteWard: boolean}, DeleteWardArgs>,
) => {
  const mutation = gql`
    mutation deleteWard($id: String!) {
      deleteWard(id: $id)
    }
  `;
  return useMutation<{deleteWard: boolean}, DeleteWardArgs>(mutation, options);
};

export const useCreateWorkLocation = (
  fields: GenFields<WorkLocation>,
  options?: MutationHookOptions<
    {createWorkLocation: WorkLocation},
    CreateWorkLocationArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation createWorkLocation ($workLocationInput: WorkLocationCreateInput!) {
        createWorkLocation(workLocationInput: $workLocationInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {createWorkLocation: WorkLocation},
    CreateWorkLocationArgs
  >(mutation, options);
};

export const useUpdateWorkLocation = (
  fields: GenFields<WorkLocation>,
  options?: MutationHookOptions<
    {updateWorkLocation: WorkLocation},
    UpdateWorkLocationArgs
  >,
) => {
  const fragment = queryBuilder(fields);
  const {isString, isFragment, fragmentName} = guessFragmentType(fragment);
  const mutation = gql`
      mutation updateWorkLocation ($id: String!,$workLocationInput: WorkLocationUpdateInput!) {
        updateWorkLocation(id: $id,workLocationInput: $workLocationInput) {
          ${isString ? fragment : '...' + fragmentName}
        }
      } ${isFragment ? fragment : ''}
      `;

  return useMutation<
    {updateWorkLocation: WorkLocation},
    UpdateWorkLocationArgs
  >(mutation, options);
};

export const useDeleteWorkLocation = (
  options?: MutationHookOptions<
    {deleteWorkLocation: boolean},
    DeleteWorkLocationArgs
  >,
) => {
  const mutation = gql`
    mutation deleteWorkLocation($id: String!) {
      deleteWorkLocation(id: $id)
    }
  `;
  return useMutation<{deleteWorkLocation: boolean}, DeleteWorkLocationArgs>(
    mutation,
    options,
  );
};

export const useDeleteAllWorkLocation = (
  options?: MutationHookOptions<{deleteAllWorkLocation: boolean}>,
) => {
  const mutation = gql`
    mutation deleteAllWorkLocation {
      deleteAllWorkLocation
    }
  `;
  return useMutation<{deleteAllWorkLocation: boolean}>(mutation, options);
};
