import {StyleSheet, Text, View, ViewStyle, TextStyle, StyleProp} from 'react-native';
import React from 'react';

interface FoundlabelProps {
  width?: number;
  height?: number;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
}

const Foundlabel: React.FC<FoundlabelProps> = ({
  width = 76,
  height = 22,
  fontSize = 13,
  style,
}) => {
  return (
    <View style={[styles.label, {width, height}, style]}>
      <Text style={[styles.text, {fontSize}]}>Found</Text>
    </View>
  );
};

export default Foundlabel;

const styles = StyleSheet.create({
  label: {
    borderRadius: 37,
    backgroundColor: '#B4FFB1',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  text: {
    color: '#2B6000',
    fontFamily: 'Poppins-SemiBold',
  } as TextStyle,
});
