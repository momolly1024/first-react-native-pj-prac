import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';

function ScreenA({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Screen_B');
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen A</Text>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
        <Text style={styles.text}>Go to Screen B</Text>
      </Pressable>
      <Text style={styles.testFont}>測試文字 思源宋體!</Text>
      <Text style={GlobalStyle.ButtonText}>Get the last user</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
    fontFamily: 'Aboreto-Regular',
  },
  testFont: {
    fontFamily: 'NotoSerifTC-Medium',
    fontSize: 40,
  },
});
export default ScreenA;
