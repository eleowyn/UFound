import React from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './src/pages/Login/index';
import SignUp from './src/pages/SignUp';
import Dashboard from './src/pages/Dashboard';
import AddItems from './src/pages/AddItems';
import Activity from './src/pages/Activity';
import {ItemDetails} from './src/pages';

const App = () => {
  return (
    // <SplashScreen/>
    // <SignUp />
    // <AddItems />
    <ItemDetails />
  );
};

export default App;
