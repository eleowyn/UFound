import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {
  HomeIcon,
  SearchIcon,
  AddIcon,
  ActivityIcon,
  MoreIcon,
} from '../../../assets/index';

const BottomNav = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <HomeIcon width={22} height={22} />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <SearchIcon width={27} height={27} />
        <Text style={styles.label}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <AddIcon width={27} height={27} />
        <Text style={styles.label}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <ActivityIcon width={22} height={22} />
        <Text style={styles.label}>Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <MoreIcon width={27} height={27} />
        <Text style={styles.label}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(0, 0, 0, 0.13)',
    borderRadius: 17,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 85,
    marginHorizontal: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
    color: '#000',
  },
});
