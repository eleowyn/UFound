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

const ItemDetails = ({navigation}) => {
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

        <Bigcard />
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
