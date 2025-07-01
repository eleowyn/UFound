import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BackIcon} from '../../assets';
import {Bigcard, BottomTabs} from '../../components';
import {getDatabase, ref, onValue} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import app from '../../config/Firebase';

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
}

interface ItemDetailsProps {
  navigation: any;
  route: {
    params: {
      item: ItemData;
    };
  };
}

const ItemDetails: React.FC<ItemDetailsProps> = ({navigation, route}) => {
  const item = route?.params?.item;
  const [creatorName, setCreatorName] = useState('Loading...');
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (item?.createdBy) {
        console.log('Fetching user data for createdBy:', item.createdBy);
        console.log('Full item data:', item);
        
        try {
          const db = getDatabase(app);
          const userRef = ref(db, `users/${item.createdBy}`);
          
          const unsubscribe = onValue(userRef, (snapshot) => {
            console.log('User data snapshot received:', snapshot.exists());
            console.log('Snapshot key:', snapshot.key);
            console.log('Snapshot ref path:', snapshot.ref.toString());
            
            const userData = snapshot.val();
            console.log('Raw user data:', userData);
            console.log('User data type:', typeof userData);
            
            setIsLoadingUser(false);
            
            if (snapshot.exists() && userData) {
              // Check all possible name fields
              const possibleNameFields = ['nama', 'name', 'fullName', 'displayName', 'firstName'];
              let foundName = null;
              
              for (const field of possibleNameFields) {
                if (userData[field]) {
                  foundName = userData[field];
                  console.log(`Found name in field '${field}':`, foundName);
                  break;
                }
              }
              
              if (foundName) {
                setCreatorName(foundName);
              } else {
                console.log('No name field found in user data. Available fields:', Object.keys(userData));
                setCreatorName('User');
              }
            } else {
              console.log('No user data found for ID:', item.createdBy);
              setCreatorName('Unknown User');
            }
          }, (error) => {
            console.error('Error fetching user data:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            setIsLoadingUser(false);
            setCreatorName('Unknown User');
          });

          return () => {
            console.log('Cleaning up user data listener');
            unsubscribe();
          };
        } catch (error) {
          console.error('Error setting up user data listener:', error);
          setIsLoadingUser(false);
          setCreatorName('Unknown User');
        }
      } else {
        console.log('No createdBy field found in item:', item);
        setIsLoadingUser(false);
        setCreatorName('Unknown User');
      }
    };

    fetchUserData();
  }, [item]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCreatedAt = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon style={styles.button} />
          </TouchableOpacity>
          <Text style={styles.text}>Item Details</Text>
        </View>

        {item?.createdBy === getAuth().currentUser?.uid && (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('AddItems', { editItem: item })}
          >
            <Text style={styles.editButtonText}>Edit Post</Text>
          </TouchableOpacity>
        )}

        <Bigcard
          title={item?.itemName || 'Unknown Item'}
          createdby={isLoadingUser ? 'Loading...' : creatorName}
          date={item ? formatDate(item.date) : 'Unknown Date'}
          createdAt={item?.createdAt ? formatCreatedAt(item.createdAt) : 'Unknown'}
          location={item?.location || 'Unknown Location'}
          contact={item?.contact || 'No contact info'}
          description={item?.description || 'No description available'}
          imageBase64={item?.imageBase64}
          status={item?.postType || 'Found'}
        />
      </ScrollView>

      <BottomTabs navigation={navigation} activeIndex={0} />
    </View>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100, // Space for BottomTabs
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginRight: 12,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: '#000',
  },
  editButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginRight: 16,
    marginBottom: 16,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});
