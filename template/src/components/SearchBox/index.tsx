import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import React, { useState } from 'react';
import { colors, responsive, typos } from '@common/styles';
import { Search, Filter } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';
import useConstant from '@hooks/useConstant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

interface ISearchBoxProps {
  placeholder?: string;
  withFilterIcon?: boolean;
  onFetchData: (text: string) => void;
  CustomDialog?: React.FC<{
    isOpen: boolean;
    onClose: () => void;
  }>;
}

const DELAY = 300;

const SearchBox: React.FC<ISearchBoxProps> = props => {
  const { CustomDialog, placeholder, withFilterIcon, onFetchData } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState<string>('');

  const searchAPIDebounced = useConstant(() =>
    AwesomeDebouncePromise(onFetchData, DELAY)
  );

  const handleTextChange = async (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const newText = e.nativeEvent.text;
    searchAPIDebounced(newText);
    setText(newText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Search {...genSVGProps(responsive(20), responsive(20))} />
        <TextInput
          autoFocus
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.BODY}
          value={text}
          onChange={handleTextChange}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setIsOpen(true);
        }}>
        <View style={styles.iconFilter}>
          {withFilterIcon ? (
            <Filter {...genSVGProps(responsive(20), responsive(20))} />
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
      {CustomDialog ? (
        <CustomDialog
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    height: responsive(48),
    marginTop: responsive(0),
    borderRadius: responsive(8),
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.LINE,
  },
  input: {
    ...typos.sm.normal,
    color: colors.BLACK,
    flex: 1,
    marginLeft: responsive(10),
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive(10),
    paddingVertical: responsive(4),
  },
  iconFilter: {
    paddingHorizontal: responsive(20),
    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.LINE,
    height: '100%',
    justifyContent: 'center',
  },
});
