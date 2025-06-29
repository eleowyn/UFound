import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const Checkbox = ({label, value, onValueChange}) => {
  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onValueChange(!value)}>
      <View style={styles.box}>
        {value && <View style={styles.innerBox} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 13,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBox: {
    width: 12,
    height: 12,
    backgroundColor: '#1C272F',
    borderRadius: 3,
  },
  label: {
    marginLeft: 8,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#000',
  },
});
