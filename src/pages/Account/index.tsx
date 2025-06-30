// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { showMessage } from 'react-native-flash-message';
// import { ArrowLeftIcon } from '../../assets/index';
// import BottomTabs from '../../components/molecules/Tabs';

// const Account = ({ navigation }) => {
//   const [photoUri, setPhotoUri] = useState(null);

//   const onSelectImage = () => {
//     Alert.alert(
//       'Upload Photo',
//       'Choose a method',
//       [
//         {
//           text: 'Camera',
//           onPress: () => {
//             launchCamera({ mediaType: 'photo' }, response => {
//               if (response.didCancel) {
//                 showMessage({
//                   message: 'Image selection canceled',
//                   type: 'warning',
//                 });
//                 return;
//               }
//               if (response.assets && response.assets.length > 0) {
//                 setPhotoUri(response.assets[0].uri);
//                 showMessage({
//                   message: 'Photo selected from camera!',
//                   type: 'success',
//                 });
//               }
//             });
//           },
//         },
//         {
//           text: 'Gallery',
//           onPress: () => {
//             launchImageLibrary({ mediaType: 'photo' }, response => {
//               if (response.didCancel) {
//                 showMessage({
//                   message: 'Image selection canceled',
//                   type: 'warning',
//                 });
//                 return;
//               }
//               if (response.assets && response.assets.length > 0) {
//                 setPhotoUri(response.assets[0].uri);
//                 showMessage({
//                   message: 'Photo selected from gallery!',
//                   type: 'success',
//                 });
//               }
//             });
//           },
//         },
//         { text: 'Cancel', style: 'cancel' },
//       ],
//       { cancelable: true }
//     );
//   };

//   return (
//     <View style={styles.page}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={{ paddingBottom: 100 }}>
//         <TouchableOpacity
//           style={styles.backIcon}
//           onPress={() => navigation.goBack()}>
//           <ArrowLeftIcon width={24} height={24} />
//         </TouchableOpacity>

//         <Text style={styles.title}>Account</Text>

//         <View style={styles.profileSection}>
//           <View style={styles.profileRow}>
//             <TouchableOpacity onPress={onSelectImage}>
//               {photoUri ? (
//                 <Image source={{ uri: photoUri }} style={styles.profileCircle} />
//               ) : (
//                 <View style={styles.profileCircle} />
//               )}
//             </TouchableOpacity>
//             <View style={styles.textColumn}>
//               <Text style={styles.profileName}>ellantif</Text>
//               <Text style={styles.profileEmail}>
//                 S2123@student.unklab.ac.id
//               </Text>
//             </View>
//           </View>
//           <Text style={styles.changeText}>change</Text>
//         </View>

//         <View style={styles.infoBox}>
//           <Text style={styles.infoLabel}>Faculty / Major</Text>
//           <Text style={styles.infoValue}>
//             Fakultas Ilmu Komputer - Sistem Informasi
//           </Text>

//           <Text style={styles.infoLabel}>Student ID</Text>
//           <Text style={styles.infoValue}>1050123456789</Text>

//           <Text style={styles.infoLabel}>Phone Number</Text>
//           <Text style={styles.infoValue}>08123456789</Text>
//         </View>
//       </ScrollView>

//       <BottomTabs navigation={navigation} activeIndex={0} />
//     </View>
//   );
// };

