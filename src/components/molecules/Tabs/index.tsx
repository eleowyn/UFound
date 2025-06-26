import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  ActivityIcon,
  AddIcon,
  HomeIcon,
  SearchIcon,
  ProfileIcon,
} from '../../../assets/index';

interface BottomTabsProps {
  onTabPress?: (index: number) => void;
  activeIndex?: number;
  navigation?: {
    navigate: (screen: string) => void;
  };
}

const tabs = [
  {label: 'Home', icon: HomeIcon, size: 26},
  {label: 'Search', icon: SearchIcon, size: 33},
  {label: 'Add', icon: AddIcon, size: 33},
  {label: 'Activity', icon: ActivityIcon, size: 25},
  {label: 'Account', icon: ProfileIcon, size: 45},
];

const BottomTabs: React.FC<BottomTabsProps> = ({
  onTabPress = () => {},
  activeIndex = 0,
  navigation,
}) => {
  const handleTabPress = (index: number) => {
    switch (index) {
      case 0:
        navigation?.navigate('Dashboard');
        break;
      case 1:
        navigation?.navigate('Search');
        break;
      case 2:
        navigation?.navigate('AddItems');
        break;
      case 3:
        navigation?.navigate('Activity');
        break;
      case 4:
        navigation?.navigate('Account');
        break;
      default:
        break;
    }
    onTabPress(index);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = index === activeIndex;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.tab, index === 2 && styles.middleTab]}
            onPress={() => handleTabPress(index)}>
            <View style={styles.iconWrapper}>
              <Icon
                width={tab.size}
                height={tab.size}
                fill={isActive ? '#000' : '#666'}
                color={isActive ? '#000' : '#666'}
              />
            </View>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  iconWrapper: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 10,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  activeLabel: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
});
