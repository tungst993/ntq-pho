/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../../recoil/theme/atoms';
import type { ThemeColors } from '../../../types/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import { IconSizes } from '../../../theme/Icon';
import { useNavigation } from '@react-navigation/core';
import NativeImage from '../../../components/shared/NativeImage';
import moment from 'moment';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import ImageView from 'react-native-image-view';
import Octicons from 'react-native-vector-icons/Octicons';
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { numberReaction } from '../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AnimatedSearchBar from '../../../components/shared/layout/headers/AnimatedSearchBar';
import { Comment } from '../../../components/Comment';
export const DetailPost = () => {
  const theme = useRecoilValue(themeState);
  const style = styles(theme);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [listImageFull, setListImageFull] = useState<Array<any>>([]);
  const [indexImage, setIndexImage] = useState(0);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState('');
  const [isReply, setIsReply] = useState(false);
  const [infoUserReply, setInfoUserReply] = useState('');

  const data = [
    'https://uploads-ssl.webflow.com/5f5f2b58b1af780151375838/606916bf1e21c70142eb887a_GaiHot2k__anh-gai-xinh-de-thuong-viet-nam%252B%2525282%252529.jpeg',
    'https://anhgaixinh.top/wp-content/uploads/2021/01/top-10-gai-xinh-viet-nam-tren-mang-nam-2021-cuc-pham-mi-nhan-thien-ha-0.jpg',
    'http://diembaoaz.com/wp-content/uploads/2018/11/anh-girl-xinh-9-1.jpg',
    'https://stpeterline.com/documents/814359/0/gai-xinh-1.jpg/b71f793b-ef66-4f68-b736-99ece5211644?t=1615518347250',
    'https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg',
  ];
  useEffect(() => {
    const arr: Array<any> = [];
    data.map((i) => {
      const obj = { source: { uri: i } };
      arr.push(obj);
    });
    setListImageFull(arr);
    Keyboard.addListener('keyboardDidHide', () => setIsReply(false));

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', () => setIsReply(false));
    };
  }, []);
  const ImageArea = () => {
    if (data.length === 1) {
      return (
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
            setIndexImage(0);
          }}>
          <NativeImage uri={data[0]} style={style.image1} />
        </TouchableOpacity>
      );
    } else if (data.length === 2) {
      return (
        <>
          <View style={style.rowHorizontal}>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setIndexImage(0);
              }}>
              <NativeImage uri={data[0]} style={style.image2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setIndexImage(1);
              }}>
              <NativeImage uri={data[1]} style={style.image2} />
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (data.length === 3) {
      return (
        <View style={style.rowHorizontal}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
              setIndexImage(0);
            }}>
            <NativeImage uri={data[0]} style={style.image2} />
          </TouchableOpacity>
          <View style={style.column}>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(1);
              }}>
              <NativeImage uri={data[1]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(2);
              }}>
              <NativeImage uri={data[2]} style={style.image3} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (data.length === 4) {
      return (
        <View style={style.rowHorizontal}>
          <View style={style.column}>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(0);
              }}>
              <NativeImage uri={data[0]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(1);
              }}>
              <NativeImage uri={data[1]} style={style.image3} />
            </TouchableOpacity>
          </View>
          <View style={style.column}>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(2);
              }}>
              <NativeImage uri={data[2]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(3);
              }}>
              <NativeImage uri={data[3]} style={style.image3} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (data.length > 4) {
      return (
        <View style={style.rowHorizontal}>
          <View style={style.column}>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(0);
              }}>
              <NativeImage uri={data[0]} style={[style.image3]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(1);
              }}>
              <NativeImage uri={data[1]} style={style.image3} />
            </TouchableOpacity>
          </View>
          <View style={style.column}>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(2);
              }}>
              <NativeImage uri={data[2]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setIndexImage(3);
              }}
              style={style.viewImage3}>
              <NativeImage uri={data[3]} style={[style.image3]} />
              <View
                style={[
                  style.image3,
                  {
                    position: 'absolute',
                    backgroundColor: theme.modal,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text style={style.textMoreImage}>+{data.length - 4}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  const ReactionArea = () => {
    return (
      <View style={[style.row, style.paddingHorizontal20, style.border, { justifyContent: 'space-around', paddingVertical: 12, marginVertical: 10, }]}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 50, right: 50 }}
          onPress={() => setLike(!like)}
          style={[style.row]}>
          {like ? (
            <LottieView
              source={require('../../../assets1/like.json')}
              style={{
                marginRight: 8,
                width: 20,
                height: 20,
                transform: [{ scale: 1.8 }],
              }}
              autoPlay
              loop={false}
            />
          ) : (
            <AntDesign name="like2" style={{ fontSize: 20, marginRight: 10 }} color={theme.text02} />
          )}

          <Text style={[style.txtAction, { color: like ? '#3568FF' : theme.text02 }]}>Thích</Text>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 50, right: 50 }} style={[style.row, {}]}>
          <Octicons name="comment" style={{ fontSize: 18, marginRight: 10, paddingTop: 10 }} color={theme.text02} />
          <Text style={style.txtAction}>Bình luận</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const CommentArea = () => {
    return (
      <FlatList
        scrollEnabled={false}
        data={[1, 2, 3, 4]}
        renderItem={({ item, index }) => {
          return (
            <Comment onReply={() => setIsReply(true)} infoUser={(value) => setInfoUserReply(value)} />
          );
        }}
        keyExtractor={index => index.toString()}
        contentContainerStyle={[style.paddingHorizontal20, { marginBottom: 10 }]}
      />
    );
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
      <View style={[style.header, style.row]}>
        <Entypo onPress={navigation.goBack} name="chevron-thin-left" size={IconSizes.x5} color={theme.text01} style={{ marginRight: 10 }} />
        <View style={style.row}>
          <NativeImage uri={'https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg'} style={style.avatar} />
          <View>
            <Text style={style.textUserName}>Username</Text>
            <Text style={style.textTime}>{moment().fromNow()}</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={style.container}>

        <Text style={[style.textContent, style.paddingHorizontal20]}>Như một thói quen, cứ thứ 2 đầu tuần, các thành viên lại cùng nhau khoác lên mình chiếc áo đồng phục lan tỏa niềm tự hào và chất riêng của người NTQ. Ngày hôm nay, các bạn hãy mặc áo đồng phục của công ty (dù có đến công ty hay làm việc ở nhà) và đừng quên chụp ảnh lại để khoe với mọi người nha!!</Text>
        {ImageArea()}
        {ReactionArea()}
        <View style={[style.row, style.paddingHorizontal20]}>
          <LinearGradient
            colors={['#35a3fa', '#2e6ee3']}
            style={{
              padding: 6,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 32,
              marginRight: 10,
            }}>
            <AntDesign name="like1" style={{ fontSize: 9 }} color={theme.white} />
          </LinearGradient>
          <Text style={style.textReaction}>{numberReaction(100)}</Text>
        </View>
        {CommentArea()}

      </ScrollView>
      <View style={[style.viewPostComment]}>
        {isReply &&
          <View style={[style.row, { marginBottom: 10 }]}>
            <Text style={{ fontSize: 12, color: theme.text01, paddingLeft: 50, }}>Đang trả lời <Text style={{ fontWeight: '600' }}>{infoUserReply}</Text></Text>
            <TouchableOpacity onPress={() => setIsReply(false)} style={{ marginLeft: 20 }}><Text style={{ color: theme.text01 }}>Huỷ</Text></TouchableOpacity>
          </View>}
        <View style={style.row}>
          <SimpleLineIcons name="camera" color={theme.text02} size={20} />
          <AnimatedSearchBar placeholder={'Viết bình luận ...'} value={comment} open={isReply} onChangeText={setComment} />
        </View>
      </View>
      <ImageView onClose={() => setVisible(false)} images={listImageFull} imageIndex={indexImage} isVisible={visible} />
    </KeyboardAvoidingView>
  );
};
const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: theme.base,
    },
    header: {
      backgroundColor: theme.base,
      ...ifIphoneX({
        paddingTop: 44,
        paddingBottom: 10,
      }),
      paddingHorizontal: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 40,
      marginRight: 10,
    },
    textUserName: {
      color: theme.text01,
      fontSize: 14,
      fontWeight: '600',
    },
    textTime: {
      fontSize: 12,
      color: theme.text02,
      marginTop: 2,
    },
    textContent: {
      marginVertical: 16,
      color: theme.text01,
    },
    paddingHorizontal20: {
      paddingHorizontal: 20,
    },
    image1: {
      width: responsiveWidth(100),
      height: 290,
    },
    image2: {
      width: responsiveWidth(49.5),
      height: 290,
    },
    image3: {
      width: responsiveWidth(49.5),
      height: '100%',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.text02
    },
    viewImage3: {
      width: responsiveWidth(49.5),
      height: '49.5%',
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 290,
    },
    rowHorizontal: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    textMoreImage: {
      fontSize: 24,
      color: theme.base,
      fontWeight: 'bold',
    },
    textReaction: {
      fontSize: 14,
      color: theme.text02,
    },
    txtAction: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text02,
      alignSelf: 'center',
      paddingTop: 5,
    },
    border: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme.text02,
      marginHorizontal: 15,
      paddingTop: 8,
    },
    viewComment: {
      marginTop: 12,
      alignItems: 'flex-start'
    },
    viewContentComment: {
      backgroundColor: theme.comment,
      padding: 10,
      borderRadius: 12,
      flex: 1
    },
    txtComment: {
      fontSize: 14,
      color: theme.text01,
      lineHeight: 16
    },
    viewPostComment: {
      backgroundColor: theme.base,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.secondary,
      paddingVertical: 8,
      paddingHorizontal: 20,
    },
    ipComment: {
      color: theme.text01,
    },
    viewIpComment: {
      backgroundColor: theme.comment,
      paddingVertical: 4,
      marginLeft: 10,
      borderRadius: 20,
      flex: 1,
      paddingHorizontal: 8,
      minHeight: 36
    }
  });
