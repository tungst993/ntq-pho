import React from 'react';
import { ImageBackground, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useSetRecoilState } from 'recoil';
import { Images } from '../../assets1/icons';
import { isLoginState } from '../../recoil/auth/atoms';
import { ThemeStatic } from '../../theme';

const WelcomeScreen = React.memo(() => {
  const setIsLogin = useSetRecoilState(isLoginState);

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.welcome} style={styles.image}>
        <View>
          <Text style={styles.text}>Chào mừng đến với NTQ</Text>
        </View>
        <TouchableOpacity style={styles.buttonConfirm} onPress={() => setIsLogin(true)}>
          <Text style={{ color: ThemeStatic.accent, fontSize: 18, fontWeight: 'bold' }}>Tiếp tục</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 30,
    // backgroundColor: '#000000a0',
    marginTop: 50,
  },
  buttonConfirm: {
    height: 48,
    backgroundColor: ThemeStatic.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: responsiveWidth(90),
    marginBottom: 50,
  },
});

export default WelcomeScreen;
