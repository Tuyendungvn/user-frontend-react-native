import React, {useEffect} from 'react';
import {RootStack} from '@navigator';

//screens
import WelcomeScreen from '@screens/WelcomeScreen';

//components
import {renderAuthStack} from './components/auth';
import {renderMainStack} from './components/main';

//hooks
import {useAppSelector} from '@hooks/useRedux';
import {useAuth} from '@hooks/useAuth';

export const RootApp = () => {
  const {bootstrapAsync} = useAuth();
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const {isDoneFirstTime, userInfor} = useAppSelector(state => state.auth);
  const renderAllScreen = () => {
    if (!isDoneFirstTime)
      return <RootStack.Screen name="welcome" component={WelcomeScreen} />;
    if (!userInfor) return renderAuthStack();
    return renderMainStack();
  };

  return (
    <RootStack.Navigator
      screenOptions={props => {
        return {
          headerShown: false,
        };
      }}>
      {renderAllScreen()}
    </RootStack.Navigator>
  );
};
