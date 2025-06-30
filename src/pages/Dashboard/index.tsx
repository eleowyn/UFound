// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {Card, BottomTabs} from '../../components/index';
// import {AddItemsIcon, BrowseIcon} from '../../assets/index';

// import {NavigationProp} from '@react-navigation/native';

// interface DashboardProps {
//   navigation: NavigationProp<any>;
// }

// const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
//   return (
//     <View style={styles.page}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={{paddingBottom: 100}}>
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.greeting}>Hey, elsherg</Text>
//             <Text style={styles.subText}>
//               Find your items and help people find it too!
//             </Text>
//           </View>
//         </View>

//         <View style={styles.buttonRow}>
//           <TouchableOpacity
//             style={[styles.circleButton, styles.browseBg]}
//             onPress={() => navigation.navigate('Search')}>
//             <BrowseIcon width={40} height={40} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.circleButton, styles.addBg]}
//             onPress={() => navigation.navigate('AddItems')}>
//             <AddItemsIcon width={40} height={40} />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.buttonLabelRow}>
//           <Text style={styles.label}>Browse Items</Text>
//           <Text style={styles.label}>Add Items</Text>
//         </View>

//         <View style={styles.cardContainer}>
//           <View style={styles.cardGrid}>
//             <Card
//               title="Charger"
//               location="GK2-108"
//               status="Found"
//               date="Oct 2, 2018"
//             />
//             <Card
//               title="Charger"
//               location="GK2-108"
//               status="Lost"
//               date="Oct 2, 2018"
//             />
//             <Card
//               title="Charger"
//               location="GK2-108"
//               status="Found"
//               date="Oct 2, 2018"
//             />
//             <Card
//               title="Charger"
//               location="GK2-108"
//               status="Lost"
//               date="Oct 2, 2018"
//             />
//             <Card
//               title="Charger"
//               location="GK2-108"
//               status="Found"
//               date="Oct 2, 2018"
//             />
//             <Card
//               title="Charger"
//               location="GK2-108"
//               status="Lost"
//               date="Oct 2, 2018"
//             />
//           </View>
//         </View>
//       </ScrollView>

//       <BottomTabs navigation={navigation} activeIndex={0} />
//     </View>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingBottom: 100,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 24,
//     paddingTop: 40,
//     paddingBottom: 100,
//   },
//   header: {
//     marginBottom: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   greeting: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   subText: {
//     fontSize: 11,
//     color: '#666',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 24,
//   },
//   circleButton: {
//     width: 60,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   browseBg: {
//     backgroundColor: '#FCF4CB',
//     width: 52,
//     height: 52,
//   },
//   addBg: {
//     backgroundColor: '#FFDEDE',
//     width: 52,
//     height: 52,
//   },
//   buttonLabelRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 8,
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   cardContainer: {
//     marginTop: 32,
//     padding: 16,
//     borderRadius: 13,
//     backgroundColor: '#FFFF',
//     borderWidth: 1,
//     borderColor: '#D3D3D3',
//   },
//   cardSectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//   },
//   cardGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     rowGap: 16,
//   },
// });
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Card, BottomTabs} from '../../components/index';
import {AddItemsIcon, BrowseIcon} from '../../assets/index';
import {NavigationProp} from '@react-navigation/native';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue} from 'firebase/database';

interface DashboardProps {
  navigation: NavigationProp<any>;
}

interface UserData {
  nama?: string;
  email?: string;
}

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);

      const unsubscribe = onValue(userRef, snapshot => {
        const data: UserData = snapshot.val();
        if (data?.nama) {
          setUserName(data.nama);
        } else {
          setUserName('User');
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
      setUserName('User');
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, {userName}</Text>
            <Text style={styles.subText}>
              Find your items and help people find it too!
            </Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.circleButton, styles.browseBg]}
            onPress={() => navigation.navigate('Search')}>
            <BrowseIcon width={40} height={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.circleButton, styles.addBg]}
            onPress={() => navigation.navigate('AddItems')}>
            <AddItemsIcon width={40} height={40} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonLabelRow}>
          <Text style={styles.label}>Browse Items</Text>
          <Text style={styles.label}>Add Items</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardGrid}>
            <Card
              title="Charger"
              location="GK2-108"
              status="Found"
              date="Oct 2, 2018"
            />
            <Card
              title="Charger"
              location="GK2-108"
              status="Lost"
              date="Oct 2, 2018"
            />
            <Card
              title="Charger"
              location="GK2-108"
              status="Found"
              date="Oct 2, 2018"
            />
            <Card
              title="Charger"
              location="GK2-108"
              status="Lost"
              date="Oct 2, 2018"
            />
            <Card
              title="Charger"
              location="GK2-108"
              status="Found"
              date="Oct 2, 2018"
            />
            <Card
              title="Charger"
              location="GK2-108"
              status="Lost"
              date="Oct 2, 2018"
            />
          </View>
        </View>
      </ScrollView>

      <BottomTabs navigation={navigation} activeIndex={0} />
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
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
