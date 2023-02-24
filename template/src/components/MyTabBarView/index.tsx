import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { NavigationState, SceneRendererProps } from 'react-native-tab-view';
import { colors, responsive, typos } from '@common/styles';

const MyTabBarView = (
  props: SceneRendererProps & {
    navigationState: NavigationState<any>;
    paddingX: boolean;
  }
) => {
  const { navigationState, jumpTo, paddingX = false } = props;
  const { index, routes } = navigationState;
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: paddingX ? responsive(20) : 0,
      }}
      style={{
        flexGrow: 0,
        flexShrink: 0,
      }} 
        showsHorizontalScrollIndicator={false}
      >
      {routes.map((value, ind) => {
        const match = ind === index;
        return (
          <TouchableOpacity
            key={ind}
            onPress={() => {
              jumpTo(value.key);
            }}>
            <View
              style={[
                styles.container,
                {
                  backgroundColor: match ? '#fff' : 'transparent',
                },
              ]}>
              <Text
                style={[
                  { ...typos.sm.bold },
                  {
                    color: match ? colors.PRIMARY : colors.BODY,
                  },
                ]}>
                {value.title}{' '}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsive(12),
    borderRadius: responsive(4),
  },
});

export default MyTabBarView;
