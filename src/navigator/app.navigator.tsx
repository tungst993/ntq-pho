import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeNavigator } from './home.navigator';
import { ProfileNavigator } from './profile.navigator';
import { AppRoutes } from './app-routes';
import TabBarComponent from './TarBarComponent';

import { useRecoilState } from 'recoil';
import { notificationNavigateState } from '../recoil/app/atoms';
import { useNavigation } from '@react-navigation/core';

export type MainTabParamList = {
  [AppRoutes.HOME_TAB]: undefined;
  [AppRoutes.NOTIFICATION_TAB]: undefined;
  [AppRoutes.PROFILE_TAB]: undefined;
  [AppRoutes.SEARCH_SCREEN]: undefined;
};

export type AppStackParamList = {
  [AppRoutes.MAIN_TAB]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const Stack = createStackNavigator<AppStackParamList>();

export const MainNavigator = () => (
  <Tab.Navigator lazy={true} tabBarOptions={{ showLabel: false }} tabBar={(props) => <TabBarComponent {...props} />}>
    <Tab.Screen name={AppRoutes.HOME_TAB} component={HomeNavigator} />
    <Tab.Screen name={AppRoutes.NOTIFICATION_TAB} component={HomeNavigator} />
    <Tab.Screen name={AppRoutes.PROFILE_TAB} component={ProfileNavigator} />
    <Tab.Screen name={AppRoutes.SEARCH_SCREEN} component={HomeNavigator} />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const { navigate } = useNavigation();
  const [notificationNavigate, setNotificationNavigate] = useRecoilState(notificationNavigateState);

  useEffect(() => {
    if (notificationNavigate.screen) {
      navigate(notificationNavigate.screen, { ...notificationNavigate.params });
      setNotificationNavigate({});
    }
  }, [notificationNavigate, navigate, setNotificationNavigate]);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen options={{ headerShown: false }} name={AppRoutes.MAIN_TAB} component={MainNavigator} />
    </Stack.Navigator>
  );
};
