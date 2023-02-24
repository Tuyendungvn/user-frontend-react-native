import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Touchable,
} from 'react-native';

import { SvgProps } from 'react-native-svg';
import { useField, useFormikContext } from 'formik';
import { Require, Dropdown, XWhite } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';
import { responsive, typos, colors } from '@common/styles';

import ModalSelectPicker from '@components/ModalSelectPicker';

interface IInputProps<K = any> {
  label: string;
  require?: boolean;
  placeHolder?: string;
  options: K[];
  optionSelected: K[];
  onSelect: (value: K[]) => void;

  keyValue?: string;
  keyLabel?: string;

  Icon?: React.FC<SvgProps>;
}

const SimpleMultiSelect = <K,>(props: IInputProps<K>) => {
  const {
    onSelect,
    require,
    label,
    placeHolder = '',
    keyValue = '_id',
    keyLabel = 'name',
    optionSelected,
    options,
    Icon,
  } = props;

  const [modal, setModal] = useState<boolean>(false);

  const onHandleRemove = (item: K) => {
    const listTemp = optionSelected.filter(
      value => JSON.stringify(value) !== JSON.stringify(item)
    );
    onSelect([...listTemp]);
  };

  const handleAddOption = (item: K) => {
    const cloned = JSON.parse(JSON.stringify(optionSelected));
    cloned.push(item);
    onSelect([...cloned]);
  };

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
          if (optionSelected.length <= 0) {
            setModal(true);
          }
        }}
        style={[styles.InputWrapper, { borderColor: colors.LINE }]}>
        <View style={{ flex: 1 }}>
          {optionSelected.length === 0 ? (
            <Text style={{ color: colors.BODY }}>{placeHolder}</Text>
          ) : (
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              {optionSelected.map((item, index) => {
                return (
                  <View key={index} style={styles.optionWrapper}>
                    <Text style={styles.labelOption}>{item[keyLabel]}</Text>
                    <TouchableOpacity onPress={() => onHandleRemove(item)}>
                      <XWhite
                        {...genSVGProps(
                          responsive(10),
                          responsive(10),
                          colors.WHITE,
                          undefined
                        )}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <TouchableOpacity onPress={() => setModal(true)}>
          <Dropdown
            {...genSVGProps(responsive(20), responsive(20), undefined, {
              marginLeft: responsive(5),
              padding: responsive(5),
            })}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <ModalSelectPicker
        isOpen={modal}
        onClose={() => setModal(false)}
        Icon={Icon ? Icon : undefined}
        options={options}
        onChange={(modalOptionsSelected: K) => {
          handleAddOption(modalOptionsSelected);
        }}
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

export default SimpleMultiSelect;
