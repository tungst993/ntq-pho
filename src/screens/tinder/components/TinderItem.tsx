import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRecoilValue } from 'recoil';
import NativeImage from '../../../components/shared/NativeImage';
import { themeState } from '../../../recoil/theme/atoms';
import { ThemeStatic } from '../../../theme';
import type { ThemeColors } from '../../../types/theme';

export type TinderItemProps = {
  data: Item;
};

export type Item = {
  name: string;
  intro: string;
  images: string[];
};

const TinderItem: React.FC<TinderItemProps> = ({ data: { images, name, intro } }) => {
  const theme = useRecoilValue(themeState);
  const styles = useStyle(theme);
  const [currentPic, setCurrentPic] = useState(0);

  const next = () => {
    if (currentPic === images.length - 1) {
      return;
    }
    setCurrentPic(currentPic + 1);
  };
  const previous = () => {
    if (currentPic === 0) {
      return;
    }
    setCurrentPic(currentPic - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        {images.map((item, index) => (
          <View
            style={[
              styles.counterItem,
              {
                width: `${100 / images.length - 1}%`,
                backgroundColor: currentPic === index ? ThemeStatic.white : ThemeStatic.translucent,
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.imageControlContainer}>
        <Pressable onPress={previous} style={styles.imageControl} />
        <Pressable onPress={next} style={styles.imageControl} />
      </View>
      <LinearGradient
        colors={[
          'rgba(0,0,0, 0)',
          'rgba(0,0,0, 0.02)',
          'rgba(0,0,0,0.12)',
          'rgba(0,0,0,0.13)',
          'rgba(0,0,0,0.16)',
          'rgba(0,0,0,0.19)',
          'rgba(0,0,0,0.22)',
          'rgba(0,0,0,0.25)',
          'rgba(0,0,0,0.28)',
          'rgba(0,0,0,0.31)',
        ]}
        style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.intro}>{intro}</Text>
      </LinearGradient>

      <NativeImage uri={images[currentPic]} style={styles.image} />
    </View>
  );
};

const useStyle = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.secondary,
      borderRadius: 8,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    counterContainer: {
      position: 'absolute',
      height: 10,
      width: '100%',
      zIndex: 100,
      top: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
    },
    counterItem: {
      height: 4,
      borderRadius: 10,
    },
    imageControlContainer: {
      flexDirection: 'row',
      position: 'absolute',
      top: 10,
      left: 0,
      width: '100%',
      height: '76%',
      zIndex: 100,
      justifyContent: 'space-between',
    },
    imageControl: {
      height: '100%',
      width: '35%',
    },
    infoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '24%',
      zIndex: 100,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    name: {
      color: ThemeStatic.white,
      fontSize: 26,
      fontWeight: '600',
    },
    intro: {
      color: ThemeStatic.white,
    },
  });

export default TinderItem;
