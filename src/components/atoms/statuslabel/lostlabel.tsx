import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface LostlabelProps {
  width?: number;
  height?: number;
  fontSize?: number;
}

const Lostlabel: React.FC<LostlabelProps> = ({
  width = 76,
  height = 22,
  fontSize = 13,
}) => {
  return (
    <View style={[styles.label, {width, height}]}>
      <Text style={[styles.text, {fontSize}]}>Lost</Text>
    </View>
  );
};

export default Lostlabel;

const styles = StyleSheet.create({
  label: {
    borderRadius: 37,
    backgroundColor: '#FFC4C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#600003',
    fontFamily: 'Poppins-SemiBold',
  },
});
