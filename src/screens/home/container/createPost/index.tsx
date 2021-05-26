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
import { ThemeStatic } from '../../../../theme';

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

      {/* <View style={styles.viewWrapper}>
        <NativeImage uri={user?.avatar || ''} style={styles.avatarImage} />
        <Text style={styles.text}>{user?.fullName}</Text>
        <Text style={styles.text}>
          {user?.department}-{user?.position}
        </Text>
      </View> */}

      <View style={{ ...styles.viewWrapper, position: 'relative' }}>
        <View style={{ position: 'absolute', top: -30 }}>
          <View style={{ width: responsiveWidth(100) }}>
            <View style={{ ...styles.input, ...styles.shadow }}>
              <TextInput style={{}} placeholder="Bạn đang nghĩ gì?" />
            </View>
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
    paddingVertical: 60,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {},
  spaceBetween: {
    justifyContent: 'space-between',
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  viewWrapper: {
    backgroundColor: 'red',
  },
  input: {
    height: responsiveHeight(30),
    marginHorizontal: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: 'gray',
    backgroundColor: 'white',
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
});

export default CreatePost;
