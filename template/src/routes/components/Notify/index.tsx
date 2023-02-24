import React from 'react';
import { RootStack } from '@navigator';
import NotifyDetail from '@screens/NotifyScreens/DetailScreen';

export const renderStackNotify = () => {
  return (
    <>
      <RootStack.Screen name="NotifyDetail" component={NotifyDetail} />
    </>
  );
};
