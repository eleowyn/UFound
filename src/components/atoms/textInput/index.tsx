import { StyleSheet, View, Text, TextInput } from 'react-native';
import React from 'react';

const textInput = ({ text, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        style={styles.input}
      />
    </View>
  );
};

export default textInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 6,
    color: '#000',
  },
  input: {
    height: 60,
    width: 348,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    backgroundColor: '#fff',
  },
});
