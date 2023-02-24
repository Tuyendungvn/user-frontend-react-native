import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import { colors, responsive, typos } from '@common/styles';
import Button from '@designs/Button';

interface IAlertProps {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const AlertDialog: React.FC<IAlertProps> = props => {
  const { title = '', message = '', open, onClose, onConfirm } = props;
  return (
    <Modal
      visible={open}
      animationType="fade"
      onRequestClose={onClose}
      transparent>
      <View style={styles.wrapper}>
        <View style={styles.container}></View>
        <View style={styles.mainContainer}>
          <View
            style={{
              padding: responsive(20),
              backgroundColor: '#fff',
              borderRadius: responsive(4),
              minWidth: responsive(300),
            }}>
            <Text
              style={{
                ...typos.xl.bold,
                textAlign: 'center',
              }}>
              {title}
            </Text>
            <Text
              style={{
                ...typos.sm.normal,
                textAlign: 'center',
                color: colors.BODY,
              }}>
              {message}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: responsive(20),
              }}>
              <Button onPress={onClose} title="Đóng" type="outline" />

              <Button
                onPress={onConfirm}
                title="Đồng ý"
                stylesCustom={{
                  marginLeft: responsive(20),
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.BODY,
    opacity: 0.4,
    zIndex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
});

export default AlertDialog;
