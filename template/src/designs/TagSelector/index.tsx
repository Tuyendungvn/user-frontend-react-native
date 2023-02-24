import React from 'react';
import { colors, responsive } from '@common/styles';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ITagSelectorProps<K = any> {
  name: string;
  label: string;
  require?: boolean;

  keyValue?: string;
  keyLabel?: string;
  options: K[];
  optionSelected: K;
  onSelect: (value: K) => void;
}

const TagSelector: React.FC<ITagSelectorProps> = props => {
  const {
    name,
    label,
    require,
    keyLabel = 'name',
    keyValue = '_id',
    options,
    optionSelected,
    onSelect,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.listTagWrapper}>
        {options.map(option => (
          <TouchableOpacity
            style={[
              styles.tagWrapper,
              {
                backgroundColor:
                  optionSelected?.[keyValue] === option?.[keyValue]
                    ? '#EA4E1B'
                    : colors.WHITE,
                borderColor:
                  optionSelected?.[keyValue] === option?.[keyValue]
                    ? '#EA4E1B'
                    : colors.GRAY,
              },
            ]}
            key={option[keyValue]}
            onPress={() => {
              option?.[keyValue] === optionSelected?.[keyValue]
                ? onSelect(null)
                : onSelect(option);
            }}>
            <Text
              style={[
                styles.tagLabel,
                {
                  color:
                    optionSelected?.[keyValue] === option?.[keyValue]
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
    borderWidth: 2,
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

export default TagSelector;
