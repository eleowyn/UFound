import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ArrowLeftIcon} from '../../assets/index';
import Checkbox from '../../components/atoms/Checkbox';
import BottomTabs from '../../components/molecules/Tabs';

const Activity = ({navigation}) => {
  const activities = [
    {
      id: 1,
      dateTime: '11/12/25 09.30',
      location: 'GK2 – 108',
      title: 'Charger',
      status: 'Mark as done (Claimed/Founded)',
    },
    {
      id: 2,
      dateTime: '11/12/25 09.30',
      location: 'GK2 – 108',
      title: 'Charger',
      status: 'Mark as done (Claimed/Founded)',
    },
  ];

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 100}}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon width={26} height={26} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Activity</Text>
          <Text style={styles.subtitle}>Track your list of activities</Text>
        </View>

        <Text style={styles.recentTitle}>Recent activities</Text>

        {activities.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardDate}>{item.dateTime}</Text>
              <Text style={styles.cardLocation}>{item.location}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>

            <View style={styles.checkboxContainer}>
              <Checkbox checked={true} />
              <Text style={styles.checkboxLabel}>{item.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomTabs navigation={navigation} activeIndex={0} />
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  backIcon: {
    marginBottom: 16,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: '#888',
  },
  recentTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#7E7777',
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 11,
    color: '#000',
    fontWeight: '800',
  },
  cardLocation: {
    fontSize: 10,
    color: '#000',
    fontWeight: '800',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
    color: '#504D4D',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  checkboxLabel: {
    fontSize: 10,
    color: '#7E7777',
    fontWeight: '800',
  },
});
