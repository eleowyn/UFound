import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({title = 'Title', subTitle = 'Subtitle'}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subTitle}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#808080',
  },
});
