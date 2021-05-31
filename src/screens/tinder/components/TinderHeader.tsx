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

export type TinderHeaderProps = {
  onChangetab: (tab: AppRoutes) => void;
  tab: AppRoutes;
};

const TinderHeader: React.FC<TinderHeaderProps> = ({ onChangetab, tab }) => {
  const theme = useRecoilValue(themeState);

  return (
    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
      <IconButton
        onPress={() => {
          onChangetab(AppRoutes.TINDER_PROFILE);
        }}
        Icon={() => (
          <FontAwesome
            name="user"
            style={{ fontSize: 20 }}
            color={tab === AppRoutes.TINDER_PROFILE ? ThemeStatic.tinder : theme.white}
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
            color={tab === AppRoutes.TINDER_APP_SCREEN ? ThemeStatic.tinder : theme.white}
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
            color={tab === AppRoutes.TINDER_MESSAGE ? ThemeStatic.tinder : theme.white}
          />
        )}
      />
    </View>
  );
};

export default TinderHeader;
