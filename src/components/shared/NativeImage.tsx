import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface NativeImageProps {
  uri: string;
  style: any;
  resizeMode?: FastImageProps['resizeMode'];
}

const NativeImage: React.FC<NativeImageProps> = ({ uri, style }) => {
  return <FastImage style={style} source={{ uri }} resizeMode={FastImage.resizeMode.cover} />;
};

export default NativeImage;
