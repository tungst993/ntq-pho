/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';
import NativeImage from '../shared/NativeImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { IconSizes } from '../../theme/Icon';
import { longPressDeleteNotification } from '../../helpers/notifications';
interface PostOptionProps { }
export const PostOption = (props: PostOptionProps) => {
	const theme = useRecoilValue(themeState);
	const [theme1, setTheme] = useRecoilState(themeState);
	const style = styles(theme);
	const [choose, setChoose] = useState(false);
	return (
		<>
			<View style={[style.row, { marginTop: 12, }]}>
				<TouchableOpacity onPress={() => setChoose(!choose)} activeOpacity={0.8}>
					{choose ?
						<AntDesign name={'checkcircle'} color={theme.accent} size={IconSizes.x5} style={{ marginRight: 10 }} />
						:
						<View style={style.circle} />
					}
				</TouchableOpacity>

				<View style={{ flex: 1 }}>
					<View style={[style.content, { backgroundColor: choose ? '#203246' : theme.base }]}>
						<Text style={{ color: theme.text01 }}>123</Text>
						{choose && <Text style={{ color: theme.text02, fontSize: 10 }}>Được bạn thêm vào</Text>}
					</View>

				</View>
				<TouchableOpacity onPress={() => longPressDeleteNotification(() => { Alert.alert('aa'); })}>
					<AntDesign name={'close'} color={theme.text02} size={IconSizes.x5} style={{ marginLeft: 10 }} />
				</TouchableOpacity>
			</View>
			{choose &&
				<View style={[style.row, { marginTop: 4, marginLeft: 40 }]}>
					<View style={{ marginRight: 10, ...style.row }}>
						<NativeImage uri={'https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg'} style={[style.avatar, { zIndex: 9 }]} />
						<NativeImage uri={'https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg'} style={[style.avatar, { zIndex: 8 }]} />
						<NativeImage uri={'https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg'} style={[style.avatar, { zIndex: 7 }]} />
					</View>
					<Text style={{ color: theme.text02, fontSize: 10 }}>3 luợt bình luận</Text>
				</View>
			}
		</>
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
			marginLeft: -7,
			borderWidth: StyleSheet.hairlineWidth,
			borderColor: theme.text02
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
			flex: 1,
		}
	});
