import React from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './src/pages/Login/index';
import SignUp from './src/pages/SignUp';
import {ItemDetails} from './src/pages';

const App = () => {
  return (
    <View>
      {/* <SplashScreen />
      <SignUp /> */}
      <ItemDetails />
    </View>
  );
};

export default App;
