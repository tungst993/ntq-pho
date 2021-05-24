import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { View, StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { ThemeStatic } from '../../theme';
import type { ThemeColors } from '../../types/theme';
import { themeState } from '../../recoil/theme/atoms';

import { useRecoilValue } from 'recoil';

const Background = React.memo(({ children }) => {
  const theme = useRecoilValue(themeState);

  return (
    <LinearGradient
      colors={[ThemeStatic.accent, 'rgba(35, 105, 178, 0.9)', 'rgba(35, 105, 178, 0.8)']}
      style={styles(theme).banner}>
      <View style={styles(theme).topView}>{children}</View>
    </LinearGradient>
  );
});

const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
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
