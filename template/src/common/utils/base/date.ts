// import { IDate } from '@typings';
// import { Alert } from 'react-native';

// export type Language = 'vi' | 'en';

// export const parseDateToString = (d: Date, language: Language = 'vi') => {
//   const days =
//     language === 'vi'
//       ? {
//           0: 'Chủ nhật',
//           1: 'Thứ 2',
//           2: 'Thứ 3',
//           3: 'Thứ 4',
//           4: 'Thứ 5',
//           5: 'Thứ 6',
//           6: 'Thứ 7',
//         }
//       : {
//           0: 'Sunday',
//           1: 'Monday',
//           2: 'Tuesday',
//           3: 'Wednesday',
//           4: 'Thursday',
//           5: 'Friday',
//           6: 'Saturday',
//         };
//   const months =
//     language === 'vi'
//       ? {
//           0: 'Tháng 1',
//           1: 'Tháng 2',
//           2: 'Tháng 3',
//           3: 'Tháng 4',
//           4: 'Tháng 5',
//           5: 'Tháng 6',
//           6: 'Tháng 7',
//           7: 'Tháng 8',
//           8: 'Tháng 9',
//           9: 'Tháng 10',
//           10: 'Tháng 11',
//           11: 'Tháng 12',
//         }
//       : {
//           0: 'January',
//           1: 'February',
//           2: 'March',
//           3: 'April',
//           4: 'May',
//           5: 'June',
//           6: 'July',
//           7: 'August',
//           8: 'September',
//           9: 'October',
//           10: 'November',
//           11: 'December',
//         };

//   let day = days[d.getDay()];
//   const date = d.getDate();
//   let month = months[d.getMonth()];
//   const year = d.getFullYear();

//   return day + ',  ' + date + ' ' + month + ', ' + year;
// };
// export const parseDateToStringDMY = (d?: Date | string) => {
//   if (d === undefined || d === null) {
//     return '';
//   }
//   if (typeof d === 'string' && d.length <= 10) {
//     return d;
//   }
//   const dateRs = new Date(d);
//   const month = (dateRs.getMonth() + 1).toString().padStart(2, '0');
//   return dateRs.getDate() + '/' + month + '/' + dateRs.getFullYear();
// };

// export const parseDateToStringMDY = (d?: Date | string) => {
//   if (d === undefined) {
//     return '';
//   }
//   const dateRs = new Date(d);
//   const month = (dateRs.getMonth() + 1).toString().padStart(2, '0');
//   return (
//     month + '-' + dateRs.getDate() + '-' + dateRs.getFullYear() + '00:00:00'
//   );
// };

// export const getFormatBirthDay = (value: string) => {
//   return value
//     .replace(/\D/g, '')
//     .replace(/\./g, '')
//     .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
// };

// export const timeToTime = (date1: Date, date2: Date) => {
//   const minuteS =
//     date1.getMinutes() > 10 ? date1.getMinutes() : `0${date1.getMinutes()}`;
//   const minuteE =
//     date2.getMinutes() > 10 ? date2.getMinutes() : `0${date2.getMinutes()}`;
//   return `${date1.getHours()}:${minuteS} - ${date2.getHours()}:${minuteE}`;
// };

// export const getListDaysByMonth = (numberOfWeek = 4): [IDate[], number] => {
//   const names = Object.freeze(['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']);
//   const date = new Date();
//   let dayOfWeek = date.getDay();
//   if (dayOfWeek === 0) {
//     dayOfWeek = 7;
//   }
//   date.setDate(date.getDate() - dayOfWeek + 1);
//   const limitDate = new Date(date);
//   limitDate.setDate(limitDate.getDate() + 7 * numberOfWeek);
//   const result = [];
//   let id = 0;
//   while (date.getTime() !== limitDate.getTime()) {
//     result.push({
//       id,
//       name: names[date.getDay()],
//       day: date.getDate(),
//       month: date.getMonth() + 1,
//       year: date.getFullYear(),
//     });
//     date.setDate(date.getDate() + 1);
//     id++;
//   }
//   return [result, dayOfWeek - 1];
// };

// export const convertToDate = (obj: IDate, s?: string) => {
//   const separator = s || '-';
//   if (obj.id === undefined || obj.id === null) {
//     return 'Chọn ngày';
//   }
//   const { day, month, year } = obj;
//   return `${day.toString().padStart(2, '0')}${separator}${month
//     .toString()
//     .padStart(2, '0')}${separator}${year}`;
// };
// export const convertGetMonth = (obj: IDate) => {
//   if (obj.id === undefined || obj.id === null) {
//     return 'Chọn ngày';
//   }
//   const { month, year } = obj;
//   return `Tháng ${month}, ${year}`;
// };
// export const convertToStandardStringDate = (date: string | Date) => {
//   let res = '';
//   let dateResult = date;
//   if (typeof date === 'string' && date.length <= 10) {
//     if (!validateStringDate(date)) {
//       Alert.alert('Không đúng định dạng ngày...', 'dd/mm/yyyy');
//       return;
//     } else if (date.length === 10) {
//       dateResult = moveMonthAndDay(date);
//     }
//     res = dateResult.toString();
//   } else {
//     res = parseDateToStringMDY(dateResult);
//   }
//   return res;
// };
// export const validateStringDate = (stringDate: string) => {
//   if (stringDate.length < 10) {
//     return false;
//   }
//   const validate = stringDate.search(/\d{2}\/\d{2}\/\d{4}/g);
//   return validate !== -1;
// };
// export const moveMonthAndDay = (date: string) => {
//   if (validateStringDate(date)) {
//     const dateElements = date.split('/');
//     return `${dateElements[1]}/${dateElements[0]}/${dateElements[2]}`;
//   }
//   return date;
// };
// export const convertToStringExpiredDate = (expiredDate?: Date) => {
//   const stringDate = parseDateToStringDMY(expiredDate);
//   const result = stringDate === '' ? 'Vô thời hạn' : stringDate;
//   return result;
// };
