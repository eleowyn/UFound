import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BottomNav from '../../components/molecules/BottomNav';
import {ArrowLeftIcon} from '../../assets/index';

const Account = () => {
  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 100}}>
        <TouchableOpacity style={styles.backIcon}>
          <ArrowLeftIcon width={24} height={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Account</Text>

        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            <TouchableOpacity onPress={onSelectImage}>
              {photoUri ? (
                <Image
                  source={{uri: photoUri}}
                  style={styles.profileCircle}
                />
              ) : (
                <View style={styles.profileCircle} />
              )}
            </TouchableOpacity>
            <View style={styles.textColumn}>
              <Text style={styles.profileName}>ellantif</Text>
              <Text style={styles.profileEmail}>
                S2123@student.unklab.ac.id
              </Text>
            </View>
          </View>
          <Text style={styles.changeText}>change</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Faculty / Major</Text>
          <Text style={styles.infoValue}>
            Fakultas Ilmu Komputer - Sistem Informasi
          </Text>

          <Text style={styles.infoLabel}>Student ID</Text>
          <Text style={styles.infoValue}>1050123456789</Text>

          <Text style={styles.infoLabel}>Phone Number</Text>
          <Text style={styles.infoValue}>08123456789</Text>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default Account;

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
  title: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 24,
    width: 101,
    height: 36,
  },
  profileSection: {
    marginBottom: 32,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D9D9D9',
  },
  textColumn: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 2,
    width: 84,
    height: 29,
  },
  profileEmail: {
    fontSize: 12,
    color: '#444',
  },
  changeText: {
    fontSize: 10,
    color: '#666',
    marginTop: 8,
    marginLeft: 22,
    width: 42,
    height: 15,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 4,
  },
});
