import React, { memo, useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Image, TouchableOpacity, Text } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Images } from '../../assets1/icons';
import type { AuthLoginScreenProp } from '../../navigator/auth.navigator';
import type { ThemeColors } from '../../types/theme';
import ZaloKit from 'react-native-zalo-kit';
import { themeState } from '../../recoil/theme/atoms';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { isLoginState } from '../../recoil/auth/atoms';
import { useLoginWithSnsMutation } from '../../graphql/mutations/loginWithSNS.generated';
import { MeDocument } from '../../graphql/queries/me.generated';
import { showErrorNotification, somethingWentWrongErrorNotification } from '../../helpers/notifications';
import { saveToken } from '../../helpers/storage';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../navigator/app-routes';
import Background from '../../components/Background';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingIndicator from '../../components/shared/LoadingIndicator';
import { IconSizes } from '../../theme/Icon';

GoogleSignin.configure();

type Props = {
  navigation: AuthLoginScreenProp;
  route: any;
};

const LoginScreen = memo<Props>(() => {
  const theme = useRecoilValue(themeState);
  const [initializing, setInitializing] = useState<boolean>(true);
  const setIsLogin = useSetRecoilState(isLoginState);
  const { navigate } = useNavigation();

  const [loginWithSns, { loading }] = useLoginWithSnsMutation({
    onCompleted: (res) => {
      if (res.loginWithSNS.user.isNew) {
        navigate(AppRoutes.WELCOME_SCREEN);
      } else {
        setIsLogin(true);
      }
    },
    onError: (err) => {
      console.log('loginWithSns', err);
      setIsLogin(false);
      showErrorNotification(err.message);
    },
    update: async (proxy, { data, errors }) => {
      if (data?.loginWithSNS?.user) {
        const user = data?.loginWithSNS?.user;
        await saveToken({
          accessToken: data.loginWithSNS.accessToken ?? '',
          refreshToken: data.loginWithSNS.refreshToken ?? '',
        });
        proxy.writeQuery({
          query: MeDocument,
          data: {
            me: user,
          },
        });
        if (errors) {
          return;
        }
      }
    },
  });

  const getApplicationHashKey = async () => {
    try {
      await ZaloKit.getApplicationHashKey();
      /*
      returns: 'application hash key'
    */
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInitializing(false);
    if (Platform.OS === 'android') {
      getApplicationHashKey();
    }
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();

      loginWithSns({
        variables: {
          input: {
            token: token.accessToken,
          },
        },
      });
    } catch (error) {
      console.log(error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  let content = <View />;

  if (!initializing) {
    content = (
      <Background style={{ marginTop: 40 }}>
        <Image source={Images.ntqLogo} />
        <TouchableOpacity style={styles(theme).loginButton} onPress={signIn}>
          {loading ? (
            <LoadingIndicator color="#000000" size={IconSizes.x4} />
          ) : (
            <>
              <Ionicons name="logo-google" style={{ fontSize: 20 }} />
              <Text style={styles(theme).loginButtonText}>Đăng nhập với Gmail</Text>
            </>
          )}
        </TouchableOpacity>
      </Background>
    );
  }

  return <View style={styles(theme).container}>{content}</View>;
});

const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topView: {
      // backgroundColor: 'rgb(35, 105, 178)',
      flex: 1,
      // paddingTop: responsiveHeight(Platform.select({ ios: 30, android: 12 }) || 0),
      paddingVertical: 60,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    banner: {
      flex: 1,
      width: responsiveWidth(100),
      // alignItems: 'center',
      // justifyContent: 'center',
    },

    loginButton: {
      height: 52,
      width: '80%',
      alignSelf: 'center',
      marginBottom: 10,
      backgroundColor: theme.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      flexDirection: 'row',
    },
    loginButtonText: {
      fontWeight: '600',
      fontSize: 16,
      marginLeft: 10,
      color: theme.text01,
    },
  });
export default LoginScreen;
