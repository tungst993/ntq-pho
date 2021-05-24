import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';
import { themeState } from '../../recoil/theme/atoms';
import PlaceholderAnimation from './PlaceholderAnimation';

const MessageScreenPlaceholder: React.FC = () => {
  const theme = useRecoilValue(themeState);
  return (
    <View style={styles.container}>
      <Placeholder Animation={PlaceholderAnimation}>
        {new Array(20).fill({}).map((_, index) => (
          <View key={index} style={styles.cardContainer}>
            <PlaceholderMedia color={theme.placeholder} size={50} isRound />
            <View style={styles.infoContainer}>
              <PlaceholderLine noMargin color={theme.placeholder} style={styles.userChatPlaceholder} width={40} />
              <PlaceholderLine noMargin color={theme.placeholder} style={styles.userChatPlaceholder} width={80} />
            </View>
          </View>
        ))}
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  userChatPlaceholder: {
    borderRadius: 10,
    marginTop: 10,
  },
});

export default MessageScreenPlaceholder;
