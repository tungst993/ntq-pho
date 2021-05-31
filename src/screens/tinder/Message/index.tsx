import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRecoilValue } from 'recoil';
import NativeImage from '../../../components/shared/NativeImage';
import { themeState } from '../../../recoil/theme/atoms';
import { ThemeStatic } from '../../../theme';
import type { ThemeColors } from '../../../types/theme';
import { matches, message } from '../fakeData';

const TinderMessageScreen = () => {
  const theme = useRecoilValue(themeState);
  const styles = useStyle(theme);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Tương hợp mới</Text>
            <FlatList
              horizontal
              data={matches}
              showsHorizontalScrollIndicator={false}
              style={{ height: 100 }}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <NativeImage uri={item.images[0] ?? ''} style={styles.avatar} />
                  <Text style={styles.name}>{item.name}</Text>
                  {item.isNew && <LinearGradient colors={ThemeStatic.tinderSchema} style={styles.dot} />}
                </View>
              )}
            />
            <Text style={styles.title}>Tin nhắn</Text>
          </>
        }
        data={message}
        showsHorizontalScrollIndicator={false}
        style={{ height: 100 }}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <NativeImage uri={item.images[0] ?? ''} style={[styles.avatar, { marginRight: 12 }]} />
            <View style={styles.contentContainer}>
              <Text style={[styles.name, { textAlign: 'left' }]}>{item.name}</Text>
              <Text style={styles.content}>{item.content}</Text>
            </View>
            {item.isNew && (
              <LinearGradient
                colors={ThemeStatic.tinderSchema}
                style={[
                  styles.dot,
                  { position: 'relative', width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
                ]}>
                <Text style={{ fontSize: 10, color: theme.white, fontWeight: '600' }}>1</Text>
              </LinearGradient>
            )}
          </View>
        )}
      />
    </View>
  );
};

const useStyle = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base,
      marginTop: 20,
      paddingHorizontal: 20,
    },
    title: {
      color: ThemeStatic.tinder,
      fontSize: 12,
      fontWeight: '500',
      marginBottom: 10,
    },
    item: {
      marginRight: 12,
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 52,
    },
    name: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text01,
      textAlign: 'center',
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 12,
      position: 'absolute',
      right: -6,
      top: 20,
      borderColor: theme.base,
      borderWidth: 1.5,
    },
    message: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    contentContainer: {
      width: '70%',
      paddingRight: 20,
    },
    content: {
      fontSize: 12,
      color: theme.text02,
    },
  });

export default TinderMessageScreen;
