import { colors } from "@common/styles";

export const genBorderInputField = (
  isFocus: boolean,
  isWarning: boolean,
  typeError: string,
) => {
  return isFocus
    ? isWarning
      ? typeError === 'only_helper'
        ? colors.PRIMARY
        : colors.ERROR
      : colors.PRIMARY
    : colors.LINE;
};
