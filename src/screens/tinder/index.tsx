import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useMyTinderProfileLazyQuery } from '../../graphql/queries/myTinderProfile.generated';
import { themeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';
import NewUserProcess from './NewUserProcess';

const TinderAppScreen = () => {
  const theme = useRecoilValue(themeState);
  const styles = useStyle(theme);

  const [getProfile, { data }] = useMyTinderProfileLazyQuery({});

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const profile = data?.myTinderProfile;

  return (
    <View style={styles.container}>
      {profile ? <Text style={{ color: theme.text01 }}>App</Text> : <NewUserProcess />}
    </View>
  );
};

const useStyle = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base,
    },
  });
export default TinderAppScreen;
