import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, Pressable } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { Images } from '../../assets1/icons';
import Background from '../../components/Background';
import NativeImage from '../../components/shared/NativeImage';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { isLoginState } from '../../recoil/auth/atoms';
import { ThemeStatic } from '../../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IconSizes } from '../../theme/Icon';
import { getImageFromLibrary } from '../../utils/shared';

const WelcomeScreen = React.memo(() => {
  const user = useCurrentUser();
  const setIsLogin = useSetRecoilState(isLoginState);

  const [step, setStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState<Image>({} as Image);
  const [editAvatar, setEditAvatar] = useState(user?.avatar ?? '');
  const previous = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const next = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const chooseImage = async () => {
    const image = await getImageFromLibrary(120, 120, true);
    console.log(image);
    if (image) {
      setSelectedImage(image ?? ({} as Image));
      setEditAvatar(image?.path ?? '');
    }
  };

  return (
    <Background style={styles.container}>
      <Image source={Images.ntqLogo} />
      {step === 0 && (
        <View style={styles.step1}>
          <Text style={styles.text}>Xin chào,</Text>
          <Text style={styles.name}>{user?.fullName}</Text>
          <Pressable style={styles.avatar} onPress={chooseImage}>
            <NativeImage uri={editAvatar} style={styles.avatar} />
            <View style={styles.overLay}>
              <MaterialIcons name="image" color={ThemeStatic.placeholder} size={IconSizes.x6} />
            </View>
          </Pressable>
        </View>
      )}
      <View style={styles.bottomAction}>
        <TouchableOpacity disabled={step === 0} onPress={previous}>
          <Text style={step === 0 ? styles.btnTextVisible : styles.btnText}>Quay lại</Text>
        </TouchableOpacity>
        <View style={styles.dotContainer}>
          <View style={step === 0 ? styles.activeDot : styles.dot} />
          <View style={step === 1 ? styles.activeDot : styles.dot} />
          <View style={step === 2 ? styles.activeDot : styles.dot} />
        </View>
        <TouchableOpacity onPress={next}>
          <Text style={styles.btnText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'space-between',
  },
  bottomAction: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    padding: 6,
    borderColor: ThemeStatic.white,
    borderWidth: 1,
    borderRadius: 100,
    marginHorizontal: 12,
  },
  activeDot: {
    padding: 6,
    borderColor: ThemeStatic.white,
    backgroundColor: ThemeStatic.white,
    borderWidth: 1,
    borderRadius: 100,
    marginHorizontal: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: ThemeStatic.white,
  },
  btnTextVisible: {
    fontSize: 16,
    fontWeight: '600',
    color: 'transparent',
  },
  step1: {
    height: '60%',
    marginHorizontal: 20,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: ThemeStatic.white,
    fontWeight: '600',
    marginBottom: 8,
  },
  name: {
    color: ThemeStatic.white,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  overLay: {
    position: 'absolute',
    backgroundColor: ThemeStatic.translucent,
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
