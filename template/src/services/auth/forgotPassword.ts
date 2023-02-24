import {AbenlaApiResponse, GenFields} from '@apiCaller';

export const fragmentSendOTPVoice: GenFields<AbenlaApiResponse> = [
  'Code',
  'Message',
];
