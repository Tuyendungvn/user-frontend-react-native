import React from 'react';
import { Modal, View, StyleSheet, ScrollView } from 'react-native';
import { colors, responsive } from '@common/styles';
import Button from '@designs/Button';

interface ICreateCVModal {
  isOpen: boolean;
  onClose: () => void;
  webView: string;
}

const CreateCVModal: React.FC<ICreateCVModal> = ({ isOpen, onClose }) => {
  return (
    <Modal visible={isOpen} onRequestClose={onClose} style={styles.container}>
      <ScrollView style={styles.container}></ScrollView>

      <View
        style={{
          marginTop: 'auto',
          height: responsive(140),
          padding: responsive(20),
          backgroundColor: colors.WHITE,
          shadowOpacity: 0.8,
          shadowColor: colors.GRAY,
          justifyContent: 'space-between',
        }}>
        <Button title="Button 1" type="outline" />
        <Button title="Button 2" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  headingWrapper: {
    height: responsive(50),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsive(20),
  },
  span: {
    height: responsive(4),
    width: responsive(80),
    backgroundColor: colors.LINE,
    borderRadius: 8,
    marginVertical: 'auto',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },
  bodyItem: {
    marginTop: responsive(35),
  },
});

export default CreateCVModal;
