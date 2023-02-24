export const getFormatPhone = (phone: string) => {
  if (phone.length !== 12) {
    return phone;
  }
  const value = phone.substring(1);
  return value
    .replace(/\D/g, '')
    .replace(/\./g, '')
    .replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
};
