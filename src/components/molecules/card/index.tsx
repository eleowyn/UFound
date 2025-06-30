import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Location} from '../../../assets';
import {useNavigation, NavigationProp} from '@react-navigation/native';

interface CardProps {
  title?: string;
  location?: string;
  status?: string;
  image?: string;
  date?: string;
  onPress?: () => void;
  completed?: boolean;
}

const Card: React.FC<CardProps> = ({
  title = 'Charger',
  location = 'GK2-108',
  status = 'Found',
  image,
  date = 'Oct 2, 2018',
  onPress,
  completed = false,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('ItemDetails' as never);
    }
  };
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, completed && styles.completedContainer]}>
        <Image
          source={image ? {uri: image} : require('../../../assets/NoPhoto.jpg')}
          style={[styles.pic, completed && styles.completedImage]}
        />
        {completed && (
          <View style={styles.completedOverlay}>
            <Text style={styles.completedText}>COMPLETED</Text>
          </View>
        )}
        <View style={styles.contentContainer}>
          <Text style={[styles.title, completed && styles.completedTitle]}>{title}</Text>
          <View style={styles.locationContainer}>
            <Location width={12} height={12} fill="#666" />
            <Text style={[styles.locationText, completed && styles.completedLocationText]}>{location}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={[styles.dateText, completed && styles.completedDateText]}>{date}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusContainer,
            {backgroundColor: completed ? '#E0E0E0' : (status === 'Found' ? '#B4FFB1' : '#FFC4C5')},
          ]}>
          <Text
            style={[
              styles.statusText,
              {color: completed ? '#666' : (status === 'Found' ? '#2B6000' : '#600003')},
            ]}>
            {completed ? 'Done' : status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  pic: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  dateContainer: {
    marginTop: 2,
  },
  dateText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  statusContainer: {
    width: '100%',
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  completedContainer: {
    opacity: 0.7,
  },
  completedImage: {
    opacity: 0.5,
  },
  completedOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  completedText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },
  completedTitle: {
    color: '#999',
  },
  completedLocationText: {
    color: '#999',
  },
  completedDateText: {
    color: '#999',
  },
});
