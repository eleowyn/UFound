import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Lostlabel = ({width = 76, height = 22, fontSize = 13}) => {
  return (
    <View style={styles.label(width, height)}>
      <Text style={styles.text(fontSize)}>Found</Text>
    </View>
  );
};

export default Lostlabel;

const styles = StyleSheet.create({
  label: (width, height) => ({
    width: width,
    height: height,
    borderRadius: 37,
    backgroundColor: '#FFC4C5',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  text: fontSize => ({
    color: '#600003',
    fontFamily: 'Poppins-SemiBold',
    fontSize: fontSize,
  }),
});
