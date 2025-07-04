import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue, query, orderByChild, equalTo, update} from 'firebase/database';
import {NavigationProp} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import app from '../../config/Firebase';
import {ArrowLeftIcon} from '../../assets/index';
import {Checkbox, BottomTabs, Card} from '../../components/index';

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

interface ActivityProps {
  navigation: NavigationProp<any>;
}

const Activity: React.FC<ActivityProps> = ({navigation}) => {
  const [userPosts, setUserPosts] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedItems, setCompletedItems] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase(app);
      const itemsRef = ref(db, 'items');
      const userItemsQuery = query(itemsRef, orderByChild('createdBy'), equalTo(user.uid));

      const unsubscribe = onValue(userItemsQuery, snapshot => {
        const data = snapshot.val();
        if (data) {
          const itemsArray: ItemData[] = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          // Sort by creation time (newest first)
          itemsArray.sort((a, b) => b.createdAt - a.createdAt);
          setUserPosts(itemsArray);
          
          // Set completed items state from Firebase data
          const completedState: {[key: string]: boolean} = {};
          itemsArray.forEach(item => {
            if (item.completed) {
              completedState[item.id] = true;
            }
          });
          setCompletedItems(completedState);
        } else {
          setUserPosts([]);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
      setUserPosts([]);
    }
  }, []);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const toggleItemCompletion = async (itemId: string) => {
    try {
      const db = getDatabase(app);
      const itemRef = ref(db, `items/${itemId}`);
      const newCompletedStatus = !completedItems[itemId];
      
      // Update only the completed field in Firebase
      await update(itemRef, {
        completed: newCompletedStatus
      });

      // Update local state
      setCompletedItems(prev => ({
        ...prev,
        [itemId]: newCompletedStatus
      }));

      showMessage({
        message: newCompletedStatus ? 'Item marked as completed!' : 'Item marked as active',
        type: 'success',
      });
    } catch (error) {
      console.error('Error updating item completion status:', error);
      showMessage({
        message: 'Failed to update item status',
        type: 'danger',
      });
    }
  };

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

        <Text style={styles.recentTitle}>Your posted items ({userPosts.length})</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Loading your posts...</Text>
          </View>
        ) : userPosts.length > 0 ? (
          <>
              {userPosts.map(item => (
                <View key={item.id} style={styles.activityCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardDate}>{formatDateTime(item.date)}</Text>
                    <Text style={styles.cardLocation}>{item.location}</Text>
                  </View>
                  <Text style={styles.cardTitle}>{item.itemName}</Text>
                  <Text style={styles.cardType}>Status: {item.postType}</Text>

                  <View style={styles.checkboxContainer}>
                    <Checkbox 
                      checked={completedItems[item.id] || false}
                      onValueChange={() => toggleItemCompletion(item.id)}
                    />
                    <Text style={styles.checkboxLabel}>
                      Mark as done ({item.postType === 'Found' ? 'Claimed' : 'Found'})
                    </Text>
                  </View>
                </View>
              ))}
              
              <View style={styles.cardsSection}>
                <Text style={styles.cardsSectionTitle}>Your Items</Text>
                <View style={styles.cardsGrid}>
                  {userPosts.map(item => (
                    <Card 
                      key={`card-${item.id}`}
                      title={item.itemName} 
                      location={item.location} 
                      status={item.postType}
                      date={formatDate(item.date)}
                      image={item.imageBase64}
                      onPress={() => navigation.navigate('ItemDetails', { item })}
                    />
                  ))}
                </View>
              </View>
          </>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No posts yet</Text>
              <Text style={styles.emptySubText}>
                Items you post will appear here for tracking
              </Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('AddItems')}
              >
                <Text style={styles.addButtonText}>Add Your First Item</Text>
              </TouchableOpacity>
            </View>
          )}
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
    marginBottom: 24,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#808080',
    marginTop: -4,
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
  },
  cardDate: {
    fontSize: 11,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  cardLocation: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#7E7777',
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  activityCard: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  cardType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Poppins-Medium',
  },
  cardsSection: {
    marginTop: 24,
    padding: 16,
    borderRadius: 13,
    backgroundColor: '#FFFF',
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  cardsSectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 16,
    color: '#333',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
});
