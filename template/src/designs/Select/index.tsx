import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import { SvgProps } from 'react-native-svg';

import { ISetFieldValues } from '@typings';
import { useField, useFormikContext } from 'formik';
import { Require, Dropdown } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';
import { responsive, typos, colors } from '@common/styles';

import ModalSelectPicker from '@components/ModalSelectPicker';
interface ISelectPros<T = any, K = any> {
  name: string;
  label: string;
  require?: boolean;
  placeholder?: string;

  keyValue?: string;
  keyLabel?: string;
  options: K[];
  optionSelected: K | null;
  onSelect: (value: K) => void;

  Icon?: React.FC<SvgProps>;
}

const Select = <T, K>(props: ISelectPros<T, K>) => {
  const {
    onSelect,
    label,
    name,
    require = false,
    placeholder = '',
    keyValue = '_id',
    keyLabel = 'name',
    optionSelected,
    options,
    Icon,
  } = props;

  const [modal, setModal] = useState(false);
  const [field, meta] = useField(name);
  const isError: boolean = !!meta.touched && !!meta.error;
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (optionSelected) {
      setFieldValue(name, optionSelected[keyValue]);
    }
  }, [optionSelected]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.group}>
        <Text style={styles.label}>{label}</Text>
        {require && (
          <Require {...genSVGProps(responsive(10), responsive(10))} />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setModal(true)}
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
          {!optionSelected ? (
            <Text
              style={{
                color: isError ? colors.ERROR : colors.BODY,
              }}>
              {placeholder}
            </Text>
          ) : (
            <Text style={styles.textSelect}>{optionSelected[keyLabel]}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => {
            setModal(true);
          }}>
          <Dropdown
            {...genSVGProps(responsive(20), responsive(20), undefined, {
              marginLeft: responsive(5),
              padding: responsive(5),
            })}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {isError && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{meta.error}</Text>
        </View>
      )}
      <ModalSelectPicker
        isOpen={modal}
        onClose={() => setModal(false)}
        Icon={Icon ? Icon : undefined}
        options={options}
        onChange={onSelect}
        keyLabel={keyLabel}
        keyValue={keyValue}
      />
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
    height: responsive(48),
    marginTop: responsive(0),
    paddingHorizontal: responsive(10),
    paddingVertical: responsive(4),
    borderRadius: responsive(8),
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    ...typos.sm.normal,
    color: colors.BODY,
    flex: 1,
  },
  messageContainer: {
    marginTop: responsive(8),
  },
  messageText: {
    ...typos.sm.normal,
    color: colors.ERROR,
  },
  textSelect: {
    ...typos.sm.normal,
  },
  buttonWrapper: {
    width: responsive(50),
    flexDirection: 'row-reverse',
  },
});

export default Select;
