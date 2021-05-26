import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useSetRecoilState } from 'recoil';
import NativeImage from '../../components/shared/NativeImage';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { AppRoutes } from '../../navigator/app-routes';
import { isLoginState } from '../../recoil/auth/atoms';

const Home = React.memo(() => {
  const { navigate } = useNavigation();

  const setIsLogin = useSetRecoilState(isLoginState);
  const user = useCurrentUser();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.viewWrapper, ...styles.row, ...styles.spaceBetween }}>
        <NativeImage uri={user?.avatar || ''} style={styles.avatarImage} />
        <TouchableOpacity style={styles.input} onPress={() => navigate(AppRoutes.CREATE_POST)}>
          <Text style={{ color: 'gray' }}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
      </View>
      <Button title="Logout" onPress={() => setIsLogin(false)} />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 60,
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
    paddingHorizontal: 10,
    backgroundColor: 'white',
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
