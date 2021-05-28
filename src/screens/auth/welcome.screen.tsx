import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Pressable } from 'react-native';
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
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import type { UserDepartmentEnum, UserPositionEnum } from '../../graphql/type.interface';
import LinearGradient from 'react-native-linear-gradient';
import { listDepartment, listPosition } from '../../environment/constants';
import {
  UpdateUserInfoMutationVariables,
  useUpdateUserInfoMutation,
} from '../../graphql/mutations/updateUserInfo.generated';
import { somethingWentWrongErrorNotification } from '../../helpers/notifications';
import { MeDocument } from '../../graphql/queries/me.generated';
import { useFileUpload } from '../../hooks/useFileUpload';
import type { Image as PickerImage } from 'react-native-image-crop-picker';
import LoadingIndicator from '../../components/shared/LoadingIndicator';

const WelcomeScreen = React.memo(() => {
  const user = useCurrentUser();
  const setIsLogin = useSetRecoilState(isLoginState);
  const [upload] = useFileUpload();

  const [step, setStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState<PickerImage>();
  const [editAvatar, setEditAvatar] = useState(user?.avatar ?? '');
  const [department, setDepartment] = useState<UserDepartmentEnum>();
  const [position, setPosition] = useState<UserPositionEnum>();

  const [update, { loading }] = useUpdateUserInfoMutation({
    onCompleted: () => {
      setIsLogin(true);
    },
    onError: () => {
      somethingWentWrongErrorNotification();
    },
    update: async (proxy, { data, errors }) => {
      if (data?.updateUserInfo) {
        proxy.writeQuery({
          query: MeDocument,
          data: {
            me: data?.updateUserInfo,
          },
        });
        if (errors) {
          return;
        }
      }
    },
  });

  const previous = () => {
    if (step === 0) {
      return;
    }
    setStep(step - 1);
  };

  const next = async () => {
    if (step === 2) {
      if (position) {
        const updateDto: UpdateUserInfoMutationVariables['input'] = {
          department: department,
          position,
        };
        if (selectedImage) {
          const image = await upload({
            uri: selectedImage.path,
            type: selectedImage.mime,
            name: selectedImage.filename ?? 'name',
            height: selectedImage.height ?? 0,
            width: selectedImage.width ?? 0,
          });
          updateDto.avatar = image.filePath;
        }
        update({
          variables: {
            input: updateDto,
          },
        });
        return;
      }
      return;
    }
    if (step === 1 && !department) {
      return;
    }
    setStep(step + 1);
  };

  const chooseImage = async () => {
    const image = await getImageFromLibrary(300, 300, true);
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
      {step === 1 && (
        <View style={styles.itemWrapper}>
          <Text style={styles.name}>Đơn vị bạn đang làm việc</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {listDepartment.map((item, index) => (
              <LinearGradient
                key={`department-${index}`}
                colors={item === department ? ['#4c669f', '#3b5998', '#192f6a'] : ['white', 'white']}
                style={styles.itemView}
                onTouchStart={() => setDepartment(item)}>
                <Text
                  style={
                    item === department
                      ? { color: 'white', fontWeight: 'bold', fontSize: 13 }
                      : { color: ThemeStatic.accent, fontWeight: 'bold', fontSize: 13 }
                  }>
                  {item}
                </Text>
              </LinearGradient>
            ))}
          </View>
        </View>
      )}
      {step === 2 && (
        <View style={styles.itemWrapper}>
          <Text style={styles.name}>Vị trí bạn đang làm việc</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {listPosition.map((item, index) => (
              <LinearGradient
                key={`position-${index}`}
                colors={item === position ? ['#4c669f', '#3b5998', '#192f6a'] : ['white', 'white']}
                style={styles.itemView}
                onTouchStart={() => setPosition(item)}>
                <Text
                  style={
                    item === position
                      ? { color: 'white', fontWeight: 'bold', fontSize: 13 }
                      : { color: ThemeStatic.accent, fontWeight: 'bold', fontSize: 13 }
                  }>
                  {item}
                </Text>
              </LinearGradient>
            ))}
          </View>
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
        {loading ? (
          <LoadingIndicator color={ThemeStatic.white} size={IconSizes.x0} />
        ) : (
          <TouchableOpacity onPress={next}>
            <Text style={styles.btnText}>{step === 2 ? 'Xác nhận' : 'Tiếp theo'}</Text>
          </TouchableOpacity>
        )}
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
    marginBottom: responsiveHeight(1),
  },
  name: {
    color: ThemeStatic.white,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: responsiveHeight(8),
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'contain',
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
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: (responsiveWidth(20) - 40) / 2,
    width: responsiveWidth(100),
  },
  itemView: {
    width: responsiveWidth(25),
    alignItems: 'center',
    height: responsiveWidth(10),
    borderColor: ThemeStatic.accent,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 30,
    borderRadius: responsiveWidth(10),
  },
});

export default WelcomeScreen;
