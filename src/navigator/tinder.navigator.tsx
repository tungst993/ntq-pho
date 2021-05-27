import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import TinderAppScreen from '../screens/tinder';
import { AppRoutes } from './app-routes';

export type TinderStackParamList = {
  [AppRoutes.TINDER_APP]: undefined;
  [AppRoutes.TINDER_PROFILE]: undefined;
  [AppRoutes.TINDER_MESSAGE]: undefined;
  [AppRoutes.TINDER_CONVERSATION]: undefined;
};

const Stack = createNativeStackNavigator<TinderStackParamList>();

const TinderNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Profile',
        headerShown: false,
      }}
      initialRouteName={AppRoutes.TINDER_APP}>
      <Stack.Screen name={AppRoutes.TINDER_APP} component={TinderAppScreen} />
    </Stack.Navigator>
  );
};

export default TinderNavigator;