// export default Account;

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
//   },
//   backIcon: {
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '400',
//     marginBottom: 24,
//     width: 101,
//     height: 36,
//   },
//   profileSection: {
//     marginBottom: 32,
//   },
//   profileRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profileCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#D9D9D9',
//   },
//   textColumn: {
//     marginLeft: 16,
//   },
//   profileName: {
//     fontSize: 24,
//     fontWeight: '800',
//     marginBottom: 2,
//     width: 84,
//     height: 29,
//   },
//   profileEmail: {
//     fontSize: 12,
//     color: '#444',
//   },
//   changeText: {
//     fontSize: 10,
//     color: '#666',
//     marginTop: 8,
//     marginLeft: 22,
//     width: 42,
//     height: 15,
//   },
//   infoBox: {
//     borderWidth: 1,
//     borderColor: '#D3D3D3',
//     borderRadius: 12,
//     padding: 16,
//     backgroundColor: '#FAFAFA',
//   },
//   infoLabel: {
//     fontSize: 12,
//     fontWeight: '500',
//     marginTop: 12,
//     marginBottom: 4,
//   },
//   infoValue: {
//     fontSize: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#000',
//     paddingBottom: 4,
//   },
// });
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {ArrowLeftIcon} from '../../assets/index';
import BottomTabs from '../../components/molecules/Tabs';
import {getDatabase, ref, onValue, update} from 'firebase/database';
import {getAuth} from 'firebase/auth';

interface UserData {
  nama?: string;
  email?: string;
  faculty?: string;
  jurusan?: string;
  studentId?: string;
  phone?: string;
  foto?: string;
}

const Account = ({navigation}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);

      const unsubscribe = onValue(userRef, snapshot => {
        const data = snapshot.val();
        setUserData(data || {});
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const convertToBase64 = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const uploadImage = async (uri: string) => {
    setUploading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      showMessage({
        message: 'User not authenticated',
        type: 'danger',
      });
      return;
    }

    try {
      const base64String = await convertToBase64(uri);

      const db = getDatabase();
      await update(ref(db, `users/${user.uid}`), {
        foto: base64String,
      });

      showMessage({
        message: 'Foto profil berhasil diupdate!',
        type: 'success',
      });
    } catch (error) {
      console.error('Upload error:', error);
      showMessage({
        message: 'Gagal mengupload foto',
        type: 'danger',
      });
    } finally {
      setUploading(false);
    }
  };

  const onSelectImage = () => {
    Alert.alert(
      'Upload Photo',
      'Choose a method',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera({mediaType: 'photo'}, response => {
              if (response.didCancel) {
                showMessage({
                  message: 'Image selection canceled',
                  type: 'warning',
                });
                return;
              }
              if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (uri) {
                  uploadImage(uri);
                }
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary({mediaType: 'photo'}, response => {
              if (response.didCancel) {
                showMessage({
                  message: 'Image selection canceled',
                  type: 'warning',
                });
                return;
              }
              if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (uri) {
                  uploadImage(uri);
                }
              }
            });
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

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
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon width={24} height={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Account</Text>

        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            <View style={styles.profileTouchable}>
              <TouchableOpacity
                onPress={onSelectImage}
                disabled={uploading}
                style={styles.touchableContent}>
                {userData?.foto ? (
                  <Image
                    source={{uri: userData.foto}}
                    style={styles.profileCircle}
                  />
                ) : (
                  <View style={styles.profileCircle} />
                )}
              </TouchableOpacity>
              {uploading && (
                <View style={styles.uploadOverlay} pointerEvents="none">
                  <ActivityIndicator color="#fff" />
                </View>
              )}
            </View>
            <View style={styles.textColumn}>
              <Text style={styles.profileName}>
                {userData?.nama || 'No Name'}
              </Text>
              <Text style={styles.profileEmail}>
                {userData?.email || 'No Email'}
              </Text>
            </View>
          </View>
          <Text style={styles.changeText}>change</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Faculty / Major</Text>
          <Text style={styles.infoValue}>
            {(userData?.faculty || 'Not specified') +
              ' / ' +
              (userData?.jurusan || 'Not specified')}
          </Text>

          <Text style={styles.infoLabel}>Student ID</Text>
          <Text style={styles.infoValue}>
            {userData?.studentId || 'Not specified'}
          </Text>

          <Text style={styles.infoLabel}>Phone Number</Text>
          <Text style={styles.infoValue}>
            {userData?.phone || 'Not specified'}
          </Text>
        </View>
      </ScrollView>

      <BottomTabs navigation={navigation} activeIndex={0} />
    </View>
  );
};

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
  profileTouchable: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  touchableContent: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    width: 200,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  uploadOverlay: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Account;
