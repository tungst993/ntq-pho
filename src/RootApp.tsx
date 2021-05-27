import React, { useEffect } from 'react';
import { RootNavigator } from './navigator/root.navigator';
import { loadThemeType, saveThemeType } from './helpers/storage';
import { LogBox, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import type { ThemeColors } from './types/theme';
import { Typography } from './theme';
import { DynamicStatusBar, Theme, ThemeStatic } from './theme/Colors';
import FlashMessage from 'react-native-flash-message';
import { themeState, themeTypeState } from './recoil/theme/atoms';
import { useMeLazyQuery } from './graphql/queries/me.generated';
import { isLoginState } from './recoil/auth/atoms';

import Toast from 'react-native-toast-message';
import FastImage from 'react-native-fast-image';

const App = React.memo(() => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [themeType, setThemeType] = useRecoilState(themeTypeState);
  const { barStyle, backgroundColor } = DynamicStatusBar[themeType];

  const setIsLogin = useSetRecoilState(isLoginState);

  const [getMe, { loading }] = useMeLazyQuery({
    onError: (err) => {
      console.log(err);
      setIsLogin(false);
    },
    onCompleted: (res) => {
      if (res.me.isNew) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    },
  });

  useEffect(() => {
    getMe();
  }, [getMe]);

  const initializeTheme = async () => {
    try {
      const themeType = await loadThemeType();
      toggleTheme(themeType || '');
    } catch ({ message }) {}
  };

  const initLoginState = () => {
    getMe();
  };

  React.useEffect(() => {
    initializeTheme();
    initLoginState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = (type: string) => {
    setTheme(Theme[type].colors);
    setThemeType(type);
    saveThemeType(type);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.base,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  }

  return (
    <View style={styles(theme).container}>
      <StatusBar animated barStyle={barStyle} backgroundColor={backgroundColor} />
      <RootNavigator />
      <Toast
        ref={(ref) => Toast.setRef(ref)}
        position="top"
        visibilityTime={3500}
        config={{
          success: ({ text1, text2, props }: any) => {
            return (
              <TouchableOpacity
                onPress={props.onPress}
                activeOpacity={0.95}
                style={{
                  width: '100%',
                  height: 'auto',
                  backgroundColor: 'rgba(132,107,226, 0.8)',
                  padding: 15,
                  margin: 5,
                  flexDirection: 'row',
                }}>
                <View style={{ marginRight: 10 }}>
                  <FastImage source={{ uri: props.image }} style={{ height: 50, width: 50, borderRadius: 50 }} />
                </View>
                <View>
                  <Text style={{ color: theme.white, fontWeight: 'bold', marginBottom: 8 }}>{text1}</Text>
                  <Text style={{ color: theme.white }}>{text2}</Text>
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />
      <FlashMessage textStyle={styles(theme).flashMessageTitle} position="bottom" />
    </View>
  );
});

const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base,
    },
    flashMessageTitle: {
      ...Typography.FontWeights.Light,
      ...Typography.FontSizes.Body,
      color: ThemeStatic.white,
    },
  });

export default App;

LogBox.ignoreLogs(['RCTRootView cancelTouches']);
