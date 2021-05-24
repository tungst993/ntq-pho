import React, { memo, useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Image, Button } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Typography from '../../theme/Typography';
import { Images } from '../../assets1/icons';
import type { AuthLoginScreenProp } from '../../navigator/auth.navigator';
import type { ThemeColors } from '../../types/theme';
import ZaloKit from 'react-native-zalo-kit';
import { themeState } from '../../recoil/theme/atoms';
import LottieView from 'lottie-react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { isLoginState } from '../../recoil/auth/atoms';
import { useLoginWithSnsMutation } from '../../graphql/mutations/loginWithSNS.generated';
import { MeDocument } from '../../graphql/queries/me.generated';
import { somethingWentWrongErrorNotification } from '../../helpers/notifications';
import { saveToken } from '../../helpers/storage';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from '../../navigator/app-routes';
import Background from '../../components/Background';

GoogleSignin.configure();

const { FontWeights, FontSizes } = Typography;
type Props = {
  navigation: AuthLoginScreenProp;
  route: any;
};

const LoginScreen = memo<Props>(() => {
  const theme = useRecoilValue(themeState);
  const [initializing, setInitializing] = useState<boolean>(true);
  const setIsLogin = useSetRecoilState(isLoginState);
  const { navigate } = useNavigation();

  const [loginWithSns] = useLoginWithSnsMutation({
    onCompleted: (res) => {
      console.log('res', res);
      navigate(AppRoutes.UPDATE_DEPARTMENT_INFO);
      // if (res.loginWithSNS.user.isNew) {
      //   navigate(AppRoutes.UPDATE_DEPARTMENT_INFO);
      // } else {
      //   setIsLogin(true);
      // }
    },
    onError: (err) => {
      console.log('loginWithSns', err);
      setIsLogin(false);
      somethingWentWrongErrorNotification();
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

  let content = <LottieView source={require('../../assets1/loading.json')} autoPlay loop />;

  if (!initializing) {
    content = (
      <Background>
        <Image source={Images.ntqLogo} />
        <Button
          // style={{ width: responsiveWidth(55), height: 48, marginTop: 40 }}
          // size={GoogleSigninButton.Size.Wide}
          // color={GoogleSigninButton.Color.Dark}
          title="GG"
          onPress={signIn}
        />
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
    content: {
      marginTop: responsiveHeight(8),
      marginHorizontal: 20,
    },
    titleText: {
      ...FontWeights.Bold,
      ...FontSizes.Heading,
      color: theme.text01,
    },
    subtitleText: {
      ...FontWeights.Light,
      ...FontSizes.Label,
      marginTop: 10,
      color: theme.text02,
    },
    banner: {
      flex: 1,
      width: responsiveWidth(100),
      // alignItems: 'center',
      // justifyContent: 'center',
    },

    loginButton: {
      height: 44,
      width: responsiveWidth(90),
      alignSelf: 'center',
      marginBottom: 10,
      borderWidth: Platform.select({ ios: StyleSheet.hairlineWidth, android: 0.8 }),
      borderColor: theme.accent,
      backgroundColor: theme.base,
    },
    loginButtonText: {
      ...FontWeights.Regular,
      ...FontSizes.Body,
      marginLeft: 10,
      color: theme.text01,
    },
    appleSignIn: {
      height: 44,
      width: responsiveWidth(90),
      marginBottom: 10,
    },
    loadingAppleLogin: {
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    terms: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    termsText: {
      ...FontWeights.Light,
      ...FontSizes.Body,
      color: theme.text02,
    },
  });
export default LoginScreen;
