import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Foundlabel = () => {
  return (
    <View style={styles.label}>
      <Text style={styles.text}>Found</Text>
    </View>
  );
};

export default Foundlabel;

const styles = StyleSheet.create({
  label: {
    width: 47,
    height: 14,
    borderRadius: 37,
    backgroundColor: '#B4FFB1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#2B6000',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 7,
  },
});
