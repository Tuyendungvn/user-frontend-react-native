import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const unsubscribe = messaging().onMessage(async remoteMessage => {
  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
});

export { unsubscribe };
