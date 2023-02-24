import React from 'react';
import { RootStack } from '@navigator';
import CompanyDetail from '@screens/CompanyScreens/DetailScreen';

export const renderStackCompany = () => {
  return (
    <>
      <RootStack.Screen name="CompanyDetail" component={CompanyDetail} />
    </>
  );
};
