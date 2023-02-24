import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useField, useFormikContext } from 'formik';
import { Require, EyeOff, EyeOn, BackSpace } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';
import { responsive, typos, colors, hitSlop } from '@common/styles';

type IType = 'text' | 'password' | 'number' | 'textarea';

interface IInputProps<T = any> extends TextInputProps {
  name: string;
  label: string;
  require?: boolean;
  type?: IType;
  placeholder?: string;
  autoClear?: boolean;
}

const Input = <T,>(props: IInputProps<T>) => {
  const {
    label,
    name,
    require = false,
    type = 'text',
    placeholder = '',
    autoClear = false,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(true);
  const [field, meta] = useField(name);
  const { setFieldValue, handleBlur } = useFormikContext();
  const isError: boolean = !!meta.touched && !!meta.error;
  const onTogglePassword = (show: boolean) => {
    setShowPassword(show);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.group}>
        <Text style={styles.label}>{label}</Text>
        {require && (
          <Require {...genSVGProps(responsive(10), responsive(10))} />
        )}
      </View>
      <View
        style={[
          styles.InputWrapper,
          {
            borderColor: isError ? colors.ERROR : colors.LINE,
            height: type === 'textarea' ? responsive(100) : responsive(48),
            alignItems: type === 'textarea' ? 'flex-start' : 'center',
          },
        ]}>
        <TextInput
          style={styles.input}
          onChangeText={text => setFieldValue(name, text)}
          onBlur={() => handleBlur(name)}
          value={field.value}
          placeholder={placeholder}
          placeholderTextColor={isError ? colors.ERROR : colors.BODY}
          secureTextEntry={showPassword && type === 'password' ? true : false}
          keyboardType={type == 'number' ? 'numeric' : 'default'}
          hitSlop={hitSlop}
          multiline={type === 'textarea'}
          {...rest}
        />
        {field.value.length > 0 && autoClear && (
          <TouchableOpacity
            hitSlop={hitSlop}
            onPress={() => setFieldValue(name, '')}>
            <BackSpace {...genSVGProps(20, 20)} />
          </TouchableOpacity>
        )}
        {type === 'password' && (
          <TouchableOpacity
            hitSlop={hitSlop}
            onPress={() => onTogglePassword(!showPassword)}
            style={{
              marginLeft: responsive(10),
            }}>
            {showPassword ? <EyeOn /> : <EyeOff />}
          </TouchableOpacity>
        )}
      </View>
      {isError && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{meta.error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...typos.lg.bold,
    marginRight: responsive(4),
  },
  InputWrapper: {
    marginTop: responsive(0),
    paddingHorizontal: responsive(10),
    paddingVertical: responsive(4),
    borderRadius: responsive(8),
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
  },
  input: {
    ...typos.sm.normal,
    color: colors.BLACK,
    flex: 1,
  },
  backSpace: {
    marginLeft: responsive(10),
  },
  messageContainer: {
    marginTop: responsive(8),
  },
  messageText: {
    ...typos.xs.normal,
    color: colors.ERROR,
  },
});

export default Input;
