import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../../recoil/theme/atoms';
import type { ThemeColors } from '../../../types/theme';

export const DetailPost = () => {
	const theme = useRecoilValue(themeState);
	const style = styles(theme);
	return (
		<>
			<SafeAreaView style={style.container}>
				<View style={style.header}>
					<Text>asd</Text>
				</View>
			</SafeAreaView>
		</>
	);
};
const styles = (theme = {} as ThemeColors) =>
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
			paddingHorizontal: 20,
		},
	});
