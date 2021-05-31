import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';
import NativeImage from './NativeImage';

interface ListImageDisplayProps {
  dataImage?: Array<string>;
  isClickImage?: boolean;
}

const data = [
  'https://uploads-ssl.webflow.com/5f5f2b58b1af780151375838/606916bf1e21c70142eb887a_GaiHot2k__anh-gai-xinh-de-thuong-viet-nam%252B%2525282%252529.jpeg',
  'https://anhgaixinh.top/wp-content/uploads/2021/01/top-10-gai-xinh-viet-nam-tren-mang-nam-2021-cuc-pham-mi-nhan-thien-ha-0.jpg',
  'http://diembaoaz.com/wp-content/uploads/2018/11/anh-girl-xinh-9-1.jpg',
  'https://stpeterline.com/documents/814359/0/gai-xinh-1.jpg/b71f793b-ef66-4f68-b736-99ece5211644?t=1615518347250',
  'https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg',
];

const ListImageDisplay = React.memo<ListImageDisplayProps>(({ dataImage = data, isClickImage = true }) => {
  const theme = useRecoilValue(themeState);
  const style = styles(theme);
  console.log('data', data);

  const ImageArea = () => {
    if (dataImage.length === 1) {
      return (
        <TouchableOpacity activeOpacity={isClickImage ? 0 : 1}>
          <NativeImage uri={dataImage[0]} style={style.image1} />
        </TouchableOpacity>
      );
    } else if (dataImage.length === 2) {
      return (
        <>
          <View style={style.rowHorizontal}>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1}>
              <NativeImage uri={dataImage[0]} style={style.image2} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1}>
              <NativeImage uri={dataImage[1]} style={style.image2} />
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (dataImage.length === 3) {
      return (
        <View style={style.rowHorizontal}>
          <TouchableOpacity activeOpacity={isClickImage ? 0 : 1}>
            <NativeImage uri={dataImage[0]} style={style.image2} />
          </TouchableOpacity>
          <View style={style.column}>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1} style={style.viewImage3}>
              <NativeImage uri={dataImage[1]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1} style={style.viewImage3}>
              <NativeImage uri={dataImage[2]} style={style.image3} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (dataImage.length === 4) {
      return (
        <View style={style.rowHorizontal}>
          <View style={style.column}>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1} style={style.viewImage3}>
              <NativeImage uri={dataImage[0]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1} style={style.viewImage3}>
              <NativeImage uri={dataImage[1]} style={style.image3} />
            </TouchableOpacity>
          </View>
          <View style={style.column}>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1} style={style.viewImage3}>
              <NativeImage uri={dataImage[2]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1} style={style.viewImage3}>
              <NativeImage uri={dataImage[3]} style={style.image3} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (dataImage.length > 4) {
      return (
        <View style={style.rowHorizontal}>
          <View style={style.column}>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1} style={style.viewImage3}>
              <NativeImage uri={dataImage[0]} style={[style.image3]} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1} style={style.viewImage3}>
              <NativeImage uri={dataImage[1]} style={style.image3} />
            </TouchableOpacity>
          </View>
          <View style={style.column}>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1} style={style.viewImage3}>
              <NativeImage uri={dataImage[2]} style={style.image3} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={isClickImage ? 0 : 1} style={style.viewImage3}>
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
  return <React.Fragment>{ImageArea()}</React.Fragment>;
});

const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base,
      paddingVertical: 16,
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
      fontWeight: 'bold',
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
      height: 290 / 2 - 2,
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

export default ListImageDisplay;
