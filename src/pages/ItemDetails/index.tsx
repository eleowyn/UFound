import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {BackIcon} from '../../assets';
import {Bigcard, BottomTabs} from '../../components';

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
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

        <Bigcard
          title={item?.itemName || 'Unknown Item'}
          createdby={item?.contact || 'Unknown'}
          date={item ? formatDate(item.date) : 'Unknown Date'}
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
});

// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
// } from 'react-native';
// import React from 'react';
// import {BackIcon} from '../../assets';
// import {Bigcard, BottomTabs} from '../../components/index';

// const ItemDetails = ({navigation}) => {
//   return (
//     <View style={styles.page}>
//       <ScrollView>
//         <View style={styles.header}>
//           <View>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <BackIcon style={styles.button} />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.text}>Items Details</Text>
//         </View>
//         <Bigcard />
//       </ScrollView>

//       <BottomTabs navigation={navigation} activeIndex={0} />
//     </View>
//   );
// };

// export default ItemDetails;

// const styles = StyleSheet.create({
//   page: {
//     paddingBottom: 100,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   button: {
//     margin: 30,
//   },
//   text: {
//     marginLeft: 50,
//     fontFamily: 'Poppins-Medium',
//     fontSize: 24,
//   },
// });
