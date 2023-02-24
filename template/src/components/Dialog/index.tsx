import { Modal } from 'react-native';
import React from 'react';

interface IProps {
  open: boolean;
  onClose: () => void;
}
const Dialog: React.FC<IProps> = props => {
  const { open, children, onClose } = props;
  return (
    <Modal visible={open} animationType="slide" onRequestClose={onClose}>
      {children}
    </Modal>
  );
};

export default Dialog;
