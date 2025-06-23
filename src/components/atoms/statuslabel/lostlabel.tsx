import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Lostlabel = () => {
  return (
    <View style={styles.label}>
      <Text style={styles.text}>Lost</Text>
    </View>
  );
};

export default Lostlabel;

const styles = StyleSheet.create({
  label: {
    width: 47,
    height: 14,
    borderRadius: 37,
    backgroundColor: '#FFC4C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#600003',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 7,
  },
});
