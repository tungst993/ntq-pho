import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../../recoil/theme/atoms';
import type { ThemeColors } from '../../../types/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeStatic } from '../../../theme';
import { getImageFromLibrary } from '../../../utils/shared';
import type { Image as PickerImage } from 'react-native-image-crop-picker';
import NativeImage from '../../../components/shared/NativeImage';
import AntDesign from 'react-native-vector-icons/AntDesign';

export type ChooseImageProps = {
  onChooseImage: (image: PickerImage) => void;
  images: PickerImage[];
  onRemoveImage: (index: number) => void;
};

const ChooseImage: React.FC<ChooseImageProps> = ({ onChooseImage, onRemoveImage, images }) => {
  const theme = useRecoilValue(themeState);
  const styles = useStyle(theme);

  const handleChooseImage = async () => {
    const image = await getImageFromLibrary(700, 700, false);
    if (image) {
      onChooseImage(image);
    }
  };

  const handleRemoveImage = async (index: number) => {
    onRemoveImage(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm ảnh</Text>
      <Text style={styles.subTitle}>Thêm ít nhất 2 ảnh để tiếp tục</Text>

      <View style={styles.imageContainer}>
        {images.map((item, index) => {
          return (
            <View key={`image-${index}`} style={styles.btnUpload}>
              <NativeImage uri={item.path} style={styles.image} />
              <TouchableOpacity
                style={[styles.plusButton, { backgroundColor: theme.base }]}
                onPress={() => handleRemoveImage(index)}>
                <AntDesign name="close" color={ThemeStatic.tinder} style={{ fontSize: 20 }} />
              </TouchableOpacity>
            </View>
          );
        })}
        {[...Array(6 - images.length).keys()].map((_) => {
          return (
            <TouchableOpacity style={styles.btnUpload} onPress={handleChooseImage}>
              <LinearGradient style={styles.plusButton} colors={ThemeStatic.tinderSchema}>
                <Entypo name="plus" color={ThemeStatic.white} style={{ fontSize: 20 }} />
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const useStyle = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      padding: 20,
      width: '100%',
    },
    title: {
      fontSize: 28,
      fontWeight: '500',
      marginBottom: 12,
      color: theme.text01,
    },
    subTitle: {
      marginBottom: 52,
      fontSize: 16,
      fontWeight: '500',
      color: theme.text02,
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    btnUpload: {
      backgroundColor: '#E0E4E9',
      width: '30%',
      height: 140,
      marginBottom: 16,
      borderRadius: 8,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    plusButton: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      position: 'absolute',
      bottom: -10,
      right: -10,
    },
  });

export default ChooseImage;
