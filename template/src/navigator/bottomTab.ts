import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type IBottomParamList = {
  Home: undefined;
  Job: undefined;
  Company: undefined;
  Notify: undefined;
  Profile: undefined;
};

export const RootBottomTab = createBottomTabNavigator<IBottomParamList>();
