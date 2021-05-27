import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import PostCardPlaceholder from '../../components/placeholders/PostCard.Placeholder';
import UserRowPlaceholder from '../../components/placeholders/UserRow.Placeholder';
import SearchUsersPlaceholder from '../../components/placeholders/UserSearch.Placeholder';
import { PostComponent } from '../../components/PostComponent';
import NativeImage from '../../components/shared/NativeImage';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { AppRoutes } from '../../navigator/app-routes';
import { isLoginState } from '../../recoil/auth/atoms';
import { themeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';

const Home = React.memo(() => {
  const { navigate } = useNavigation();
  const theme = useRecoilValue(themeState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const user = useCurrentUser();

  return (
    <SafeAreaView style={styles(theme).container}>
      <View
        style={{ ...styles(theme).viewWrapper, ...styles(theme).row, ...styles(theme).spaceBetween, paddingTop: 60 }}>
        <NativeImage uri={user?.avatar || ''} style={styles(theme).avatarImage} />
        <TouchableOpacity style={styles(theme).input} onPress={() => navigate(AppRoutes.CREATE_POST)}>
          <Text style={{ color: theme.text02 }}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList data={[1]} renderItem={() => <PostComponent />} keyExtractor={(index) => index.toString()} />
      </View>
    </SafeAreaView>
  );
});
const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.secondary,
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    avatarImage: {
      height: 40,
      width: 40,
      borderRadius: 40,
    },
    viewWrapper: {
      paddingHorizontal: 20,
      backgroundColor: theme.base,
      marginBottom: 10,
    },
    input: {
      height: 40,
      width: responsiveWidth(80),
      borderRadius: 20,
      borderWidth: 1,
      paddingHorizontal: 10,
      borderColor: 'gray',
      justifyContent: 'center',
    },
    modalWrapper: {
      height: responsiveHeight(100) - 100,
      backgroundColor: 'red',
      // marginTop: responsiveHeight(50),
    },
  });

export default Home;
