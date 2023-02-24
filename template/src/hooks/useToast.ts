import Toast from 'react-native-toast-message';
export type IType = 'success' | 'error';
export const useToast = () => {
  const showToast = (type: IType, message) => {
    Toast.show({
      type,
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
      position: 'top',
      topOffset: 30,
    
    });
  };

  return {
    showToast,
  };
};
