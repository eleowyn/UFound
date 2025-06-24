import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BackIcon} from '../../assets';
import {Bigcard} from '../../components';

const ItemDetails = () => {
  return (
    <View>
      <View style={styles.header}>
        <View>
          <TouchableOpacity>
            <BackIcon style={styles.button} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Items Details</Text>
      </View>
      <Bigcard />
    </View>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    margin: 30,
  },
  text: {
    marginLeft: 50,
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
  },
});
