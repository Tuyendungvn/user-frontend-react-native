import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0); 
  const [ isShow , setIsShow] = useState(false);
  function onKeyboardDidShow(e: KeyboardEvent) { // Remove type here if not using TypeScript
    setKeyboardHeight(e.endCoordinates.height);
    setIsShow(true);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
    setIsShow(false);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return {
    isShow,
    keyboardHeight
  }
};
