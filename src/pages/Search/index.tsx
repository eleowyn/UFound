import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {getDatabase, ref, onValue} from 'firebase/database';
import app from '../../config/Firebase';
import {BrowseIcon} from '../../assets/index';
import {BottomTabs, Card} from '../../components/index';

interface ItemData {
  id: string;
  itemName: string;
  location: string;
  postType: 'Found' | 'Lost';
  date: string;
  imageBase64?: string;
  description: string;
  contact: string;
  createdBy: string;
  createdAt: number;
  completed?: boolean;
}

const mostSearchedItems = [
  {id: '1', title: 'ID CARD'},
  {id: '2', title: 'WALLET'},
  {id: '3', title: 'PHONE'},
  {id: '4', title: 'KEYS'},
  {id: '5', title: 'LAPTOP'},
  {id: '6', title: 'CHARGER'},
  {id: '7', title: 'BOOK'},
  {id: '8', title: 'BAG'},
];

const Search = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [searchText, setSearchText] = useState('');
  const [allItems, setAllItems] = useState<ItemData[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const itemsRef = ref(db, 'items');

    const unsubscribe = onValue(itemsRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const itemsArray: ItemData[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        // Sort by creation time (newest first)
        itemsArray.sort((a, b) => b.createdAt - a.createdAt);
        setAllItems(itemsArray);
        setFilteredItems(itemsArray);
      } else {
        setAllItems([]);
        setFilteredItems([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredItems(allItems);
    } else {
      const filtered = allItems.filter(item =>
        item.itemName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchText, allItems]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleMostSearchedPress = (searchTerm: string) => {
    setSearchText(searchTerm);
  };

  const renderMostSearchedItem = ({
    item,
  }: {
    item: {id: string; title: string};
  }) => (
    <TouchableOpacity 
      style={styles.mostSearchedItem}
      onPress={() => handleMostSearchedPress(item.title)}
    >
      <Text style={styles.mostSearchedText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderCard = ({item}: {item: ItemData}) => (
    <View style={styles.cardContainer}>
      <Card 
        title={item.itemName} 
        location={item.location} 
        status={item.postType}
        date={formatDate(item.date)}
        image={item.imageBase64}
        completed={item.completed}
        onPress={() => navigation.navigate('ItemDetails', { item })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <BrowseIcon width={20} height={20} style={styles.BrowseIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Items"
            placeholderTextColor="black"
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
          keyExtractor={item => item.id}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mostSearchedList}
          columnWrapperStyle={styles.mostSearchedRow}
        />
      </View>

      {/* Search Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>
          {searchText ? `Search Results (${filteredItems.length})` : `All Items (${filteredItems.length})`}
        </Text>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Loading items...</Text>
          </View>
        ) : filteredItems.length > 0 ? (
          <FlatList
            data={filteredItems}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.cardRow}
            contentContainerStyle={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchText ? 'No items found matching your search' : 'No items available'}
            </Text>
            <Text style={styles.emptySubText}>
              {searchText ? 'Try searching with different keywords' : 'Items will appear here when added'}
            </Text>
          </View>
        )}
      </View>

      {/* Bottom Tabs */}
      <BottomTabs navigation={navigation} activeIndex={1} />
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
    backgroundColor: '#FFDEDE',
    borderRadius: 25,
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 50,
  },
  BrowseIcon: {
    opacity: 1,
  },
  searchInput: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    flex: 1,
    color: 'black',
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
  resultsContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
  },
  cardsContainer: {
    paddingBottom: 100, // Account for bottom tabs
  },
  cardRow: {
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
});
