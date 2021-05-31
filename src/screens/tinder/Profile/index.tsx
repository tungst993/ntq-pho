import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRecoilValue } from 'recoil';
import NativeImage from '../../../components/shared/NativeImage';
import { useMyTinderProfileLazyQuery } from '../../../graphql/queries/myTinderProfile.generated';
import { showSuccessNotification, somethingWentWrongErrorNotification } from '../../../helpers/notifications';
import { themeState } from '../../../recoil/theme/atoms';
import type { ThemeColors } from '../../../types/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { ThemeStatic } from '../../../theme';
import { getImageFromLibrary } from '../../../utils/shared';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useUpdateTinderProfileMutation } from '../../../graphql/mutations/updateTinderProfile.generated';
import LoadingIndicator from '../../../components/shared/LoadingIndicator';
import { IconSizes } from '../../../theme/Icon';
import { TinderGenderEnum } from '../../../graphql/type.interface';

const TinderProfileScreen = () => {
  const theme = useRecoilValue(themeState);
  const styles = useStyle(theme);
  const [upload] = useFileUpload();

  const [getProfile, { data }] = useMyTinderProfileLazyQuery({
    onError: () => {
      somethingWentWrongErrorNotification();
    },
    onCompleted: (res) => {
      setImages(res.myTinderProfile.images ?? []);
      setIntro(res.myTinderProfile.intro);
    },
  });

  useEffect(() => {
    getProfile({});
  }, [getProfile]);

  const profile = data?.myTinderProfile;

  const [update, { loading: updateLoading }] = useUpdateTinderProfileMutation({
    onCompleted: () => {
      showSuccessNotification('Hồ sơ của bạn đã được lưu');
    },
    onError: () => {
      somethingWentWrongErrorNotification();
    },
  });

  const [images, setImages] = useState<string[]>([]);
  const [intro, setIntro] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const handleChooseImage = async () => {
    const image = await getImageFromLibrary(700, 700, false);
    if (image) {
      const res = await upload({
        uri: image.path,
        type: image.mime,
        name: image.filename ?? 'name',
        height: image.height ?? 0,
        width: image.width ?? 0,
      });
      setImages([...images, res.filePath ?? '']);
    }
  };

  const handleRemoveImage = (index: number) => {
    const temp = [...images];
    temp.splice(index, 1);
    setImages(temp);
  };

  const handleSave = () => {
    update({
      variables: {
        input: {
          intro,
          images,
          gender: profile?.gender ?? TinderGenderEnum.MALE,
          target: profile?.target ?? TinderGenderEnum.MALE,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <NativeImage uri={profile?.images[0] ?? ''} style={styles.avatar} />
        <Text style={styles.name}>{profile?.userInfo.fullName}</Text>
      </View>

      <View style={styles.imageContainer}>
        {images.map((item, index) => {
          return (
            <View key={`image-${index}`} style={styles.btnUpload}>
              <NativeImage uri={item} style={styles.image} />
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

      <TextInput
        value={intro}
        onChangeText={setIntro}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(true)}
        multiline
        placeholderTextColor={theme.text02}
        maxLength={200}
        placeholder="Gây ấn tượng với đối phương bằng 1 câu nói"
        style={styles.input}
      />
      <LinearGradient
        style={styles.inputBorder}
        colors={isFocus ? ThemeStatic.tinderSchema : [theme.text02, theme.text02]}
      />

      <TouchableOpacity style={{ width: '80%', alignSelf: 'center' }} disabled={updateLoading} onPress={handleSave}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={ThemeStatic.tinderSchema}
          style={styles.btn}>
          {updateLoading ? (
            <LoadingIndicator color={ThemeStatic.white} size={IconSizes.x3} />
          ) : (
            <Text style={styles.btnText}>Lưu</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const useStyle = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base,
      marginTop: 50,
      paddingHorizontal: 20,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 60,
    },
    name: {
      color: theme.text01,
      fontWeight: '600',
      marginTop: 16,
      fontSize: 16,
    },
    itemContainer: {
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
      marginTop: 20,
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
    inputBorder: {
      height: 1,
    },
    input: {
      height: 100,
      backgroundColor: theme.base,
      color: theme.text02,
      marginTop: 16,
    },
    btn: {
      width: '90%',
      alignSelf: 'center',
      marginTop: 28,
      paddingVertical: 16,
      alignItems: 'center',
      borderRadius: 32,
    },
    btnText: {
      fontWeight: '600',
      fontSize: 16,
      color: ThemeStatic.white,
    },
  });

export default TinderProfileScreen;
