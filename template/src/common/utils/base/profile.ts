// import { HTTP } from '@services';

// export const getDataLogin = async (
//   provider: 'phone' | 'facebook' | 'google' | 'zalo',
//   idToken: string,
// ) => {
//   try {
//     const { path, params } = genPathAndParams(provider, idToken);
//     const { data } = await HTTP.post(path, params);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
// export const showBadRequest = (
//   error: any,
//   setBadRequest: (show: boolean) => void,
// ) => {
//   if (error.status && error.status >= 400) {
//     setBadRequest(true);
//   }
// };

// const genPathAndParams = (
//   provider: 'phone' | 'facebook' | 'google' | 'zalo',
//   idToken: string,
// ) => {
//   return {
//     path:
//       provider === 'zalo' ? '/auth/zalo/callback' : `auth/firebase/${provider}`,
//     params:
//       provider === 'zalo'
//         ? {
//             code: idToken,
//           }
//         : {
//             idToken,
//           },
//   };
// };
