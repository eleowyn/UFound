import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Card from '../../components/molecules/card';
import BottomNav from '../../components/molecules/BottomNav';
import {AddItemsIcon, BrowseIcon, NotificationIcon} from '../../assets/index';

const Dashboard = () => {
  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 100}}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hey, Elshera</Text>
            <Text style={styles.subText}>
              Find your items and help people find it too!
            </Text>
          </View>
          <TouchableOpacity>
            <NotificationIcon width={29} height={29} />
          </TouchableOpacity>
        </View>

        {/* Tombol Browse dan Add */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.circleButton, styles.browseBg]}>
            <BrowseIcon width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circleButton, styles.addBg]}>
            <AddItemsIcon width={40} height={40} />
          </TouchableOpacity>
        </View>

        {/* Label Tombol */}
        <View style={styles.buttonLabelRow}>
          <Text style={styles.label}>Browse Items</Text>
          <Text style={styles.label}>Add Items</Text>
        </View>

        {/* Kartu */}
        <View style={styles.cardContainer}>
          <View style={styles.cardGrid}>
            <Card title="Charger" location="GKC-103" />
            <Card title="Umbrella" location="Library" />
            <Card title="Notebook" location="DORM 2" />
            <Card title="Pencil Case" location="Canteen" />
            <Card title="Wallet" location="GKC-108" />
            <Card title="Bottle" location="Sports Hall" />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
};

export default Dashboard;

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
    paddingBottom: 100,
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subText: {
    fontSize: 11,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  browseBg: {
    backgroundColor: '#FCF4CB',
    width: 52,
    height: 52,
  },
  addBg: {
    backgroundColor: '#FFDEDE',
    width: 52,
    height: 52,
  },
  buttonLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardContainer: {
    marginTop: 32,
    padding: 16,
    borderRadius: 13,
    backgroundColor: '#FFFF',
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  cardSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
});
