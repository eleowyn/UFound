import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  textInput as Textinput,
  Button,
  Header,
  Card,
} from './src/components/index';

const UFound = () => {
  return (
    <View style={styles.container}>
      <Card />
      <Header />
      <Textinput placeholder={'Testing'} width={313} height={40} />
      <Button
        bgColor={'#1C272F'}
        textColor={'#FFFFFF'}
        text={'Button Text'}
        width={313}
        height={40}
        alignItems="center"
      />
      <View>
        <Text>U</Text>
        <Text></Text>
      </View>
    </View>
  );
};

export default UFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
