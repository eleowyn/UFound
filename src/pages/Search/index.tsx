import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import BottomTabs from '../../components/molecules/Tabs';
import Card from '../../components/molecules/card';
import { SearchIcon, Location } from '../../assets/index';

const mostSearchedItems = [
  { id: '1', title: 'ID CARD', location: 'ID CARD' },
  { id: '2', title: 'ID CARD', location: 'ID CARD' },
  { id: '3', title: 'ID CARD', location: 'ID CARD' },
  { id: '4', title: 'ID CARD', location: 'ID CARD' },
  { id: '5', title: 'ID CARD', location: 'ID CARD' },
  { id: '6', title: 'ID CARD', location: 'ID CARD' },
  { id: '7', title: 'ID CARD', location: 'ID CARD' },
  { id: '8', title: 'ID CARD', location: 'ID CARD' },
];

const Search = () => {
  const [searchText, setSearchText] = useState('');

  const renderMostSearchedItem = ({ item }: { item: { id: string; title: string; location: string } }) => (
    <TouchableOpacity style={styles.mostSearchedItem}>
      <Text style={styles.mostSearchedText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderCard = ({ item }: { item: { id: string; title: string; location: string; status?: string } }) => (
    <View style={styles.cardContainer}>
      <Card title={item.title} location={item.location} status={item.status} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <SearchIcon width={20} height={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Items"
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Most Searched Items */}
      <View style={styles.mostSearchedContainer}>
        <Text style={styles.sectionTitle}>Most Searched Item</Text>
        <FlatList
          data={mostSearchedItems}
          renderItem={renderMostSearchedItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mostSearchedList}
          columnWrapperStyle={styles.mostSearchedRow}
        />
      </View>

      {/* Cards Grid */}
      <FlatList
        data={[
          { id: '1', title: 'Charger', location: 'GK2-108', status: 'Found' },
          { id: '2', title: 'Charger', location: 'GK2-108', status: 'Lost' },
          { id: '3', title: 'Charger', location: 'GK2-108', status: 'Found' },
          { id: '4', title: 'Charger', location: 'GK2-108', status: 'Lost' },
        ]}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.cardRow}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
      />

      <BottomTabs activeIndex={1} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4F9',
  },
  searchBarContainer: {
    padding: 16,
    backgroundColor: '#F8F4F9',
    paddingTop: 50, // Account for status bar
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#F4D7DA',
    borderRadius: 25,
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 45,
  },
  searchIcon: {
    opacity: 0.6,
  },
  searchInput: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    flex: 1,
    color: '#333',
  },
  mostSearchedContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
    color: '#333',
  },
  mostSearchedList: {
    paddingBottom: 8,
  },
  mostSearchedRow: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mostSearchedItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 0.23,
    alignItems: 'center',
  },
  mostSearchedText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#666',
    textAlign: 'center',
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Account for bottom tabs
  },
  cardRow: {
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});