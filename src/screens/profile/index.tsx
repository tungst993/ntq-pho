import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import NativeImage from '../../components/shared/NativeImage';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { themeState, themeTypeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useLogoutMutation } from '../../graphql/mutations/logout.generated';
import { somethingWentWrongErrorNotification } from '../../helpers/notifications';
import { isLoginState } from '../../recoil/auth/atoms';
import { removeToken, saveThemeType } from '../../helpers/storage';
import LoadingIndicator from '../../components/shared/LoadingIndicator';
import { IconSizes } from '../../theme/Icon';
import { AppRoutes } from '../../navigator/app-routes';
import { useNavigation } from '@react-navigation/core';
import { Theme, ThemeVariant } from '../../theme';

const ProfileScreen: React.FC = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [themeType, setThemeType] = useRecoilState(themeTypeState);
  const styles = useStyle(theme);
  const user = useCurrentUser();
  const setIsLogin = useSetRecoilState(isLoginState);

  const { navigate } = useNavigation();

  const [logout, { loading }] = useLogoutMutation({
    onError: () => {
      somethingWentWrongErrorNotification();
    },
    onCompleted: async () => {
      await removeToken();
      setIsLogin(false);
    },
  });

  const onLogout = () => {
    logout({});
  };

  const toggleTheme = async () => {
    const type = themeType === ThemeVariant.dark ? ThemeVariant.light : ThemeVariant.dark;
    setTheme(Theme[type].colors);
    setThemeType(type);
    await saveThemeType(type);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ ...ifIphoneX({ marginTop: 44 }, {}) }}>
      <View style={styles.row}>
        <NativeImage uri={user?.avatar ?? ''} style={styles.avatar} />
        <View style={{ justifyContent: 'space-between', paddingVertical: 4 }}>
          <Text style={styles.title}>{user?.fullName}</Text>
          <Text style={styles.text}>Xem trang cá nhân của bạn</Text>
        </View>
      </View>
      <View style={styles.rowAction}>
        <View style={styles.col}>
          <TouchableOpacity style={styles.item}>
            <LinearGradient
              colors={['rgba(50,120,242, 0.9)', 'rgba(50,120,242, 0.7)', 'rgba(50,120,242, 0.5)']}
              style={{
                padding: 6,
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 32,
                marginBottom: 8,
              }}>
              <MaterialIcons name="groups" style={{ fontSize: 20 }} color={theme.white} />
            </LinearGradient>
            <Text style={styles.title}>Nhóm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <LinearGradient
              colors={['rgba(34,139,142,8)', '#rgba(34,139,142,0.7)', 'rgba(34,139,142,0.5)']}
              style={{
                padding: 6,
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 32,
                marginBottom: 8,
              }}>
              <MaterialIcons name="event" style={{ fontSize: 20 }} color={theme.white} />
            </LinearGradient>
            <Text style={styles.title}>Sự kiện</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <LinearGradient
              colors={['rgba(255, 63, 0, 0.9)', 'rgba(255, 63, 0, 0.7)', 'rgba(255, 63, 0, 0.5)']}
              style={{
                padding: 6,
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 32,
                marginBottom: 8,
              }}>
              <MaterialIcons name="notifications" style={{ fontSize: 20 }} color={theme.white} />
            </LinearGradient>
            <Text style={styles.title}>Thông báo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.col}>
          <TouchableOpacity style={styles.item} onPress={() => navigate(AppRoutes.TINDER_NAVIGATOR)}>
            <LinearGradient
              colors={['#FD297B', '#FF5864', '#FF655B']}
              style={{
                padding: 6,
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 32,
                marginBottom: 8,
              }}>
              <Ionicons name="heart" style={{ fontSize: 20 }} color={theme.white} />
            </LinearGradient>
            <Text style={styles.title}>Hẹn hò</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <LinearGradient
              colors={['rgba(180, 101, 74, 0.9)', 'rgba(180, 101, 74,0.6)', 'rgba(180, 101, 74,0.4)']}
              style={{
                padding: 6,
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 32,
                marginBottom: 8,
              }}>
              <MaterialIcons name="medical-services" style={{ fontSize: 20 }} color={theme.white} />
            </LinearGradient>
            <Text style={styles.title}>Khái báo y tế </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={toggleTheme}>
            <LinearGradient
              colors={['#3A3B3D', '#121212', '#232526']}
              style={{
                padding: 6,
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 32,
                marginBottom: 8,
              }}>
              <Ionicons name="moon" style={{ fontSize: 20 }} color={theme.white} />
            </LinearGradient>
            <Text style={styles.title}>Chế độ tối</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        {loading ? (
          <LoadingIndicator color={theme.text01} size={IconSizes.x2} />
        ) : (
          <Text style={styles.btnText}>Đăng xuất</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const useStyle = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.secondary,
      ...ifIphoneX({
        paddingTop: 20,
      }),
      paddingHorizontal: 20,
    },
    title: {
      color: theme.text01,
      fontSize: 16,
      fontWeight: '500',
    },
    text: {
      color: theme.text02,
    },
    row: {
      flexDirection: 'row',
    },
    avatar: {
      height: 40,
      width: 40,
      borderRadius: 40,
      marginRight: 12,
    },
    rowAction: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    col: {
      width: '49%',
      marginTop: 20,
    },
    item: {
      paddingHorizontal: 12,
      backgroundColor: theme.base,
      paddingVertical: 20,
      borderRadius: 8,
      marginBottom: 8,
    },
    button: {
      backgroundColor: theme.base,
      paddingHorizontal: 12,
      paddingVertical: 14,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      marginTop: 50,
    },
    btnText: {
      color: theme.text01,
      fontWeight: '600',
    },
  });

export default ProfileScreen;
