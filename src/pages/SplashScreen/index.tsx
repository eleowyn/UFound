import {StyleSheet, View} from 'react-native';
import React from 'react';
import Pic from '../../assets/SplashScreen.svg';
import {LogoUFound} from '../../components';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LogoUFound />
      <Pic />
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
