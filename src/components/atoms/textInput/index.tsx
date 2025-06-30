import {StyleSheet, View, Text, TextInput as RNTextInput} from 'react-native';
import React from 'react';

interface Props {
  text: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const textInput: React.FC<Props> = ({
  text,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <RNTextInput
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
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
    width: '100%',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    backgroundColor: '#fff',
  },
});
