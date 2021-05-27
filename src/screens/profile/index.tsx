import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { useRecoilValue } from 'recoil';
import NativeImage from '../../components/shared/NativeImage';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { themeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen: React.FC = () => {
  const theme = useRecoilValue(themeState);
  const styles = useStyle(theme);
  const user = useCurrentUser();

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
          <View style={styles.item}>
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
          </View>
          <View style={styles.item}>
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
          </View>
          <View style={styles.item}>
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
          </View>
        </View>
        <View style={styles.col}>
          <View style={styles.item}>
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
          </View>
          <View style={styles.item}>
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
          </View>
        </View>
      </View>
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
  });

export default ProfileScreen;
