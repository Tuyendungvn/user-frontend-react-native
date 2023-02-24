declare interface String {
  prettyDate: () => string;
  prettyMoney: () => string;
  prettyHour: () => string;
  prettyDateReverse: () => string;
  isValidUrl: () => boolean;
  truncate: (size: number) => string;
}

declare interface Array<T> {
  has: (item: T, key?: keyof T) => boolean;
}

declare interface Date {
  prettyDate: () => string;
}
