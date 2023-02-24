import { formatDate } from '@common/functions';

Date.prototype.prettyDate = function () {
  return formatDate(this);
};

String.prototype.prettyDate = function () {
  return formatDate(String(this));
};
export {};
