export const formatAddressToString = (
  province?: string,
  district?: string,
  ward?: string,
  street?: string,
) => {
  const initArr = [street, ward, district, province];
  const filterArr = initArr.filter((i) => i !== undefined);
  let addressString = '';
  if (filterArr.length < 1) {
    return '';
  }
  filterArr.forEach((e) => {
    addressString += e + ', ';
  });
  return addressString.slice(0, addressString.length - 2);
};
