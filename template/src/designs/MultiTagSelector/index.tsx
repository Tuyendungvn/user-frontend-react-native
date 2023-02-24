import React from 'react';
import { colors, responsive } from '@common/styles';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface IMultiTagSelectorProps<K = any> {
  name: string;
  label: string;
  require?: boolean;

  keyValue?: string;
  keyLabel?: string;
  options: K[];
  optionSelected: K[];
  onSelect: (value: K[]) => void;
}

const MultiTagSelector = <K,>(props: IMultiTagSelectorProps) => {
  const {
    name,
    label,
    require,
    keyLabel = 'name',
    keyValue = '_id',
    optionSelected,
    options,
    onSelect,
  } = props;

  const handleRemove = (item: K) => {
    let listTemp = optionSelected.filter(
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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.listTagWrapper}>
        {options.map(option => (
          <TouchableOpacity
            style={[
              styles.tagWrapper,
              {
                backgroundColor: optionSelected.has(option, keyValue)
                  ? '#EA4E1B'
                  : colors.WHITE,
                borderColor: optionSelected.includes(option)
                  ? '#EA4E1B'
                  : colors.GRAY,
              },
            ]}
            key={option[keyValue]}
            onPress={() => {
              optionSelected.has(option, keyValue)
                ? handleRemove(option)
                : handleAddOption(option);
            }}>
            <Text
              style={[
                styles.tagLabel,
                {
                  color: optionSelected.has(option, keyValue)
                    ? colors.WHITE
                    : colors.BLACK,
                },
              ]}>
              {option[keyLabel]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  listTagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: responsive(15),
  },
  tagWrapper: {
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(15),
    alignItems: 'center',
    marginBottom: responsive(10),
    marginRight: responsive(10),
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tagLabel: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
  },
  label: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 19,
  },
});

export default MultiTagSelector;
