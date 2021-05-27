import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface NativeImageProps {
  uri: string;
  style: any;
  resizeMode?: FastImageProps['resizeMode'];
}

const NativeImage: React.FC<NativeImageProps> = ({ uri, style, resizeMode = FastImage.resizeMode.stretch }) => {
  return <FastImage style={style} source={{ uri }} resizeMode={resizeMode} />;
};

export default NativeImage;
