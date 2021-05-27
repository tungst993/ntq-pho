import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import NativeImage from '../../../../components/shared/NativeImage';
import { useCurrentUser } from '../../../../hooks/useCurrentUser';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { IconSizes } from '../../../../theme/Icon';
import { mainStyles } from '../../../../theme/mainStyles';
import { ThemeStatic, Typography } from '../../../../theme';

const { FontWeights, FontSizes } = Typography;

const CreatePost = React.memo(() => {
  const { goBack } = useNavigation();
  const user = useCurrentUser();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[ThemeStatic.accent, 'rgba(35, 105, 178, 0.9)', 'rgba(35, 105, 178, 0.7)']}
        style={{ ...styles.header }}>
        <AntIcons name="left" size={IconSizes.x5} color={ThemeStatic.white} />
        <Text style={styles.text}>Tạo bài viết</Text>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.text}>Đăng</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={{ ...styles.userInfoWrapper, ...mainStyles.viewWrapper }}>
        <NativeImage uri={user?.avatar || ''} style={styles.avatarImage} />
        <View style={styles.userInfo}>
          <Text style={styles.nameText}>{`${user?.fullName || ''}`}</Text>
          <View style={{ ...mainStyles.rowCenter }}>
            <AntIcons name="star" size={IconSizes.x5} color={ThemeStatic.accent} />
            <Text style={{ ...styles.nameText, marginLeft: 5 }}>{user?.position}</Text>
          </View>
        </View>
      </View>

      <View style={{ ...mainStyles.viewWrapper }}>
        <TextInput multiline numberOfLines={10} style={{ ...styles.input }} placeholder="Bạn đang nghĩ gì?" />
      </View>

      <View>
        <Text style={styles.text}>Ảnh</Text>
      </View>

      <View>
        <Text style={styles.text}>Video</Text>
      </View>

      <View>
        <Text style={styles.text}>Tạo vote</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text style={styles.text}>Đăng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {},
  spaceBetween: {
    justifyContent: 'space-between',
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  input: {
    height: 40,
    backgroundColor: 'red',
  },
  text: {
    color: ThemeStatic.white,
    fontSize: 18,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  userInfo: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginLeft: 12,
  },
  nameText: {
    ...FontSizes.Label,
    ...FontWeights.Bold,
  },
});

export default CreatePost;
