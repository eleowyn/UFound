import React from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  multiline?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({label, multiline = false, ...rest}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        multiline={multiline}
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 6,
    color: '#000',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    backgroundColor: '#fff',
    color: '#000',
  },
  multiline: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
});
