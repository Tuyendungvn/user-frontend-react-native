import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { colors, responsive, typos } from '@common/styles';

interface IProps {
  title: string;
  description: string;
  onPress: () => void;
}
const Note: React.FC<IProps> = ({ title, description, onPress }) => {
  return (
    <View style={styles.textContainer}>
      <Text
        style={{
          color: colors.BODY,
          marginRight: responsive(4),
          ...typos.sm.normal,
        }}>
        {title}
      </Text>
      <TouchableWithoutFeedback
        onPress={() => {
          onPress();
        }}>
        <Text style={{ color: colors.PRIMARY }}>{description} </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
export default Note;
