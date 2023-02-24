import React from 'react';
import { RootStack } from '@navigator';
import BottomTab from '../bottomTab';
import { renderStackProfile } from '../Profile';
import { renderStackRecruitment } from '../Job';
import { renderStackCompany } from '../Company';
import { renderStackNotify } from '../Notify';

export const renderMainStack = () => {
  return (
    <>
      <RootStack.Screen name="Main" component={BottomTab} />
      {renderStackProfile()}
      {renderStackRecruitment()}
      {renderStackCompany()}
      {renderStackNotify()}
    </>
  );
};
