import dayjs from 'dayjs';

export const formatDate = (date: Date | string | undefined | null) => {
  if (!date) return '';
  return dayjs(date).format('YYYY/MM/DD');
};

export const stringToDate = (date: string) => {
  if (!date) return new Date();
  const yr1 = parseInt(date.substring(0, 4));
  const mon1 = parseInt(date.substring(5, 7));
  const dt1 = parseInt(date.substring(8, 10));
  const date1 = new Date(yr1, mon1 - 1, dt1);
  return date1;
};
