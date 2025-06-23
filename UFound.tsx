import {View, StyleSheet} from 'react-native';
import React from 'react';
import {textInput as Input, button as Button} from './src/components/index';

const UFound = () => {
  return (
    <View style={styles.container}>
      {/* cannot use textInput react native has it in library */}
      <Input placeholder={'Testing'} width={313} height={40} />
      <Button
        bgColor={'#1C272F'}
        textColor={'#FFFFFF'}
        text={'Button Text'}
        width={313}
        height={40}
        alignItems="center"
      />
    </View>
  );
};

export default UFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
