/* eslint-disable prettier/prettier */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoil/theme/atoms';
import type { ThemeColors } from '../../types/theme';
import NativeImage from '../shared/NativeImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import ImageView from 'react-native-image-view';


interface PostProps { }
export const PostComponent = (props: PostProps) => {
	const theme = useRecoilValue(themeState);
	const style = styles(theme);
	const [like, setLike] = useState(false);
	const [visible, setVisible] = useState(false);
	const [listImageFull, setListImageFull] = useState<Array<any>>([]);
	const [indexImage, setIndexImage] = useState(0);
	let { } = props;
	const dataImage = [
		'https://uploads-ssl.webflow.com/5f5f2b58b1af780151375838/606916bf1e21c70142eb887a_GaiHot2k__anh-gai-xinh-de-thuong-viet-nam%252B%2525282%252529.jpeg',
		'https://anhgaixinh.top/wp-content/uploads/2021/01/top-10-gai-xinh-viet-nam-tren-mang-nam-2021-cuc-pham-mi-nhan-thien-ha-0.jpg',
		'http://diembaoaz.com/wp-content/uploads/2018/11/anh-girl-xinh-9-1.jpg',
		'https://stpeterline.com/documents/814359/0/gai-xinh-1.jpg/b71f793b-ef66-4f68-b736-99ece5211644?t=1615518347250',
		'https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg',
	];
	console.log(listImageFull);
	useEffect(() => {
		const arr: Array<any> = [];
		dataImage.map(i => {
			const obj = { source: { uri: i } };
			arr.push(obj);
		});
		setListImageFull(arr);
	}, []);
	const ImageArea = () => {
		if (dataImage.length === 1) {
			return (
				<TouchableOpacity onPress={() => {
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
						<TouchableOpacity onPress={() => {
							setVisible(true);
							setIndexImage(0);
						}}>
							<NativeImage uri={dataImage[0]} style={style.image2} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
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
					<TouchableOpacity onPress={() => {
						setVisible(true);
						setIndexImage(0);
					}}>
						<NativeImage uri={dataImage[0]} style={style.image2} />
					</TouchableOpacity>
					<View style={style.column}>
						<TouchableOpacity style={style.viewImage3} onPress={() => {
							setVisible(true);
							setIndexImage(1);
						}}>
							<NativeImage uri={dataImage[1]} style={style.image3} />
						</TouchableOpacity>
						<TouchableOpacity style={style.viewImage3} onPress={() => {
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
						<TouchableOpacity style={style.viewImage3} onPress={() => {
							setVisible(true);
							setIndexImage(0);
						}}>
							<NativeImage uri={dataImage[0]} style={style.image3} />
						</TouchableOpacity>
						<TouchableOpacity style={style.viewImage3} onPress={() => {
							setVisible(true);
							setIndexImage(1);
						}}>
							<NativeImage uri={dataImage[1]} style={style.image3} />
						</TouchableOpacity>
					</View>
					<View style={style.column}>
						<TouchableOpacity style={style.viewImage3} onPress={() => {
							setVisible(true);
							setIndexImage(2);
						}}>
							<NativeImage uri={dataImage[2]} style={style.image3} />
						</TouchableOpacity>
						<TouchableOpacity style={style.viewImage3} onPress={() => {
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
						<TouchableOpacity style={style.viewImage3} onPress={() => {
							setVisible(true);
							setIndexImage(0);
						}}>
							<NativeImage uri={dataImage[0]} style={[style.image3]} />
						</TouchableOpacity>
						<TouchableOpacity style={style.viewImage3} onPress={() => {
							setVisible(true);
							setIndexImage(1);
						}}>
							<NativeImage uri={dataImage[1]} style={style.image3} />
						</TouchableOpacity>
					</View>
					<View style={style.column}>
						<TouchableOpacity style={style.viewImage3} onPress={() => {
							setVisible(true);
							setIndexImage(2);
						}}>
							<NativeImage uri={dataImage[2]} style={style.image3} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
							setVisible(true);
							setIndexImage(3);
						}} style={style.viewImage3}>
							<NativeImage uri={dataImage[3]} style={[style.image3]} />
							<View style={[style.image3, { position: 'absolute', backgroundColor: '#00000040', justifyContent: 'center', alignItems: 'center' }]} >
								<Text style={style.textMoreImage}>+{dataImage.length - 4}</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View >
			);
		}
	};
	const numberReaction = (reaction: number) => {
		if (reaction > 1000000) {
			return `${(reaction / 1000000).toFixed(1)}M`;
		} else if (reaction > 1000) {
			return `${(reaction / 1000).toFixed(1)}K`;
		} else {
			return `${reaction}`;
		}
	};
	return (
		<View style={style.container}>
			<View style={{ ...style.row, ...style.paddingHorizontal20 }}>
				<NativeImage
					resizeMode={'contain'}
					uri={
						'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
					}
					style={style.imageAvatar}
				/>
				<View>
					<Text style={style.textUserName}>Username</Text>
					<Text style={style.textTime}>{moment().fromNow()}</Text>
				</View>
			</View>
			<Text style={[style.textContent, style.paddingHorizontal20]}>content</Text>
			{ImageArea()}

			<View style={[style.rowHorizontal, style.paddingHorizontal20, { marginVertical: 12 }]}>
				<View style={style.row}>
					<LinearGradient
						colors={['rgba(50,120,242, 0.9)', 'rgba(50,120,242, 0.7)', 'rgba(50,120,242, 0.5)']}
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
				<Text style={style.textReaction}>{numberReaction(20)} bình luận</Text>
			</View>
			<View style={[style.rowHorizontal, style.paddingHorizontal20, style.border, { justifyContent: 'space-around' }]}>
				<TouchableOpacity
					hitSlop={{ top: 10, bottom: 10, left: 50, right: 50 }}
					onPress={() => setLike(!like)}
					style={[style.row, { alignItems: 'flex-end' }]}>
					{like ? (
						<AntDesign name="like1" style={{ fontSize: 20, marginRight: 10 }} color={theme.accent} />
					) : (
						<AntDesign name="like2" style={{ fontSize: 20, marginRight: 10 }} color={theme.text02} />
					)}

					<Text style={[style.txtAction, { color: like ? theme.accent : theme.text02 }]}>Thích</Text>
				</TouchableOpacity>
				<TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 50, right: 50 }} style={[style.row, {}]}>
					<Octicons name="comment" style={{ fontSize: 18, marginRight: 10 }} color={theme.text02} />
					<Text style={style.txtAction}>Bình luận</Text>
				</TouchableOpacity>
			</View>
			<ImageView
				onClose={() => setVisible(false)}
				images={listImageFull}
				imageIndex={indexImage}
				isVisible={visible}
			/>
		</View>
	);
};
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
		},
		textMoreImage: {
			fontSize: 24,
			color: theme.text01,
			fontWeight: 'bold'
		}
	});
