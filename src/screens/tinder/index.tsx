import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import LoadingIndicator from '../../components/shared/LoadingIndicator';
import { useMyTinderProfileLazyQuery } from '../../graphql/queries/myTinderProfile.generated';
import { TinderAppNavigator } from '../../navigator/tinder.navigator';
import { themeState } from '../../recoil/theme/atoms';
import { IconSizes } from '../../theme/Icon';
import type { ThemeColors } from '../../types/theme';
import NewUserProcess from './NewUserProcess';

const TinderAppScreen = () => {
  const theme = useRecoilValue(themeState);
  const styles = useStyle(theme);

  const [getProfile, { data, loading }] = useMyTinderProfileLazyQuery({});

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const profile = data?.myTinderProfile;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingIndicator color={theme.text01} size={IconSizes.x5} />
      </View>
    );
  }

  if (profile) {
    return <TinderAppNavigator />;
  } else {
    return (
      <View style={styles.container}>
        <NewUserProcess />
      </View>
    );
  }
};

const useStyle = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base,
    },
  });
export default TinderAppScreen;
