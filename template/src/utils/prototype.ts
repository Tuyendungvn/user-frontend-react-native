import dayjs from 'dayjs';

String.prototype.prettyDate = function () {
  return dayjs(String(this)).format('DD/MM/YYYY');
};

String.prototype.prettyHour = function () {
  return this.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
};

String.prototype.prettyDateReverse = function () {
  return dayjs(String(this)).format('YYYY-MM-DD');
};

String.prototype.prettyMoney = function () {
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

String.prototype.truncate = function (size) {
  if (this.length > size) {
    this.toString().substr(0, size - 1) + '...';
  }
  return this.toString();
};

function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

String.prototype.isValidUrl = function () {
  return validURL(this);
};

const isEqual = <T>(a: T, b: T) => JSON.stringify(a) === JSON.stringify(b);

Array.prototype.has = function (item, key) {
  if (key) {
    return this.some(currentItem => currentItem[key] === item[key]);
  }
  return this.some(currentItem => isEqual(item, currentItem));
};
