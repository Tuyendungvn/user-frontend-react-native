import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {View} from 'native-base';
import {colors, responsive, typos} from '@common/styles';
import {X} from '@assets/svg';
import {genSVGProps} from '@common/utils/base';

import {SvgProps} from 'react-native-svg';
import {Search} from '@assets/svg';

interface IModalPicker<T> {
  isOpen: boolean;
  onClose: () => void;
  Icon?: React.FC<SvgProps> | undefined;
  options: T[];
  onChange: (value: T) => void;
  keyValue?: string;
  keyLabel?: string;
}

const ModalPicker = <T,>({
  isOpen,
  onClose,
  Icon,
  options,
  onChange,
  keyLabel = 'name',
}: IModalPicker<T>) => {
  const [search, setSearch] = useState('');

  let listTemp: T[] = [];

  if (options.length > 0) {
    listTemp = options.filter(
      value =>
        value[keyLabel].toLowerCase().indexOf(search.toLowerCase()) !== -1,
    );
  }

  return (
    <Modal
      style={{flex: 1}}
      animationType="slide"
      visible={isOpen}
      transparent={false}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.searchContainer} _ios={{marginTop: responsive(40)}}>
        <View style={styles.iconWrapper}>
          {Icon ? (
            <Icon {...genSVGProps(responsive(20), responsive(20))} />
          ) : (
            <Search {...genSVGProps(responsive(20), responsive(20))} />
          )}
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
        <TouchableOpacity
          onPress={() => {
            onClose();
          }}>
          <X
            {...genSVGProps(12, 12, colors.BODY, {
              marginLeft: responsive(10),
            })}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={listTemp}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  onChange(item);
                  onClose();
                }}>
                <View
                  key={index}
                  style={[
                    styles.item,
                    {
                      borderBottomWidth:
                        index === listTemp.length - 1
                          ? 0
                          : StyleSheet.hairlineWidth,
                    },
                  ]}>
                  <Text style={{...typos.xs.bold}}>{item[keyLabel]}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default ModalPicker;

const styles = StyleSheet.create({
  searchContainer: {
    height: responsive(50),
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(8),
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.LINE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: responsive(10),
  },
  item: {
    paddingHorizontal: responsive(24),
    paddingVertical: responsive(12),
    width: '100%',
    borderStyle: 'solid',
    borderColor: colors.LINE,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  buttonWrapper: {
    width: responsive(100),
    height: responsive(20),
    flexDirection: 'row-reverse',
  },
});
