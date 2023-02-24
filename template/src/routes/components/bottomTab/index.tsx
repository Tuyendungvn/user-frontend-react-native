import React from 'react';
import { RootBottomTab } from '@navigator';
import HomeScreen from '@screens/HomeScreens/MainScreen';
import JobScreen from '@screens/JobScreens/MainScreen';
import CompanyScreen from '@screens/CompanyScreens/MainScreen';
import NotifyScreen from '@screens/NotifyScreens/MainScreen';
import ProfileScreen from '@screens/ProfileScreens/MainScreen';

import MyTabBar from '@components/MyBottomTabBar';
const BottomTab = () => {
  return (
    <RootBottomTab.Navigator
      initialRouteName="Home"
      
      screenOptions={{
        headerShown: false,
      
      }}
      
      tabBar={props => <MyTabBar {...props} />}>
      <RootBottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
        }}
      />
      <RootBottomTab.Screen
        name="Company"
        component={CompanyScreen}
        options={{
          title: 'Công ty',
        }}
      />
      <RootBottomTab.Screen
        name="Notify"
        component={NotifyScreen}
        options={{
          title: 'Thông báo',
        
        }}
        
      />

      <RootBottomTab.Screen
        name="Job"
        component={JobScreen}
        options={{
          title: 'Việc làm',
        }}
      />
      <RootBottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Tài khoản',
        }}
      />
    </RootBottomTab.Navigator>
  );
};

export default BottomTab;
