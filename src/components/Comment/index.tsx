/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import NativeImage from '../shared/NativeImage';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { numberReaction } from '../../utils/constants';
import { IconSizes } from '../../theme/Icon';
import { MaterialColors } from '../../theme';
interface CommentProps {
	onReply: () => void;
	infoUser: (data: any) => void;

	isChild?: boolean
}
export const Comment = ({ onReply, infoUser, isChild = false }: CommentProps) => {
	const theme = useRecoilValue(themeState);
	const style = styles(theme);
	const [likeComment, setLikeComment] = useState(false);
	const [borderRadius, setBorderRadius] = useState(16);
	const swipeableRef = useRef<any>(null);
	const renderLeftActions = () => {
		return (
			<View style={{ justifyContent: 'center', paddingHorizontal: 20 }} >
				<Text style={{ color: theme.text01 }}>Trả lời</Text>
			</View>
		);
	};
	const renderRightAcions = () => {
		return (
			<View style={[style.row]}>
				<TouchableOpacity style={style.btnEdit}>
					<MaterialIcons name="edit" size={IconSizes.x5} color={theme.text01} />
				</TouchableOpacity>
				<TouchableOpacity style={style.btnDetele}>
					<MaterialCommunityIcons name="delete" size={IconSizes.x5} color={theme.text01} />
				</TouchableOpacity>

			</View>
		);
	};
	return (
		<View style={{ paddingLeft: isChild ? 50 : 0 }} onLayout={(event) => console.log(event.nativeEvent.layout)}>
			<View style={[style.row, style.viewComment]}>
				<NativeImage uri={'https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg'} style={isChild ? style.avatarReply : style.avatar} />
				<View style={{ flex: 1 }}>
					<Swipeable ref={swipeableRef}
						onSwipeableWillOpen={() => setBorderRadius(0)}
						onSwipeableWillClose={() => setBorderRadius(16)}
						renderRightActions={false ? () => { return null; } : renderRightAcions}
						renderLeftActions={renderLeftActions}
						onSwipeableLeftWillOpen={() => {
							onReply();
							setTimeout(() => {
								swipeableRef?.current?.close();
							}, 200);
							infoUser('toannguyen');
						}}
					>
						<View style={[style.viewContentComment, { borderRadius: borderRadius }]} >
							<Text style={style.textUserName}>Username</Text>
							<Text style={style.txtComment}>comment</Text>
						</View>
					</Swipeable>

					<View style={[style.row, { justifyContent: 'space-between' }]}>
						<View style={[style.row, { paddingHorizontal: 10 }]}>
							<Text style={style.textTime}>{moment().fromNow()}</Text>
							<TouchableOpacity onPress={() => setLikeComment(!likeComment)} style={style.paddingHorizontal20}>
								<Text style={[style.textTime, { color: likeComment ? '#5890ff' : theme.text02, fontWeight: '600' }]}>Thích</Text>
							</TouchableOpacity>
						</View>
						<View style={style.row}>
							<Text style={[style.textReaction]}>{numberReaction(100)}</Text>
							<LinearGradient
								colors={['#35a3fa', '#2e6ee3']}
								style={{
									padding: 4,
									// width: 16,
									// height: 16,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 32,
									marginLeft: 5,
								}}>
								<AntDesign name="like1" style={{ fontSize: 7 }} color={theme.white} />
							</LinearGradient>
						</View>
					</View>
				</View>
			</View>
			{
				!isChild && <CommentChildList onReply={onReply} infoUser={() => infoUser('ahsjdash')} />
			}
		</View>
	);
};

const CommentChildList = ({ onReply, infoUser }: any) => {
	const theme = useRecoilValue(themeState);
	const style = styles(theme);
	return (
		<FlatList
			scrollEnabled={false}
			data={[1, 2, 3, 4]}
			renderItem={({ item, index }) => {
				return (
					<Comment isChild onReply={() => { onReply(); }} infoUser={(value) => { infoUser(value); }} />
				);
			}}
			keyExtractor={index => index.toString()}
			contentContainerStyle={[style.paddingHorizontal20, { marginBottom: 10 }]}
		/>
	);
};

const styles = (theme = {} as ThemeColors) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		viewComment: {
			marginTop: 12,
			alignItems: 'flex-start'
		},
		viewContentComment: {
			backgroundColor: theme.comment,
			padding: 10,
			borderRadius: 16,
			flex: 1
		},
		txtComment: {
			fontSize: 14,
			color: theme.text01,
			marginTop: 5
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
		avatarReply: {
			width: 30,
			height: 30,
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
		textReaction: {
			fontSize: 12,
			color: theme.text02,
		},
		viewRightAction: {
		},
		btnDetele: {
			backgroundColor: MaterialColors.red[700],
			paddingHorizontal: 20,
			justifyContent: 'center',
			height: '100%'
		},
		btnEdit: {
			backgroundColor: MaterialColors.green[700],
			paddingHorizontal: 20,
			justifyContent: 'center',
			height: '100%'
		},
	});
