import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { useRecoilValue } from 'recoil';
import { AppRoutes } from '../../../navigator/app-routes';
import { themeState } from '../../../recoil/theme/atoms';
import type { ThemeColors } from '../../../types/theme';
import TinderHeader from '../components/TinderHeader';
import TinderMessageScreen from '../Message';
import TinderProfileScreen from '../Profile';
import { listData } from '../fakeData';
import TinderItem from '../components/TinderItem';
import Swiper from 'react-native-deck-swiper';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const TinderInAppScreen = () => {
  const theme = useRecoilValue(themeState);
  const styles = useStyle(theme);

  const [tab, setTab] = useState(AppRoutes.TINDER_APP_SCREEN);
  const [data, setData] = useState(listData);

  const handleChangeTab = (tab: AppRoutes) => {
    setTab(tab);
  };

  const carouselRef = useRef(null);

  return (
    <View style={styles.container}>
      <TinderHeader tab={tab} onChangetab={handleChangeTab} />
      {tab === AppRoutes.TINDER_PROFILE && <TinderProfileScreen />}
      {tab === AppRoutes.TINDER_APP_SCREEN && (
        <View style={styles.contentContainer}>
          <Swiper
            keyExtractor={(data) => data.name}
            renderCard={(item) => <TinderItem data={item} />}
            cards={data}
            ref={carouselRef}
            infinite
            backgroundColor={theme.secondary}
            containerStyle={{ height: '90%', padding: 0 }}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            showSecondCard
            stackSize={data.length}
            onSwipedLeft={() => {}}
            onSwipedRight={() => {}}
            onSwipedTop={() => {}}
            overlayLabels={{
              left: {
                element: (
                  <View
                    style={{
                      borderColor: '#FB4D6A',
                      borderWidth: 3,
                      width: 120,
                      height: responsiveHeight(5),
                      marginTop: 30,
                      marginLeft: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      transform: [{ rotate: '15deg' }],
                    }}>
                    <Text style={{ color: '#FB4D6A', fontWeight: '700' }}>NOPE</Text>
                  </View>
                ) /* Optional */,
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30,
                    borderColor: '#FB4F68',
                  },
                },
              },
              right: {
                element: (
                  <View
                    style={{
                      borderColor: '#37E9B9',
                      borderWidth: 3,
                      width: 120,
                      height: responsiveHeight(5),
                      marginTop: 60,
                      marginLeft: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      transform: [{ rotate: '-20deg' }],
                    }}>
                    <Text style={{ color: '#37E9B9', fontWeight: '700' }}>LIKE</Text>
                  </View>
                ),
              },
              top: {
                element: (
                  <View
                    style={{
                      borderColor: '#37BAFF',
                      borderWidth: 3,
                      height: responsiveHeight(5),
                      width: 150,
                      marginTop: responsiveHeight(25),
                      justifyContent: 'center',
                      alignItems: 'center',
                      transform: [{ rotate: '-20deg' }],
                    }}>
                    <Text style={{ color: '#37BAFF', fontWeight: '700' }}>SUPER LIKE</Text>
                  </View>
                ) /* Optional */,
                title: 'SUPER LIKE',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#37BAFF',
                  },
                },
              },
            }}
          />
        </View>
      )}
      {tab === AppRoutes.TINDER_MESSAGE && <TinderMessageScreen />}
    </View>
  );
};

const useStyle = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base,
      ...ifIphoneX({
        paddingTop: 44,
      }),
    },
    contentContainer: {
      marginTop: 20,
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      ...ifIphoneX({
        paddingBottom: 24,
      }),
      marginTop: 12,
      width: '100%',
      height: 60,
    },
    icon: {
      backgroundColor: theme.secondary,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 52,
      height: 52,
      borderRadius: 52,
    },
  });

export default TinderInAppScreen;
