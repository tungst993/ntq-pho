import React from 'react';
import type { StackNavigationProp } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { AppRoutes } from './app-routes';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from './root.navigator';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './app.navigator';
import HomeScreen from '../screens/home/home.screen';
// import SettingScreen from '../screens/profile/setting.screen';

export type ProfileStackParamList = {
  [AppRoutes.PROFILE_VIEW_SCREEN]: undefined;
  [AppRoutes.SETTING]: { name: string } | undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export type ProfileStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.APP>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, AppRoutes.PROFILE_TAB>,
    StackNavigationProp<ProfileStackParamList>
  >
>;
export const ProfileNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      title: 'Profile',
      headerShown: false,
    }}>
    <Stack.Screen name={AppRoutes.PROFILE_VIEW_SCREEN} component={HomeScreen} />
    <Stack.Screen
      name={AppRoutes.SETTING}
      options={{
        title: 'Setting',
      }}
      component={HomeScreen}
    />
  </Stack.Navigator>
);
