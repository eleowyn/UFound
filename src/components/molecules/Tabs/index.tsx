import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  activityIcon,
  addIcon,
  homeIcon,
  searchIcon,
  moreIcon,
} from '../../../assets/index';

const tabs = [
  {label: 'Home', icon: homeIcon},
  {label: 'Search', icon: searchIcon},
  {label: 'Add', icon: addIcon},
  {label: 'Activity', icon: activityIcon},
  {label: 'More', icon: moreIcon},
];

const BottomTabs = ({onTabPress = () => {}, activeIndex = 0}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = index === activeIndex;
        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => onTabPress(index)}>
            <Icon width={24} height={24} fill={isActive ? '#000' : '#666'} />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  activeLabel: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
});
