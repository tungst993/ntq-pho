import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';
import { themeState } from '../../recoil/theme/atoms';
import { PostDimensions } from '../../theme';
import type { ThemeColors } from '../../types/theme';
import PlaceholderAnimation from './PlaceholderAnimation';

const PostViewScreenPlaceholder = () => {
  const theme = useRecoilValue(themeState);

  return (
    <>
      {new Array(3).fill({}).map((_, index) => (
        <View style={styles(theme).container}>
          <Placeholder Animation={PlaceholderAnimation}>
            <View style={styles(theme).postHeader}>
              <PlaceholderMedia color={theme.placeholder} size={50} isRound />
              <View style={styles(theme).author}>
                <PlaceholderLine
                  noMargin
                  color={theme.placeholder}
                  width={60}
                  style={styles(theme).handlePlaceholder}
                />
                <PlaceholderLine color={theme.placeholder} width={30} style={styles(theme).timePlaceholder} />
              </View>
            </View>
            <PlaceholderLine noMargin color={theme.placeholder} width={60} style={styles(theme).likesPlaceholder} />
            <PlaceholderLine noMargin color={theme.placeholder} style={styles(theme).card} />
          </Placeholder>
        </View>
      ))}
    </>
  );
};
const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
      backgroundColor: theme.base,
      marginBottom: 12,
    },
    postHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
    },
    author: {
      flex: 1,
      justifyContent: 'center',
    },
    handlePlaceholder: {
      marginLeft: 12,
      borderRadius: 10,
    },
    timePlaceholder: {
      marginTop: 10,
      marginLeft: 12,
      borderRadius: 10,
    },
    card: {
      marginTop: 10,
      height: 290,
    },
    likesPlaceholder: {
      marginTop: 20,
      marginBottom: 5,
      borderRadius: 10,
      marginHorizontal: 20,
    },
    captionPlaceholder: {
      marginTop: 8,
      borderRadius: 10,
    },
  });

export default PostViewScreenPlaceholder;
