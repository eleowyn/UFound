import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LogoUFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.U}>U</Text>
      <Text style={styles.Strep}>-</Text>
      <Text style={styles.FOUND}>Found</Text>
    </View>
  );
};

export default LogoUFound;

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  U: {color: '#FACC15', fontSize: 40, fontFamily: 'Poppins-SemiBold'},
  Strep: {color: '000000', fontSize: 40},
  FOUND: {color: '#0086A9', fontSize: 40, fontFamily: 'Poppins-SemiBold'},
  text: {color: '000000', fontSize: 32, fontFamily: 'Poppins-SemiBold'},
});

// import React from 'react';
// import {Text, View, StyleSheet} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// const LogoUFound = () => {
//   return (
//     <LinearGradient
//       colors={['#FFD700', '#FF00FF', '#00FFFF', '#0000FF']}
//       start={{x: 0, y: 0}}
//       end={{x: 1, y: 1}}
//       style={styles.gradientBorder}>
//       <View style={styles.innerBox}>
//         <Text style={styles.logoText}>
//           <Text style={styles.uText}>U</Text>
//           <Text style={styles.foundText}>-Found</Text>
//         </Text>
//       </View>
//     </LinearGradient>
//   );
// };

// export default LogoUFound;

// const styles = StyleSheet.create({
//   gradientBorder: {
//     padding: 2,
//     borderRadius: 6,
//   },
//   innerBox: {
//     backgroundColor: 'white',
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 4,
//   },
//   logoText: {
//     fontSize: 20,
//     fontFamily: 'Poppins-SemiBold',
//   },
//   uText: {
//     color: '#FFD700',
//   },
//   foundText: {
//     color: '#00BFFF',
//   },
// });
