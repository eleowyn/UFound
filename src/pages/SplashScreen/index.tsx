import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Pic from '../../assets/SplashScreen.svg';
import {LogoUFound} from '../../components';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Dashboard');
    }, 3000); // 3 seconds

    return () => clearTimeout(timeout);
  }, [navigation]);

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
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});