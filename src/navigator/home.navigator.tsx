import React from 'react';
import type { StackNavigationProp } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';

import { AppRoutes } from './app-routes';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from './root.navigator';
import type { MainTabParamList } from './app.navigator';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home.screen';
import CreatePostScreen from '../screens/home/container/createPost';
import { DetailPost } from '../screens/home/DetailPost';

export type HomeStackParamList = {
  [AppRoutes.HOME]: undefined;
  [AppRoutes.CREATE_POST]: undefined;
  [AppRoutes.DETAIL_POST]: { id: string };
};

const Stack = createStackNavigator<HomeStackParamList>();

export type HomeStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.APP>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, AppRoutes.HOME_TAB>,
    StackNavigationProp<HomeStackParamList>
  >
>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, AppRoutes.APP>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, AppRoutes.HOME_TAB>,
    StackNavigationProp<HomeStackParamList, AppRoutes.HOME>
  >
>;

export const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    mode="modal">
    <Stack.Screen name={AppRoutes.HOME} component={HomeScreen} />
    <Stack.Screen name={AppRoutes.CREATE_POST} component={CreatePostScreen} />
    <Stack.Screen name={AppRoutes.DETAIL_POST} component={DetailPost} />
  </Stack.Navigator>
);
