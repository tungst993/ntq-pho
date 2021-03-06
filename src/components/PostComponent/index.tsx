/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';
import NativeImage from '../shared/NativeImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import ImageView from 'react-native-image-view';
import LottieView from 'lottie-react-native';
import { VideoComponent } from '../VideoComponent';
import { useNavigation } from '@react-navigation/core';
import { AppRoutes } from '../../navigator/app-routes';
import { numberReaction } from '../../utils/constants';
import { useGetAllPostLazyQuery, useGetAllPostQuery } from '../../graphql/queries/getAllPost.generated';
import type { onError } from '@apollo/client/link/error';
import { useMyPostQuery } from '../../graphql/queries/myPost.generated';

interface PostProps {
  dataImage?: Array<string>;
}
const data = [
  'https://uploads-ssl.webflow.com/5f5f2b58b1af780151375838/606916bf1e21c70142eb887a_GaiHot2k__anh-gai-xinh-de-thuong-viet-nam%252B%2525282%252529.jpeg',
  'https://anhgaixinh.top/wp-content/uploads/2021/01/top-10-gai-xinh-viet-nam-tren-mang-nam-2021-cuc-pham-mi-nhan-thien-ha-0.jpg',
  'http://diembaoaz.com/wp-content/uploads/2018/11/anh-girl-xinh-9-1.jpg',
  'https://stpeterline.com/documents/814359/0/gai-xinh-1.jpg/b71f793b-ef66-4f68-b736-99ece5211644?t=1615518347250',
  'https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg',
];
export const PostComponent = React.memo<PostProps>(({ dataImage = data }) => {
  const theme = useRecoilValue(themeState);
  const style = styles(theme);
  const [like, setLike] = useState(false);
  const [visible, setVisible] = useState(false);
  const [listImageFull, setListImageFull] = useState<Array<any>>([]);
  const [indexImage, setIndexImage] = useState(0);
  const [showMore, setShowmore] = useState(false);
  const navigation = useNavigation();

  const {data} = useGetAllPostQuery({
    variables: {
      page: 1,
      limit: 10
    },
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    const arr: Array<any> = [];
    dataImage.map((i) => {
      const obj = { source: { uri: i } };
      arr.push(obj);
    });
    setListImageFull(arr);
  }, [dataImage]);

  const ImageArea = () => {
    if (dataImage.length === 1) {
      return (
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
            setIndexImage(0);
          }}>
          <NativeImage uri={dataImage[0]} style={style.image1} />
        </TouchableOpacity>
      );
    } else if (dataImage.length === 2) {
      return (
        <>
          <View style={style.rowHorizontal}>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setIndexImage(0);
              }}>
              <NativeImage uri={dataImage[0]} style={style.image2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setIndexImage(1);
              }}>
              <NativeImage uri={dataImage[1]} style={style.image2} />
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (dataImage.length === 3) {
      return (
        <View style={style.rowHorizontal}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
              setIndexImage(0);
            }}>
            <NativeImage uri={dataImage[0]} style={style.image2} />
          </TouchableOpacity>
          <View style={style.column}>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(1);
              }}>
              <NativeImage uri={dataImage[1]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(2);
              }}>
              <NativeImage uri={dataImage[2]} style={style.image3} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (dataImage.length === 4) {
      return (
        <View style={style.rowHorizontal}>
          <View style={style.column}>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(0);
              }}>
              <NativeImage uri={dataImage[0]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(1);
              }}>
              <NativeImage uri={dataImage[1]} style={style.image3} />
            </TouchableOpacity>
          </View>
          <View style={style.column}>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(2);
              }}>
              <NativeImage uri={dataImage[2]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(3);
              }}>
              <NativeImage uri={dataImage[3]} style={style.image3} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (dataImage.length > 4) {
      return (
        <View style={style.rowHorizontal}>
          <View style={style.column}>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(0);
              }}>
              <NativeImage uri={dataImage[0]} style={[style.image3]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(1);
              }}>
              <NativeImage uri={dataImage[1]} style={style.image3} />
            </TouchableOpacity>
          </View>
          <View style={style.column}>
            <TouchableOpacity
              style={style.viewImage3}
              onPress={() => {
                setVisible(true);
                setIndexImage(2);
              }}>
              <NativeImage uri={dataImage[2]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setIndexImage(3);
              }}
              style={style.viewImage3}>
              <NativeImage uri={dataImage[3]} style={[style.image3]} />
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
                <Text style={style.textMoreImage}>+{dataImage.length - 4}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const onComment = () => {
    navigation.navigate(AppRoutes.DETAIL_POST);
  };
  return (
    <>
    {data?.getAllPost?.items && data?.getAllPost?.items.map((item, index) => (
      <View style={style.container}>
      <Pressable onPress={onComment} style={{ ...style.row, ...style.paddingHorizontal20 }}>
        <NativeImage
          resizeMode={'contain'}
          uri={
            item.creatorInfo?.avatar || ''
          }
          style={style.imageAvatar}
        />
        <View>
          <Text style={style.textUserName}>{item.creatorInfo?.fullName}</Text>
          <Text style={style.textTime}>{moment().fromNow()}</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => setShowmore(!showMore)}>
        <Text numberOfLines={showMore ? undefined : 2} style={[style.textContent, style.paddingHorizontal20]}>
          {item.caption}
          </Text>
      </Pressable>
      {/* {ImageArea()} */}
      <VideoComponent uri={'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4'} />

      <Pressable onPress={onComment} style={[style.rowHorizontal, style.paddingHorizontal20, { marginVertical: 12 }]}>
        <View style={style.row}>
          <LinearGradient
            colors={['#35a3fa', '#2e6ee3']}
            style={{
              padding: 6,
              width: 24,
              height: 24,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 32,
              marginRight: 10,
            }}>
            <AntDesign name="like1" style={{ fontSize: 12 }} color={theme.white} />
          </LinearGradient>
          <Text style={style.textReaction}>{numberReaction(100)}</Text>
        </View>
        <Text style={style.textReaction}>{numberReaction(20)} b??nh lu???n</Text>
      </Pressable>
      <View style={[style.rowHorizontal, style.paddingHorizontal20, style.border, { justifyContent: 'space-around' }]}>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 50, right: 50 }}
          onPress={() => setLike(!like)}
          style={[style.row]}>
          {like ? (
            // <AntDesign name="like1" style={{ fontSize: 20, marginRight: 10 }} color={theme.accent} />
            <LottieView
              source={require('../../assets1/like.json')}
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

          <Text style={[style.txtAction, { color: like ? '#3568FF' : theme.text02 }]}>Th??ch</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComment} hitSlop={{ top: 10, bottom: 10, left: 50, right: 50 }} style={[style.row, {}]}>
          <Octicons name="comment" style={{ fontSize: 18, marginRight: 10, paddingTop: 10 }} color={theme.text02} />
          <Text style={style.txtAction}>B??nh lu???n</Text>
        </TouchableOpacity>
      </View>
      <ImageView onClose={() => setVisible(false)} images={listImageFull} imageIndex={indexImage} isVisible={visible} />
    </View>
    ))}
    </>

  );
});

const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base,
      paddingVertical: 16,
      marginBottom: 12,
    },
    paddingHorizontal20: {
      paddingHorizontal: 20,
    },
    imageAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
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
    textReaction: {
      fontSize: 14,
      color: theme.text02,
    },
    border: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: theme.text02,
      marginHorizontal: 15,
      paddingTop: 8,
    },
    txtAction: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text02,
      alignSelf: 'center',
      paddingTop: 5,
    },
    textMoreImage: {
      fontSize: 24,
      color: theme.base,
      fontWeight: 'bold',
    },
  });
