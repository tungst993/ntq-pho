import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { AppRoutes } from './app-routes';
import ProfileScreen from '../screens/profile';
import TinderNavigator from './tinder.navigator';

export type ProfileStackParamList = {
  [AppRoutes.PROFILE_VIEW_SCREEN]: undefined;
  [AppRoutes.TINDER_NAVIGATOR]: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={AppRoutes.PROFILE_VIEW_SCREEN}>
    <Stack.Screen name={AppRoutes.PROFILE_VIEW_SCREEN} component={ProfileScreen} />
    <Stack.Screen name={AppRoutes.TINDER_NAVIGATOR} component={TinderNavigator} />
  </Stack.Navigator>
);
