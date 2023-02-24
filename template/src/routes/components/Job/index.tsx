import React from 'react';
import { RootStack } from '@navigator';
import RecruitmentDetail from '@screens/JobScreens/DetailScreen';

export const renderStackRecruitment = () => {
  return (
    <>
      <RootStack.Screen
        name="RecruitmentDetail"
        component={RecruitmentDetail}
      />
    </>
  );
};
