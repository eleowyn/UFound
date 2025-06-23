import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';

const textInput = ({placeholder = 'Placeholder', width = 313, height = 40}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput(width, height)}></TextInput>
    </View>
  );
};

export default textInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textInput: (width, height) => ({
    width: width,
    height: height,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#808080',
    margin: 23,
    fontSize: 9,
  }),
});
