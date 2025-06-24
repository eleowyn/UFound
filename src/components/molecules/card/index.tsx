import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Foundlabel from '../../atoms/statuslabel/foundlabel';
import NoPhoto from '../../../assets/NoPhoto.jpg';

const Card = ({title = 'Lost Item', location = 'Unklab'}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={NoPhoto} style={styles.pic} />
      </View>
      <View style={styles.description}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>SVG</Text>
            <Text style={styles.subtitleText}>{location}</Text>
          </View>
        </View>
        <Foundlabel width={47} height={14} fontSize={7} />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: 182,
    width: 136,
    borderWidth: 1,
    borderRadius: 11,
    borderColor: '#808080',
    alignItems: 'center',
    padding: 1,
  },
  description: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  pic: {
    height: 134,
    width: 134,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  title: {
    fontSize: 11,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subtitleText: {
    fontSize: 7,
    fontFamily: 'Poppins-SemiBold',
  },
});
