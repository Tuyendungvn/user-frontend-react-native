import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import {SvgProps} from 'react-native-svg';

import {ISetFieldValues} from '@typings';
import {useField, useFormikContext} from 'formik';
import {Require, Dropdown, XWhite} from '@assets/svg';
import {genSVGProps} from '@common/utils/base';
import {responsive, typos, colors} from '@common/styles';

import ModalSelectPicker from '@components/ModalSelectPicker';
import {Box} from 'native-base';
interface IInputProps<K = any> {
  name: string;
  label: string;
  require?: boolean;
  placeholder?: string;

  keyValue?: string;
  keyLabel?: string;
  options: K[];
  optionSelected: K[];
  onSelect: (value: K[]) => void;

  Icon?: React.FC<SvgProps>;
}

const MultiSelect = <K,>(props: IInputProps<K>) => {
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
  const {setFieldValue} = useFormikContext();
  const isError: boolean = !!meta.touched && !!meta.error;

  useEffect(() => {
    if (optionSelected?.length > 0) {
      setFieldValue(name, optionSelected[0][keyValue]);
    }
  }, [optionSelected]);

  const onHandleRemove = (item: K) => {
    const listTemp = optionSelected.filter(
      value => JSON.stringify(value) !== JSON.stringify(item),
    );

    onSelect([...listTemp]);
  };
  return (
    <Box style={styles.wrapper} safeArea>
      <View style={styles.group}>
        <Text style={styles.label}>{label}</Text>
        {require && (
          <Require {...genSVGProps(responsive(10), responsive(10))} />
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          setModal(true);
        }}
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
          {optionSelected?.length === 0 ? (
            <Text
              style={{
                color: isError ? colors.ERROR : colors.BODY,
              }}>
              {placeholder}
            </Text>
          ) : (
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>
              {optionSelected?.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    style={styles.optionWrapper}
                    onPress={() => {
                      onHandleRemove(item);
                    }}>
                    <Text style={styles.labelOption}>{item[keyLabel]}</Text>
                    <TouchableOpacity>
                      <XWhite
                        {...genSVGProps(
                          responsive(10),
                          responsive(10),
                          colors.WHITE,
                          undefined,
                        )}
                      />
                    </TouchableOpacity>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
        <TouchableOpacity
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
          <Text style={styles.messageText}>{meta?.error}</Text>
        </View>
      )}
      <ModalSelectPicker
        isOpen={modal}
        onClose={() => setModal(false)}
        Icon={Icon ? Icon : undefined}
        options={options}
        onChange={(modalOptionsSelected: K) => {
          const cloned = JSON.parse(JSON.stringify(optionSelected));
          cloned.push(modalOptionsSelected);
          onSelect([...cloned]);
        }}
        keyLabel={keyLabel}
        keyValue={keyValue}
      />
    </Box>
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
    minHeight: responsive(48),
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
    ...typos.xs.normal,
    color: colors.ERROR,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  optionWrapper: {
    paddingHorizontal: responsive(10),
    paddingVertical: responsive(2),
    backgroundColor: colors.PRIMARY,
    borderRadius: 4,
    maxHeight: responsive(40),
    flexDirection: 'row',
    alignItems: 'center',
    margin: responsive(3),
  },
  labelOption: {
    ...typos.xs.bold,
    color: colors.WHITE,
    marginRight: responsive(10),
  },
});

export default MultiSelect;
