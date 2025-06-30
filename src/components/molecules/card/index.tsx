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
}

const Card: React.FC<CardProps> = ({
  title = 'Charger',
  location = 'GK2-108',
  status = 'Found',
  image,
  date = 'Oct 2, 2018',
  onPress,
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
      <View style={styles.container}>
        <Image
          source={image ? {uri: image} : require('../../../assets/NoPhoto.jpg')}
          style={styles.pic}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationContainer}>
            <Location width={12} height={12} fill="#666" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusContainer,
            {backgroundColor: status === 'Found' ? '#B4FFB1' : '#FFC4C5'},
          ]}>
          <Text
            style={[
              styles.statusText,
              {color: status === 'Found' ? '#2B6000' : '#600003'},
            ]}>
            {status}
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
});
