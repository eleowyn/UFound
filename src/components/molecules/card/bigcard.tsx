import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Foundlabel, Lostlabel} from '../../../components';

interface BigcardProps {
  title?: string;
  createdby?: string;
  date?: string;
  createdAt?: string;
  location?: string;
  contact?: string;
  description?: string;
  imageBase64?: string;
  status?: 'Found' | 'Lost';
}

const Bigcard: React.FC<BigcardProps> = ({
  title = 'Lost Item',
  createdby = 'Created By',
  date = 'Date',
  createdAt = 'Unknown',
  location = 'Location',
  contact = 'Contact',
  description = 'Description',
  imageBase64,
  status = 'Found',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={imageBase64 ? {uri: imageBase64} : require('../../../assets/NoPhoto.jpg')} 
          style={styles.photo}
        />
        <View style={styles.detail}>
          <View style={styles.top}>
            <Text style={styles.title}>{title}</Text>
            {status === 'Found' ? <Foundlabel /> : <Lostlabel />}
          </View>
          
          <View style={styles.detailsContainer}>
            {/* Created By Box */}
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Created By</Text>
              <Text style={styles.detailValue}>{createdby}</Text>
            </View>

            {/* Date Box */}
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{date}</Text>
            </View>

            {/* Created At Box */}
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Created At</Text>
              <Text style={styles.detailValue}>{createdAt}</Text>
            </View>

            {/* Location Box */}
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{location}</Text>
            </View>

            {/* Contact Box */}
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Contact</Text>
              <Text style={styles.detailValue}>{contact}</Text>
            </View>

            {/* Description Box */}
            <View style={[styles.detailBox, styles.descriptionBox]}>
              <Text style={styles.detailLabel}>Description</Text>
              <Text style={[styles.detailValue, styles.descriptionText]}>{description}</Text>
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
    minHeight: 670,
    width: 355,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detail: {
    width: 351,
    marginTop: 20,
    paddingBottom: 20,
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
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
  },
  detailsContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  detailBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  descriptionBox: {
    minHeight: 80,
  },
  detailLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#6C757D',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
  },
});
