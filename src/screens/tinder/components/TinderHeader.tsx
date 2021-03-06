import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../../recoil/theme/atoms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconButton from '../../../components/shared/Iconbutton';
import Feather from 'react-native-vector-icons/Feather';
import { AppRoutes } from '../../../navigator/app-routes';
import { ThemeStatic } from '../../../theme';
import { useNavigation } from '@react-navigation/core';

export type TinderHeaderProps = {
  onChangetab: (tab: AppRoutes) => void;
  tab: AppRoutes;
};

const TinderHeader: React.FC<TinderHeaderProps> = ({ onChangetab, tab }) => {
  const theme = useRecoilValue(themeState);
  const { goBack } = useNavigation();

  return (
    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
      <IconButton
        onPress={() => {
          goBack();
        }}
        Icon={() => <FontAwesome name="close" style={{ fontSize: 20 }} color={theme.text02} />}
      />
      <IconButton
        onPress={() => {
          onChangetab(AppRoutes.TINDER_PROFILE);
        }}
        Icon={() => (
          <FontAwesome
            name="user"
            style={{ fontSize: 20 }}
            color={tab === AppRoutes.TINDER_PROFILE ? ThemeStatic.tinder : theme.text02}
          />
        )}
      />
      <IconButton
        onPress={() => {
          onChangetab(AppRoutes.TINDER_APP_SCREEN);
        }}
        Icon={() => (
          <Ionicons
            name="heart"
            style={{ fontSize: 20 }}
            color={tab === AppRoutes.TINDER_APP_SCREEN ? ThemeStatic.tinder : theme.text02}
          />
        )}
      />

      <IconButton
        onPress={() => {
          onChangetab(AppRoutes.TINDER_MESSAGE);
        }}
        Icon={() => (
          <Feather
            name="message-circle"
            style={{ fontSize: 20 }}
            color={tab === AppRoutes.TINDER_MESSAGE ? ThemeStatic.tinder : theme.text02}
          />
        )}
      />
    </View>
  );
};

export default TinderHeader;
