import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import {
  Emboss,
  Earlybird,
  FuzzyGlass,
  Tint,
  Warm,
  Cool,
  Saturate,
  Invert,
  Nightvision,
  Technicolor,
  Polaroid,
  ToBGR,
  Kodachrome,
  Browni,
  Vintage,
  Lsd,
  Protanomaly,
  Deuteranomaly,
  Tritanomaly,
  Protanopia,
  Achromatopsia,
  Achromatomaly,
  Normal,
} from 'react-native-image-filter-kit';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import useDimensions from '../hooks/useDimension';
import { FilterType } from './FilterRow/type';
export type FilteringMediaProps = {
  uri: string;
  filter?: FilterType;
  handleExtractMedia: (uri: string) => void;
  style?: StyleProp<ImageStyle>;
};

const FilteringMedia: React.FC<FilteringMediaProps> = React.memo(
  ({
    uri,
    filter,
    handleExtractMedia,
    style = { aspectRatio: 1, width: responsiveWidth(100) - 50, marginBottom: 150 },
  }) => {
    if (!filter || filter === FilterType.NONE) {
      return <Image source={{ uri }} style={style} />;
    } else {
      return (
        <>
          {filter === FilterType.Normal && (
            <Normal
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}
          {filter === FilterType.Emboss && (
            <Emboss
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Earlybird && (
            <Earlybird
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.FuzzyGlass && (
            <FuzzyGlass
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Tint && (
            <Tint
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Warm && (
            <Warm
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Cool && (
            <Cool
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Saturate && (
            <Saturate
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Invert && (
            <Invert
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Nightvision && (
            <Nightvision
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Technicolor && (
            <Technicolor
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Polaroid && (
            <Polaroid
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.ToBGR && (
            <ToBGR
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Kodachrome && (
            <Kodachrome
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Browni && (
            <Browni
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Vintage && (
            <Vintage
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Lsd && (
            <Lsd
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Protanomaly && (
            <Protanomaly
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Deuteranomaly && (
            <Deuteranomaly
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Tritanomaly && (
            <Tritanomaly
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Protanopia && (
            <Protanopia
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Achromatopsia && (
            <Achromatopsia
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}

          {filter === FilterType.Achromatomaly && (
            <Achromatomaly
              onExtractImage={({ nativeEvent }) => handleExtractMedia(nativeEvent.uri)}
              extractImageEnabled={true}
              image={<Image source={{ uri }} style={style} />}
            />
          )}
        </>
      );
    }
  },
);

export default FilteringMedia;
