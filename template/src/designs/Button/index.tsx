import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
} from 'react-native';

import { SvgProps } from 'react-native-svg';

import { genStyle, genSVGProps } from '@common/utils/base';
import { hitSlop, responsive, typos } from '@common/styles';

import { ITypeButton } from '@common/utils/base';
export interface Props extends TouchableOpacityProps {
  Icon?: React.FC<SvgProps>;
  type?: ITypeButton;
  loading?: boolean;
  stylesCustom?: StyleProp<ViewStyle>;
  stylesCustomIcon?: ViewStyle;
  title?: string;
}

const Button = (props: Props) => {
  const {
    stylesCustom,
    stylesCustomIcon,
    type = 'primary',
    title,
    loading = false,
    Icon,
    ...rest
  } = props;
  const { backgroundColor, borderColor, borderWidth, color } = genStyle(type);
  return (
    <TouchableOpacity
      disabled={type === 'disabled' || loading}
      hitSlop={hitSlop}
      style={[
        stylesCustom,
        styles.container,
        {
          opacity: loading || type === 'disabled' ? 0.7 : 1,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
      ]}
      {...rest}>
      <View style={styles.titleContainer}>
        {loading && (
          <View
            style={{
              marginRight: responsive(10),
            }}>
            <ActivityIndicator
              hidesWhenStopped
              animating={loading}
              size="small"
              color={color}
            />
          </View>
        )}

        {Icon && (
          <Icon
            {...genSVGProps(24, 24, color, {
              marginRight: responsive(10),
              ...stylesCustomIcon,
            })}
          />
        )}
        <Text
          style={[
            styles.title,
            {
              color,
            },
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


export default Button;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive(8),
    paddingHorizontal: responsive(15),
    minWidth: responsive(120),
    borderRadius: responsive(8
      ),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typos.sm.bold,
    textAlign: 'center',
  },
});
