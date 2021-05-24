import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import { Typography } from '../../theme';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeStatic } from '../../theme';
import { parseConnectionsCount } from '../../utils/shared';
import type { ThemeColors } from '../../types/theme';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/theme/atoms';

const { FontWeights, FontSizes } = Typography;

interface ConnectionsProps {
  total: string;
  type: string;
  onPress: any;
}

const Connections: React.FC<ConnectionsProps> = ({ total, type, onPress }) => {
  const theme = useRecoilValue(themeState);

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={styles(theme).connections}>
      <Text style={styles(theme).connectionsText}>{total}</Text>
      <Text style={styles(theme).connectionsType}>{type}</Text>
    </TouchableOpacity>
  );
};

interface EditProfileProps {
  onEdit: any;
}

const EditProfile: React.FC<EditProfileProps> = ({ onEdit }) => {
  const theme = useRecoilValue(themeState);

  return (
    <TouchableOpacity activeOpacity={1} onPress={onEdit} style={styles(theme).editProfile}>
      <MaterialIcons name="edit" size={16} color={ThemeStatic.white} />
    </TouchableOpacity>
  );
};

interface ProfileCardProps {
  avatar: string | undefined | null;
  editable?: boolean;
  onEdit?: any;
  onFollowingOpen: any;
  onFollowersOpen: any;
  following: number | undefined;
  followers: number | undefined;
  nickname: string | undefined;
  name: string | undefined;
  renderInteractions?: any;
  about: string | undefined;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatar,
  editable,
  onEdit,
  onFollowingOpen,
  onFollowersOpen,
  following,
  followers,
  nickname,
  name,
  renderInteractions,
  about,
}) => {
  const theme = useRecoilValue(themeState);

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).info}>
        <Connections onPress={onFollowingOpen} total={parseConnectionsCount(following)} type="FOLLOWING" />
        <ImageBackground
          source={{ uri: avatar ? avatar : '' }}
          style={styles(theme).avatar}
          imageStyle={styles(theme).avatarImage}>
          {editable && <EditProfile onEdit={onEdit} />}
        </ImageBackground>
        <Connections onPress={onFollowersOpen} total={parseConnectionsCount(followers)} type="FOLLOWERS" />
      </View>
      <View style={styles(theme).nickname}>
        <Text style={styles(theme).usernicknameText}>{name}</Text>
        <Text style={styles(theme).nameText}>{nickname}</Text>
      </View>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
      {renderInteractions && renderInteractions()}
      {about ? (
        <View style={styles(theme).about}>
          <Text style={styles(theme).aboutTitle}>About</Text>
          <Text style={styles(theme).aboutText}>{about}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingBottom: 4,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    avatar: {
      height: 120,
      width: 120,
    },
    avatarImage: {
      backgroundColor: theme.placeholder,
      borderRadius: 120,
    },
    editProfile: {
      position: 'absolute',
      bottom: -10,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40,
      width: 60,
      height: 32,
      borderWidth: 2,
      borderColor: theme.base,
      backgroundColor: theme.accent,
    },
    connections: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    connectionsText: {
      ...FontWeights.Regular,
      ...FontSizes.SubHeading,
      color: theme.text01,
    },
    connectionsType: {
      ...FontWeights.Bold,
      ...FontSizes.Caption,
      color: theme.text02,
      marginTop: 5,
    },
    nickname: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    usernicknameText: {
      ...FontWeights.Bold,
      ...FontSizes.SubHeading,
      color: theme.text01,
    },
    nameText: {
      ...FontWeights.Bold,
      ...FontSizes.Body,
      color: theme.text02,
      marginTop: 5,
    },
    about: {
      padding: 16,
      marginTop: 16,
      backgroundColor: theme.accent,
      borderRadius: 10,
      marginBottom: 10,
    },
    aboutTitle: {
      ...FontWeights.Regular,
      ...FontSizes.Body,
      color: theme.white,
    },
    aboutText: {
      ...FontWeights.Light,
      ...FontSizes.Body,
      color: theme.white,
      marginTop: 5,
    },
  });

export default ProfileCard;
