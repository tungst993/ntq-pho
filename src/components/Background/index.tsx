import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { ThemeStatic } from '../../theme';
import type { ThemeColors } from '../../types/theme';
import { themeState } from '../../recoil/theme/atoms';

import { useRecoilValue } from 'recoil';

export type BackgroundProps = {
  style?: StyleProp<ViewStyle>;
};

const Background: React.FC<BackgroundProps> = React.memo(({ children, style }) => {
  const theme = useRecoilValue(themeState);

  return (
    <LinearGradient
      colors={[
        ThemeStatic.accent,
        'rgba(35, 105, 178, 0.8)',
        'rgba(35, 105, 178, 0.7)',
        'rgba(35, 105, 178, 0.6)',
        'rgba(35, 105, 178, 0.5)',
        'rgba(35, 105, 178, 0.4)',
      ]}
      style={styles(theme).banner}>
      <View style={[styles(theme).topView, style]}>{children}</View>
    </LinearGradient>
  );
});

const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    topView: {
      flex: 1,
      paddingVertical: 60,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    banner: {
      flex: 1,
      width: responsiveWidth(100),
    },
  });

export default Background;
