import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from '../../recoil/auth/atoms';

const Home = React.memo(() => {
  const setIsLogin = useSetRecoilState(isLoginState);
  return (
    <View style={{ marginTop: 60 }}>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => setIsLogin(false)} />
    </View>
  );
});

export default Home;
