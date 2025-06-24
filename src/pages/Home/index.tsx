import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {BrowseIcon} from '../../assets'; // pastikan sudah diekspor dari index.tsx

const Home = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>👤</Text>
      </View>

      <Text style={styles.title}>Hi, Tifanie!</Text>
      <Text style={styles.subtitle}>
        Don't panic! your stuff might already be here.
      </Text>

      <View style={styles.line} />

      <View style={styles.cardsContainer}>
        <TouchableOpacity style={[styles.card, styles.purple]}>
          <BrowseIcon width={40} height={40} style={styles.svgIcon} />
          <Text style={styles.cardText}>Browse Items</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.blue]}>
          <Text style={styles.cardIcon}>📄</Text>
          <Text style={styles.cardText}>Report an Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconWrapper: {
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 13,
    color: '#6D6D6D',
    textAlign: 'right',
    marginTop: 4,
  },
  line: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 24,
    marginHorizontal: 40,
  },
  cardsContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  card: {
    width: 203,
    height: 206,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 37,
    marginBottom: 24,
  },
  purple: {
    backgroundColor: '#D1B2FF',
  },
  blue: {
    backgroundColor: '#ADD8FF',
  },
  cardIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  svgIcon: {
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
