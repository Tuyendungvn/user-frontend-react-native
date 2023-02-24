import { colors } from '@common/styles';

export  type ITypeButton =  | 'primary'
| 'outline'
| 'no_outline'
| 'responsive'
| 'disabled'
| 'outline_disable'
| 'with-icon'
export const genStyle = (
  type: ITypeButton
) => {
  let backgroundColor = colors.PRIMARY;
  let color = colors.WHITE;
  let borderWidth = 0;
  let borderColor = colors.PRIMARY;
  let opacity = 1;
  switch (type) {
    case 'outline':
      backgroundColor = colors.WHITE;
      color = colors.PRIMARY;
      borderWidth = 1;
      break;
    case 'no_outline':
      backgroundColor = colors.WHITE;
      color = colors.PRIMARY;
      borderWidth = 0;
      break;
    case 'outline_disable':
      backgroundColor = colors.WHITE;
      color = colors.BODY;
      borderWidth = 1;
      borderColor = colors.LINE;
      break;
    case 'disabled':
      opacity = 0.8;
      break;
    case 'with-icon':
      backgroundColor = colors.WHITE;
      color = colors.BLACK;
      borderWidth = 1;
      borderColor = colors.LINE;
      break;
    default:
      break;
  }

  return {
    borderColor,
    backgroundColor,
    color,
    borderWidth,
    opacity,
  };
};
