import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Images } from '../../../assets1/icons';
import { ThemeStatic } from '../../../theme';

const UpdateInfo = React.memo(({ children }) => {
  return (
    <View style={styles.content}>
      <View style={styles.logoWrapper}>
        <Image source={Images.ntqLogoBlue} style={styles.logo} />
      </View>
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 90,
    height: 90,
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  itemView: {
    width: responsiveWidth(20),
    alignItems: 'center',
    height: responsiveWidth(10),
    borderColor: ThemeStatic.white,
  },
});

export default UpdateInfo;
