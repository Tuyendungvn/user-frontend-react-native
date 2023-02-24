import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, responsive, typos } from '@common/styles';
import { genSVGProps } from '@common/utils/base';
import { SvgProps } from 'react-native-svg';
import {
  CompanyFill,
  HomeFill,
  UserFill,
  JobFill,
  NotifyFill,
} from '@assets/svg';

import { Company, Home, User, Job, Notify, NotifyActive } from '@assets/svg';
import { useAppSelector } from '@hooks/useRedux';
import { IRootState } from '@redux';
import { Box } from 'native-base';
interface IProps extends BottomTabBarProps {}

const MyTabBar: React.FC<IProps> = ({ state, descriptors, navigation }) => {
  const { isActiveNotify } = useAppSelector(
    (state: IRootState) => state.notify
  );

  const [mapIconFillBottomTab, setIconFillBottomTab] = useState({
    Home: HomeFill,
    Job: JobFill,
    Company: CompanyFill,
    Notify: NotifyFill,
    Profile: UserFill,
  });
  const [mapIconBottomTab, setIconBottomTab] = useState({
    Home: Home,
    Job: Job,
    Company: Company,
    Notify: Notify,
    Profile: User,
  });

  useEffect(() => {
    if (isActiveNotify === true) {
      setIconBottomTab({
        Home: Home,
        Job: Job,
        Company: Company,
        Notify: NotifyActive,
        Profile: User,
      });
    } else {
      setIconBottomTab({
        Home: Home,
        Job: Job,
        Company: Company,
        Notify: Notify,
        Profile: User,
      });
    }
  }, [isActiveNotify]);

  return (
    <Box style={[styles.container]} safeAreaBottom>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const Icon: React.FC<SvgProps> = isFocused
          ? mapIconFillBottomTab[route.name]
          : mapIconBottomTab[route.name];

        return (
          <TouchableOpacity
            key={`key_Bottom_tab_${route.name}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View
              style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
              <Icon
                {...genSVGProps(
                  24,
                  24,
                  isFocused ? colors.PRIMARY : colors.BODY
                )}
              />
              <Text
                style={{
                  color: isFocused ? colors.PRIMARY : colors.BODY,
                  ...styles.text,
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
    paddingVertical: 10,
    paddingHorizontal: responsive(20),
    borderTopColor: colors.LINE,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  text: {
    ...typos.xs.normal,
    fontWeight: '300',
    fontSize: 10,
    marginTop: responsive(4),
  },
});

export default MyTabBar;
