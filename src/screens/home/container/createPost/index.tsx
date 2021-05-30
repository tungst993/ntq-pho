import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, SafeAreaView, StyleSheet, View, ImageBackground, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import type { Image as PickerImage } from 'react-native-image-crop-picker';

import NativeImage from '../../../../components/shared/NativeImage';
import { useCurrentUser } from '../../../../hooks/useCurrentUser';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { IconSizes } from '../../../../theme/Icon';
import { mainStyles } from '../../../../theme/mainStyles';
import { MaterialColors, ThemeStatic, Typography } from '../../../../theme';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../../../recoil/theme/atoms';
import type { ThemeColors, ThemeType } from '../../../../types/theme';
import GoBackHeader from '../../../../components/shared/layout/headers/GoBackHeader';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { useFileUpload } from '../../../../hooks/useFileUpload';
import { getImageFromLibrary } from '../../../../utils/shared';

const { FontWeights, FontSizes } = Typography;

const CreatePost = React.memo(() => {
  const { goBack } = useNavigation();
  const user = useCurrentUser();
  const theme = useRecoilValue(themeState);
  const styles = style(theme);
  const [selectedImage, setSelectedImage] = useState<PickerImage>();
  const [editAvatar, setEditAvatar] = useState(user?.avatar ?? '');
  const [listImage, setListImage] = useState<Array<string>>([]);

  const chooseImage = async () => {
    const image = await getImageFromLibrary(120, 120, false);
    if (image) {
      setSelectedImage(image ?? ({} as Image));
      setEditAvatar(image?.path ?? '');
      setListImage([...listImage, image.path]);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={ThemeStatic.commonSchema}
        style={styles.header}>
        <GoBackHeader
          title="Tạo bài viết"
          iconSize={IconSizes.x5}
          IconRight={() => (
            <TouchableOpacity onPress={goBack}>
              <Text style={{ ...styles.text, fontWeight: 'bold' }}>Đăng</Text>
            </TouchableOpacity>
          )}
        />
      </LinearGradient>
      <View style={{ ...mainStyles.viewWrapper, marginTop: 40 }}>
        <TextInput
          multiline
          numberOfLines={10}
          style={{ ...styles.input }}
          placeholder="Bạn đang nghĩ gì?"
          placeholderTextColor={theme.text02}
        />
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={ThemeStatic.commonSchema}
        style={{
          height: 1,
          marginHorizontal: 20,
        }}
      />
      {listImage.length > 0 && (
        <View style={styles.listImageWrapper}>
          <View style={styles.editImage}>
            <TouchableOpacity hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>Chỉnh sửa tất cả</Text>
            </TouchableOpacity>
          </View>

          {listImage.map((item, index) => (
            <View key={index}>
              <NativeImage uri={item} style={styles.avatar} />
            </View>
          ))}
        </View>
      )}
      <View style={{ ...styles.navBottom }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={ThemeStatic.commonSchema}
          style={{ padding: 1, borderRadius: 10 }}>
          <View
            style={{
              ...mainStyles.rowCenter,
              justifyContent: 'space-between',
              width: '100%',
              borderColor: MaterialColors.grey[500],
              padding: 20,
              borderRadius: 10,
              backgroundColor: theme.base,
            }}>
            <View>
              <Text style={styles.textAddMore}>Thêm vào bài viết</Text>
            </View>
            <View style={{ ...styles.row }}>
              <Ionicons
                color={MaterialColors.green[500]}
                style={{ marginRight: 20 }}
                name="ios-images"
                size={IconSizes.x6}
                onPress={chooseImage}
              />

              <Ionicons
                color={MaterialColors.orange[500]}
                name="md-stats-chart"
                size={IconSizes.x6}
                onPress={() => {}}
              />
              {/* <EntypoIcons color={MaterialColors.red[500]} name="video" size={IconSizes.x5} /> */}
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={ThemeStatic.commonSchema}
          style={styles.linearGradient}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Đăng</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
});

const style = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.base,
      flex: 1,
    },
    header: {
      ...ifIphoneX({
        paddingTop: 44,
      }),
    },
    row: {
      flexDirection: 'row',
    },
    rowCenter: {},
    spaceBetween: {
      justifyContent: 'space-between',
    },
    avatarImage: {
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    input: {
      height: 100,
      fontSize: 15,
      color: theme.text01,
      // paddingVertical: 80,
      // paddingHorizontal: 80,
    },
    text: {
      color: theme.text01,
      fontSize: 18,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    userInfoWrapper: {
      borderTopWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      borderColor: 'gray',
      borderBottomWidth: 1,
    },
    userInfo: {
      marginLeft: 12,
    },
    nameText: {
      ...FontSizes.Label,
      ...FontWeights.Bold,
    },
    navBottom: {
      position: 'absolute',
      bottom: 0,
      marginHorizontal: 20,
      marginBottom: 40,
      width: responsiveWidth(100) - 40,
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    textAddMore: {
      color: theme.text01,
      fontWeight: 'bold',
      fontSize: 15,
    },
    avatar: {
      width: responsiveWidth(50) - 20,
      height: responsiveWidth(50) - 20,
    },
    listImageWrapper: {
      flexDirection: 'row',
      marginTop: 20,
      borderWidth: 1,
      marginHorizontal: 20,
      position: 'relative',
    },
    editImage: {
      position: 'absolute',
      top: 12,
      backgroundColor: MaterialColors.grey[200],
      zIndex: 10,
      left: 12,
      padding: 12,
      borderRadius: 5,
    },
    linearGradient: {
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      width: '100%',
      marginTop: 20,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });

export default CreatePost;
