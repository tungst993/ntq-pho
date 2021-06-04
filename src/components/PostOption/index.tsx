/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';
import NativeImage from '../shared/NativeImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { IconSizes } from '../../theme/Icon';
interface PostOptionProps { }
export const PostOption = (props: PostOptionProps) => {
	const theme = useRecoilValue(themeState);
	const style = styles(theme);
	const [choose, setChoose] = useState(false);
	return (
		<View style={[style.row, { marginTop: 12 }]}>
			<TouchableOpacity onPress={() => setChoose(!choose)} activeOpacity={0.8}>
				{choose ? <View style={style.circle} />
					:
					<AntDesign name={'checkcircle'} color={theme.accent} size={IconSizes.x5} style={{ marginRight: 10 }} />
				}
			</TouchableOpacity>

			<View style={{ flex: 1 }}>
				<View style={style.content}>
					<Text style={{ color: theme.text02 }}>123</Text>
				</View>
			</View>
			<TouchableOpacity>
				<AntDesign name={'close'} color={theme.text02} size={IconSizes.x5} style={{ marginLeft: 10 }} />
			</TouchableOpacity>

			{/* <NativeImage uri={'https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg'} style={style.avatar} /> */}
		</View>
	);
};
const styles = (theme = {} as ThemeColors) =>
	StyleSheet.create({
		row: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		avatar: {
			width: 20,
			height: 20,
			borderRadius: 20,
		},
		circle: {
			borderWidth: StyleSheet.hairlineWidth,
			borderColor: theme.text02,
			width: 20,
			height: 20,
			borderRadius: 15,
			marginRight: 10
		},
		content: {
			borderWidth: StyleSheet.hairlineWidth,
			borderColor: theme.text02,
			borderRadius: 4,
			padding: 5,
			flex: 1
		}
	});
