import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({
  bgColor = '#1C272F',
  textColor = '#FFFFFF',
  text = 'Button Text',
  width = 347,
  height = 60,
  alignItems = 'center',
  onPress,
}) => {
  return (
    <View style={styles.container(alignItems)}>
      <TouchableOpacity
        style={styles.button(bgColor, width, height)}
        onPress={onPress}>
        <Text style={styles.text(textColor)}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: alignItems => ({
    alignItems: alignItems,
  }),
  button: (bgColor, width, height) => ({
    backgroundColor: bgColor,
    width: width,
    height: height,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: textColor => ({
    color: textColor,
    fontFamily: 'Poppins-SemiBold',
  }),
});
