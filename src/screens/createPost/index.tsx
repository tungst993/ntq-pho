import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, Button, SafeAreaView, StyleSheet } from 'react-native';

const CreatePost = React.memo(() => {
  const { goBack } = useNavigation();
  console.log();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => goBack()} title="Dismiss" />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

export default CreatePost;
