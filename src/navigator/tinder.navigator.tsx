import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import ConversationScreen from '../screens/ConversationScreen';
import TinderAppScreen from '../screens/tinder';
import TinderInAppScreen from '../screens/tinder/App';
import { AppRoutes } from './app-routes';

export type TinderStackParamList = {
  [AppRoutes.TINDER_APP]: undefined;
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

export type TinderAppStackParamList = {
  [AppRoutes.TINDER_APP_SCREEN]: undefined;
  [AppRoutes.TINDER_CONVERSATION]: {
    chatId: number;
    handle: string;
    avatar: string;
    targetId: number;
    isTinder?: boolean;
  };
};

const TinderAppStack = createNativeStackNavigator<TinderAppStackParamList>();

export const TinderAppNavigator = () => {
  return (
    <TinderAppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TinderAppStack.Screen name={AppRoutes.TINDER_APP_SCREEN} component={TinderInAppScreen} />
      <TinderAppStack.Screen name={AppRoutes.TINDER_CONVERSATION} component={ConversationScreen} />
    </TinderAppStack.Navigator>
  );
};

export default TinderNavigator;
