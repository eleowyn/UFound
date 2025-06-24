import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Foundlabel from '../../atoms/statuslabel/foundlabel';
import { Location } from '../../../assets/index';

const Card = ({title = 'Lost Item', location = 'Unklab', status = 'Found'}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../assets/NoPhoto.jpg')}
          style={styles.pic}
        />
      </View>
      <View style={styles.description}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.subtitle}>
            <Location width={13} height={15} fill="#666" />
            <Text style={styles.subtitleText}>{location}</Text>
          </View>
        </View>
        <Foundlabel status={status} />
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
    borderColor: '#E0E0E0',
    alignItems: 'center',
    padding: 1,
    backgroundColor: '#fff',
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  textContainer: {
    flex: 1,
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
    color: '#333',
    marginBottom: 2,
  },
  subtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtitleText: {
    fontSize: 7,
    fontFamily: 'Poppins-SemiBold',
    color: '#666',
  },
});