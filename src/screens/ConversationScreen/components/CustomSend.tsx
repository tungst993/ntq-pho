import React from 'react';
import { StyleSheet } from 'react-native';
import { Send } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeStatic } from '../../../theme';
import { IconSizes } from '../../../theme/Icon';

const CustomSend: React.FC<{ isTinder: boolean }> = (sendProps: any) => (
  <Send {...sendProps} containerStyle={styles.container}>
    <Ionicons
      name="ios-send"
      size={IconSizes.x5}
      color={sendProps.isTinder ? ThemeStatic.tinder : ThemeStatic.accent}
    />
  </Send>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default CustomSend;
