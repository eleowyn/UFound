import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Pic from '../../assets/SplashScreen.svg';
import { Gap } from '../../components';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Pic/>
      <Text style={styles.text}>U-Found</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    fontFamily: 'Poppins-SemiBold',
  },
});