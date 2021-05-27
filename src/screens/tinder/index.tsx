import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';

const TinderAppScreen = () => {
  const theme = useRecoilValue(themeState);
  const styles = useStyle(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: theme.text01 }}>asdawd</Text>
    </SafeAreaView>
  );
};

const useStyle = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base,
    },
  });
export default TinderAppScreen;
