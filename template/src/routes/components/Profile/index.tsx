import React from 'react';
import { RootStack } from '@navigator';
import AboutAccount from '@screens/ProfileScreens/AboutAccount';
import MyJob from '@screens/ProfileScreens/MyJob';
import EmployerViewProfile from '@screens/ProfileScreens/EmployerViewProfile';
import ApplyEvaluated from '@screens/ProfileScreens/ApplyEvaluated/MainScreen';
import ApplyEvaluatedDetail from '@screens/ProfileScreens/ApplyEvaluated/DetailScreen';
import ChangePassword from '@screens/ProfileScreens/ChangePassword';
import CreateCV from '@screens/ProfileScreens/CreateCV';

export const renderStackProfile = () => {
  return (
    <>
      <RootStack.Screen name="AboutAccount" component={AboutAccount} />
      <RootStack.Screen name="MyJob" component={MyJob} />
      <RootStack.Screen
        name="EmployerViewProfile"
        component={EmployerViewProfile}
      />
      <RootStack.Screen name="ApplyEvaluated" component={ApplyEvaluated} />
      <RootStack.Screen
        name="ApplyEvaluatedDetail"
        component={ApplyEvaluatedDetail}
      />
      <RootStack.Screen name="ChangePassword" component={ChangePassword} />
      <RootStack.Screen name="CreateCV" component={CreateCV} />
    </>
  );
};
