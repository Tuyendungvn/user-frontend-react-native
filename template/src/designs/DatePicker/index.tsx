import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import { useField , useFormikContext } from 'formik';
import { Require } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';
import { responsive, typos, colors } from '@common/styles';

import DatePicker from 'react-native-date-picker';

import { DateIcon } from '@assets/svg';
import { formatDate, stringToDate } from '@common/functions';

interface IInputProps<T = any> {

  name: string;
  label: string;
  require?: boolean;
  placeholder?: string;
  maximumDate?: Date;
  minimumDate?: Date;
}

const Input = <T,>(props: IInputProps<T>) => {
  const {
  
    label,
    name,
    require = false,
    placeholder = '',
    maximumDate,
    minimumDate,
    ...rest
  } = props;

  const [isPicker, setIsPicker] = useState(false);
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isError: boolean = !!meta.touched && !!meta.error;
  const color = useColorScheme();
  const currentDate = stringToDate(field.value || '');
  return (
    <View style={styles.wrapper}>
      <View style={styles.group}>
        <Text style={styles.label}>{label}</Text>
        {require && (
          <Require {...genSVGProps(responsive(10), responsive(10))} />
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          setIsPicker(true);
        }}>
        <View
          style={[
            styles.InputWrapper,
            {
              borderColor: isError ? colors.ERROR : colors.LINE,
            },
          ]}>
          <View
            style={{
              flex: 1,
            }}>
            {!field.value ? (
              <Text
                style={{
                  color: isError ? colors.ERROR : colors.BODY,
                }}>
                {placeholder}
              </Text>
            ) : (
              <Text style={styles.textSelect}>{field.value}</Text>
            )}
          </View>

          <DateIcon {...genSVGProps(responsive(20), responsive(20))} />
          <DatePicker
            modal
            mode="date"
            open={isPicker}
            date={currentDate}
            onConfirm={date => {
              setIsPicker(false);
              const dateTemp = formatDate(date);
              setFieldValue(name, dateTemp);
            }}
            onCancel={() => {
              setIsPicker(false);
            }}
            cancelText="Hủy"
            confirmText="Xác nhận"
            textColor={color == 'dark' ? colors.WHITE : colors.BLACK}
            title={placeholder}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            theme="auto"
          />
        </View>
      </TouchableOpacity>

      {isError && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{meta?.error}</Text>
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
    height: responsive(48),
    alignItems: 'center',
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
  textSelect: {
    ...typos.sm.normal,
  },
});

export default Input;
