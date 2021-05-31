import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import { useRecoilValue } from 'recoil';
import { genderList } from '../../../environment/constants';
import { TinderGenderEnum } from '../../../graphql/type.interface';
import { themeState } from '../../../recoil/theme/atoms';
import { ThemeStatic } from '../../../theme';
import type { ThemeColors } from '../../../types/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconSizes } from '../../../theme/Icon';
import ChooseImage from './ChooseImage';
import type { Image as PickerImage } from 'react-native-image-crop-picker';
import LottieView from 'lottie-react-native';
import { useFileUpload } from '../../../hooks/useFileUpload';
import { useCreateTinderProfileMutation } from '../../../graphql/mutations/createTinderProfile.generated';
import { somethingWentWrongErrorNotification } from '../../../helpers/notifications';
import { useNavigation } from '@react-navigation/core';

const NewUserProcess = () => {
  const [upload] = useFileUpload();
  const { goBack } = useNavigation();
  const theme = useRecoilValue(themeState);
  const styles = useStyle(theme);
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<TinderGenderEnum>();
  const [target, setTarget] = useState<TinderGenderEnum>();
  const [images, setImages] = useState<PickerImage[]>([]);
  const [intro, setIntro] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const [loading, setLoading] = useState(false);

  const getGenderText = (gender: TinderGenderEnum) => {
    if (gender === TinderGenderEnum.MALE) {
      return 'Nam';
    }
    if (gender === TinderGenderEnum.FEMAILE) {
      return 'Nữ';
    }
    if (gender === TinderGenderEnum.ALL) {
      return 'Tất cả';
    }
    return '';
  };

  const buttonActive = () => {
    if (step === 1 && !gender) {
      return false;
    }
    if (step === 2 && !target) {
      return false;
    }
    if (step === 3 && images.length < 2) {
      return false;
    }
    if (step === 4 && !intro) {
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!buttonActive()) {
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
    if (step === 4) {
      createProfile();
    }
  };

  const handleback = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      goBack();
    }
  };

  const onChooseImages = (image: PickerImage) => {
    setImages([...images, image]);
  };

  const onRemoveImage = (index: number) => {
    const temp = [...images];
    temp.splice(index, 1);
    setImages(temp);
  };

  const [create] = useCreateTinderProfileMutation({
    onError: () => {
      somethingWentWrongErrorNotification();
      setLoading(false);
    },
    onCompleted: () => {
      setLoading(false);
    },
  });

  const createProfile = async () => {
    const uploadedImages: string[] = [];
    setLoading(true);
    for (let i = 0; i < images.length; i++) {
      const res = await upload({
        uri: images[i].path,
        type: images[i].mime,
        name: images[i].filename ?? 'name',
        height: images[i].height ?? 0,
        width: images[i].width ?? 0,
      });
      uploadedImages.push(res.filePath ?? '');
    }
    create({
      variables: {
        input: {
          intro,
          images: uploadedImages,
          gender: gender ?? TinderGenderEnum.MALE,
          target: target ?? TinderGenderEnum.MALE,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent visible={loading}>
        <View style={{ flex: 1, backgroundColor: theme.modal, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              width: '60%',
              height: '30%',
              backgroundColor: theme.base,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              style={{ height: 100, width: 100 }}
              source={require('../../../assets1/tinder_loading.json')}
              autoPlay
            />
            <Text style={{ marginHorizontal: 10, fontSize: 16, color: theme.text01, marginTop: 10 }}>
              Hồ sơ của bạn đang được xử lí
            </Text>
          </View>
        </View>
      </Modal>
      <View style={styles.progressBar}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={ThemeStatic.tinderSchema}
          style={[styles.gradientProgressbar, { width: `${(step / 4) * 100}%` }]}
        />
      </View>
      <MaterialIcons
        onPress={handleback}
        name="arrow-back-ios"
        style={{ padding: 20, color: theme.text01 }}
        size={IconSizes.x6}
      />
      {step === 1 && (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Giới tính của tôi</Text>
          <View style={styles.row}>
            {genderList.slice(0, 2).map((item, index) => {
              return (
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={gender === item ? ThemeStatic.tinderSchema : [theme.text02, theme.text02]}
                  style={[styles.chooseItem]}>
                  <TouchableOpacity
                    onPress={() => setGender(item)}
                    style={styles.chooseItemInside}
                    key={`gender-${index}`}>
                    <Text style={gender === item ? styles.textActive : styles.text}>{getGenderText(item)}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              );
            })}
          </View>
        </View>
      )}
      {step === 2 && (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Tôi muốn kết nối với</Text>
          <View style={styles.row}>
            {genderList.map((item, index) => {
              return (
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={target === item ? ThemeStatic.tinderSchema : [theme.text02, theme.text02]}
                  style={[styles.chooseItem]}>
                  <TouchableOpacity
                    onPress={() => setTarget(item)}
                    style={styles.chooseItemInside}
                    key={`tartet-${index}`}>
                    <Text style={target === item ? styles.textActive : styles.text}>{getGenderText(item)}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              );
            })}
          </View>
        </View>
      )}
      {step === 3 && <ChooseImage onChooseImage={onChooseImages} onRemoveImage={onRemoveImage} images={images} />}
      {step === 4 && (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Đôi điều về tôi</Text>
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
          <Text style={styles.countText}>{200 - intro.length}</Text>
        </View>
      )}
      <TouchableOpacity style={{ width: '80%', alignSelf: 'center' }} onPress={handleNext}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={buttonActive() ? ThemeStatic.tinderSchema : [theme.text02, theme.text02]}
          style={styles.btn}>
          <Text style={styles.btnText}>Tiếp theo</Text>
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
    },
    progressBar: {
      height: 40,
      width: '100%',
      ...ifIphoneX({
        paddingTop: 60,
      }),
      backgroundColor: theme.secondary,
    },
    gradientProgressbar: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '20%',
      height: 40,
      ...ifIphoneX({
        paddingTop: 60,
      }),
    },
    contentContainer: {
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: '500',
      marginBottom: 28,
      color: theme.text01,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chooseItem: {
      padding: 2,
      marginRight: 16,
      borderRadius: 4,
    },
    chooseItemInside: {
      backgroundColor: theme.base,
      width: '100%',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 4,
    },
    text: {
      color: theme.text02,
      fontWeight: '600',
    },
    textActive: {
      color: ThemeStatic.tinder,
    },
    btn: {
      width: '80%',
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
    inputBorder: {
      height: 1,
    },
    input: {
      height: 100,
      backgroundColor: theme.base,
      color: theme.text02,
    },
    countText: {
      alignSelf: 'flex-end',
      marginTop: 4,
      fontWeight: '600',
      color: theme.text02,
    },
  });

export default NewUserProcess;
