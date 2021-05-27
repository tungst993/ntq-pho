import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import NativeImage from '../../components/shared/NativeImage';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { AppRoutes } from '../../navigator/app-routes';

const Home = React.memo(() => {
  const { navigate } = useNavigation();

  const user = useCurrentUser();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.viewWrapper, ...styles.row, ...styles.spaceBetween, paddingTop: 60 }}>
        <NativeImage uri={user?.avatar || ''} style={styles.avatarImage} />
        <TouchableOpacity style={styles.input} onPress={() => navigate(AppRoutes.CREATE_POST)}>
          <Text style={{ color: 'gray' }}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  viewWrapper: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    width: responsiveWidth(80),
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  modalWrapper: {
    height: responsiveHeight(100) - 100,
    backgroundColor: 'red',
    // marginTop: responsiveHeight(50),
  },
});

export default Home;
