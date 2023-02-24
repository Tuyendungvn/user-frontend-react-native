import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { colors, responsive, typos } from '@common/styles';
import { genSVGProps } from '@common/utils/base';
import { Search } from '@assets/svg';

interface IMultiTagWithSearchProps<K = any> {
  name: string;
  label: string;
  require?: boolean;

  keyValue?: string;
  keyLabel?: string;
  options: K[];
  optionSelected: K[];
  onSelect: (value: K[]) => void;
}

const MultiTagWithSearch = <K,>(props: IMultiTagWithSearchProps) => {
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
  const [search, setSearch] = useState<string>('');

  let listTemp: K[] = [];
  if (options.length > 0) {
    listTemp = options.filter(
      value =>
        value[keyLabel].toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }

  const onHandleRemove = (item: K) => {
    let listTemp = optionSelected.filter(
      value => JSON.stringify(value) !== JSON.stringify(item)
    );
    onSelect([...listTemp]);
  };

  const handleAddOption = (item: K) => {
    optionSelected.push(item);
    onSelect([...optionSelected]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.searchContainer}>
        <View style={styles.iconWrapper}>
          <Search {...genSVGProps(responsive(20), responsive(20))} />
          <TextInput
            value={search}
            onChangeText={value => setSearch(value)}
            placeholder={'Tìm kiếm...'}
            placeholderTextColor={colors.BODY}
            autoFocus
            style={{
              height: responsive(40),
              flex: 1,
              ...typos.sm.normal,
            }}
          />
        </View>
      </View>

      <View style={styles.listTagWrapper}>
        {listTemp.map(option => (
          <TouchableOpacity
            style={[
              styles.tagWrapper,
              {
                backgroundColor: optionSelected.includes(option)
                  ? '#EA4E1B'
                  : colors.WHITE,
                borderColor: optionSelected.includes(option)
                  ? '#EA4E1B'
                  : colors.GRAY,
              },
            ]}
            key={option[keyValue]}
            onPress={() => {
              optionSelected.includes(option)
                ? onHandleRemove(option)
                : handleAddOption(option);
            }}>
            <Text
              style={[
                styles.tagLabel,
                {
                  color: optionSelected.includes(option)
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
  searchContainer: {
    height: responsive(50),
    marginTop: responsive(15),
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(8),
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.LINE,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default MultiTagWithSearch;
