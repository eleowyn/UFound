import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import NoPhoto from '../../../assets/NoPhoto.jpg';
import {Foundlabel, Lostlabel} from '../../../components';

const Bigcard = ({
  title = 'Lost Item',
  createdby = 'Created By',
  date = 'Date',
  location = 'Location',
  contact = 'Contact',
  description = 'Description',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={NoPhoto} style={styles.photo} />
        <View style={styles.detail}>
          <View style={styles.top}>
            <Text style={styles.title}>{title}</Text>
            <Foundlabel />
          </View>
          <View style={styles.bottom}>
            <View style={styles.bottomright}>
              <Text style={styles.subtitle}>Created By:</Text>
              <Text style={styles.subtitle}>Date:</Text>
              <Text style={styles.subtitle}>Location:</Text>
              <Text style={styles.subtitle}>Contact:</Text>
              <Text style={styles.subtitle}>Description:</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>{createdby}</Text>
              <Text style={styles.subtitle}>{date}</Text>
              <Text style={styles.subtitle}>{location}</Text>
              <Text style={styles.subtitle}>{contact}</Text>
              <Text style={styles.subtitle}>{description}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Bigcard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    height: 670,
    width: 355,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  detail: {
    width: 351,
    marginTop: 40,
  },
  photo: {
    height: 236,
    width: 355,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  top: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  bottom: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  bottomright: {
    paddingRight: 50,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  subtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    paddingBottom: 20,
  },
});
