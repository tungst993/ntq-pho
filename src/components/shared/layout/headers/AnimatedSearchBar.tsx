import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import posed from 'react-native-pose';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../../../recoil/theme/atoms';
import { Typography } from '../../../../theme';
import type { ThemeColors } from '../../../../types/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconSizes } from '../../../../theme/Icon';

const { FontWeights, FontSizes } = Typography;

interface AnimatedSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: any;
  onBlur?: any;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  rightIcon?: any;

  open?: boolean;
}

const TransitionInput = posed(TextInput)({
  focused: { width: '82%' },
  notFocused: { width: '90%' },
});

const TransitionTouchableOpacity = posed(TouchableOpacity)({
  focused: { width: 40 },
  notFocused: { width: 0 },
});
const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({
  value,
  onChangeText,
  onFocus,
  onBlur,
  placeholder,
  style,
  rightIcon,
  open = false,
}) => {
  const theme = useRecoilValue(themeState);

  const [focused, setFocused] = useState(false);

  const inputRef = useRef(null);

  const onOpen = () => {
    setFocused(true);
    onFocus && onFocus();
  };

  const onCancel = () => {
    setFocused(false);
    // Keyboard.dismiss();
    onChangeText('');
    onBlur && onBlur();
  };

  const pose = focused ? 'focused' : 'notFocused';

  useEffect(() => {
    if (open) {
      inputRef?.current?.focus();
    }
  }, [open, inputRef]);

  return (
    <View style={styles().container}>
      <TextInput
        onChangeText={(text: string) => {
          onChangeText(text);
          if (text.length) {
            onOpen();
          } else {
            onCancel();
          }
        }}
        ref={inputRef}
        style={{ width: 0, height: 0 }}
      />
      <TransitionInput
        pose={pose}
        // onFocus={onOpen}
        style={[styles(theme).animatedSearchBar, style]}
        value={value}
        placeholder={placeholder}
        multiline
        placeholderTextColor={theme.text02}
        onChangeText={(text: string) => {
          onChangeText(text);
          if (text.length) {
            onOpen();
          } else {
            onCancel();
          }
        }}
      />

      <TransitionTouchableOpacity pose={pose} activeOpacity={0.9} onPress={onCancel} style={[styles().cancel]}>
        {rightIcon ? rightIcon : <Ionicons name="ios-send" color={theme.accent} size={IconSizes.x5} />}
      </TransitionTouchableOpacity>
    </View>
  );
};

const styles = (theme = {} as ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 5,
    },
    animatedSearchBar: {
      ...FontWeights.Light,
      ...FontSizes.Body,
      marginLeft: 20,
      paddingVertical: Platform.select({ ios: 10, android: 5 }),
      paddingHorizontal: 20,
      backgroundColor: theme.placeholder,
      color: theme.text01,
      borderRadius: 20,
      marginVertical: 5,
    },
    cancel: {
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelText: {
      height: 20,
      ...FontWeights.Light,
      ...FontSizes.Body,
      color: theme.text01,
    },
  });

export default AnimatedSearchBar;
