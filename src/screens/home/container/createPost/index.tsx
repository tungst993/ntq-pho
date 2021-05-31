import React, { useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
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
import { PostComponent } from '../../../../components/PostComponent';
import ListImageDisplay from '../../../../components/shared/ListImageDisplay';
import { Modalize } from 'react-native-modalize';
import { VideoComponent } from '../../../../components/VideoComponent';

const { FontWeights, FontSizes } = Typography;

const CreatePost = React.memo(() => {
  const { goBack } = useNavigation();
  const user = useCurrentUser();
  const theme = useRecoilValue(themeState);
  const styles = style(theme);
  const [listImage, setListImage] = useState<Array<string>>([]);
  const [videoPath, setVideoPath] = useState<string>();

  console.log('list', listImage);

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const chooseImage = async (type: 'photo' | 'video' | 'any' | undefined) => {
    const file = await getImageFromLibrary(120, 120, false, type);
    console.log('file', file);
    if (file) {
      if (type === 'photo') {
        setListImage([...listImage, file.path]);
      }

      if (type === 'video') {
        setVideoPath(file.path);
      }
    }
  };

  const removeImage = (uri: string) => {
    setListImage([...listImage.filter((item) => item !== uri)]);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <GoBackHeader
            title="Tạo bài viết"
            iconSize={IconSizes.x5}
            IconRight={() => (
              <TouchableOpacity onPress={goBack}>
                <Text style={{ ...styles.text, fontWeight: 'bold' }}>Đăng</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ ...mainStyles.viewWrapper, marginTop: 10 }}>
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
          colors={[theme.base, theme.base]}
          style={{
            height: 1,
            marginHorizontal: 20,
          }}
        />
        {listImage.length > 0 && !videoPath && (
          <View>
            <View style={styles.editImage}>
              <TouchableOpacity hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }} onPress={onOpen}>
                <Text style={{ fontWeight: 'bold' }}>Chỉnh sửa tất cả</Text>
              </TouchableOpacity>
            </View>
            <ListImageDisplay dataImage={listImage} isClickImage={false} />
          </View>
        )}

        {videoPath && <VideoComponent uri={videoPath} />}
        <View style={styles.optionWrapper}>
          {!videoPath && (
            <TouchableOpacity style={styles.optionItem} onPress={() => chooseImage('photo')}>
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={[MaterialColors.green[600], MaterialColors.green[500]]}
                style={styles.iconWrapper}>
                <Ionicons color={ThemeStatic.white} name="ios-images" size={IconSizes.x4} />
              </LinearGradient>
              <Text style={{ color: theme.text01, marginTop: 10 }}>Ảnh</Text>
            </TouchableOpacity>
          )}

          {!(listImage.length > 0) && (
            <TouchableOpacity style={styles.optionItem} onPress={() => chooseImage('video')}>
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={[MaterialColors.purple[600], MaterialColors.purple[500]]}
                style={styles.iconWrapper}>
                <Ionicons color={ThemeStatic.white} name="videocam" size={IconSizes.x4} />
              </LinearGradient>
              <Text style={{ color: theme.text01, marginTop: 10 }}>Video</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.optionItem}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={[MaterialColors.orange[600], MaterialColors.orange[500]]}
              style={styles.iconWrapper}>
              <Ionicons color={ThemeStatic.white} name="md-stats-chart" size={IconSizes.x4} onPress={() => {}} />
            </LinearGradient>
            <Text style={{ color: theme.text01, marginTop: 10 }}>Thăm dò ý kiến</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Modalize ref={modalizeRef} adjustToContentHeight={false} modalStyle={styles.viewAllImage}>
          <FlatList
            data={listImage}
            style={{ paddingTop: 24 }}
            renderItem={(item) => (
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={[MaterialColors.grey[600], MaterialColors.grey[500]]}
                style={styles.viewImageWrapper}>
                <View style={styles.removeImage}>
                  <TouchableOpacity style={{ width: 40, height: 40 }} onPress={() => removeImage(item.item)}>
                    <LinearGradient
                      start={{ x: 1, y: 1 }}
                      end={{ x: 1, y: 1 }}
                      colors={[MaterialColors.grey[100], MaterialColors.grey[600]]}
                      style={styles.iconWrapper}>
                      <Ionicons color={ThemeStatic.black} name="close" size={IconSizes.x4} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <NativeImage style={{ height: responsiveHeight(20) }} uri={item.item} />
              </LinearGradient>
            )}
          />
        </Modalize>
      </View>
    </>
  );
});

const style = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.secondary,
      flex: 1,
    },
    header: {
      ...ifIphoneX({
        paddingTop: 44,
        paddingBottom: 10,
      }),
      borderBottomColor: theme.base,
      borderBottomWidth: 1,
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
      minHeight: 100,
      maxHeight: 500,
      fontSize: 15,
      color: theme.text01,
      paddingVertical: 10,
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
    optionWrapper: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    optionItem: {
      width: (responsiveWidth(100) - 60) / 2,
      backgroundColor: theme.base,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginTop: 20,
    },
    iconWrapper: {
      width: 30,
      height: 30,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewAllImage: {
      paddingHorizontal: 20,
      backgroundColor: theme.base,
    },
    viewImageWrapper: {
      paddingHorizontal: responsiveWidth(20),
      backgroundColor: MaterialColors.grey[600],
      borderRadius: 20,
      position: 'relative',
      marginBottom: 20,
    },
    removeImage: {
      position: 'absolute',
      width: 40,
      height: 40,
      marginBottom: 10,
      right: 0,
      top: 10,
    },
  });

export default CreatePost;
