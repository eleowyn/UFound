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
  TextInput,
  Modal,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {ArrowLeftIcon} from '../../assets/index';
import {BottomTabs, Button, Gap} from '../../components/index';
import {
  getDatabase,
  ref,
  onValue,
  update,
  remove,
  get,
} from 'firebase/database';
import {
  getAuth,
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

interface UserData {
  nama?: string;
  email?: string;
  faculty?: string;
  jurusan?: string;
  studentId?: string;
  phone?: string;
  foto?: string;
}

interface NavigationProps {
  replace: (screen: string) => void;
  goBack: () => void;
  navigate: (screen: string) => void;
}

const Account = ({navigation}: {navigation: NavigationProps}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

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

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              const auth = getAuth();
              await signOut(auth);
              navigation.replace('Login');
              showMessage({
                message: 'You have been logged out successfully',
                type: 'success',
              });
            } catch (error: any) {
              showMessage({
                message: 'Logout failed: ' + (error.message || 'Unknown error'),
                type: 'danger',
              });
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const deleteUserPosts = async (userId: string) => {
    const db = getDatabase();
    try {
      // Get all posts and filter manually to avoid indexing issues
      const snapshot = await get(ref(db, 'posts'));
      if (snapshot.exists()) {
        const updates: any = {};
        snapshot.forEach(childSnapshot => {
          const postData = childSnapshot.val();
          if (postData && postData.userId === userId) {
            updates[`posts/${childSnapshot.key}`] = null;
          }
        });

        if (Object.keys(updates).length > 0) {
          await update(ref(db), updates);
          console.log(`Deleted ${Object.keys(updates).length} user posts`);
        } else {
          console.log('No posts found for user');
        }
      }
    } catch (error) {
      console.error('Error deleting user posts:', error);
      throw error;
    }
  };

  const deleteUserComments = async (userId: string) => {
    const db = getDatabase();
    try {
      // Delete comments from posts
      const postsSnapshot = await get(ref(db, 'posts'));
      if (postsSnapshot.exists()) {
        const updates: any = {};
        postsSnapshot.forEach(postSnapshot => {
          const postData = postSnapshot.val();
          if (postData.comments) {
            Object.keys(postData.comments).forEach(commentId => {
              const comment = postData.comments[commentId];
              if (comment.userId === userId) {
                updates[`posts/${postSnapshot.key}/comments/${commentId}`] =
                  null;
              }
            });
          }
        });

        if (Object.keys(updates).length > 0) {
          await update(ref(db), updates);
          console.log('User comments deleted successfully');
        }
      }
    } catch (error) {
      console.error('Error deleting user comments:', error);
      throw error;
    }
  };

  const deleteUserLikes = async (userId: string) => {
    const db = getDatabase();
    try {
      // Delete likes from posts
      const postsSnapshot = await get(ref(db, 'posts'));
      if (postsSnapshot.exists()) {
        const updates: any = {};
        postsSnapshot.forEach(postSnapshot => {
          const postData = postSnapshot.val();
          if (postData.likes && postData.likes[userId]) {
            updates[`posts/${postSnapshot.key}/likes/${userId}`] = null;
          }
        });

        if (Object.keys(updates).length > 0) {
          await update(ref(db), updates);
          console.log('User likes deleted successfully');
        }
      }
    } catch (error) {
      console.error('Error deleting user likes:', error);
      throw error;
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone, all your data including posts will be permanently deleted. Are you sure you want to continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          style: 'destructive',
          onPress: () => setShowPasswordModal(true),
        },
      ],
    );
  };

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      showMessage({
        message: 'User not authenticated',
        type: 'danger',
      });
      return;
    }

    if (!password.trim()) {
      showMessage({
        message: 'Password is required',
        type: 'danger',
      });
      return;
    }

    setDeleting(true);
    try {
      console.log('Starting account deletion process...');

      // Step 1: Reauthenticate user
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      console.log('User reauthenticated successfully');

      // Step 2: Delete user's posts
      console.log('Deleting user posts...');
      await deleteUserPosts(user.uid);

      // Step 3: Delete user's comments
      console.log('Deleting user comments...');
      await deleteUserComments(user.uid);

      // Step 4: Delete user's likes
      console.log('Deleting user likes...');
      await deleteUserLikes(user.uid);

      // Step 5: Delete user data from Realtime Database
      console.log('Deleting user data from database...');
      const db = getDatabase();
      await remove(ref(db, `users/${user.uid}`));

      // Step 6: Delete user from Authentication
      console.log('Deleting user from authentication...');
      await deleteUser(user);

      console.log('Account deletion completed successfully');

      setShowPasswordModal(false);
      setPassword('');

      showMessage({
        message:
          'Account and all associated data have been deleted successfully',
        type: 'success',
      });

      navigation.replace('Login');
    } catch (error: any) {
      console.error('Account deletion error:', error);

      let errorMessage = 'Failed to delete account';

      switch (error.code) {
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/requires-recent-login':
          errorMessage =
            'Please logout and login again before deleting your account';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage =
            'Network error. Please check your connection and try again.';
          break;
        default:
          errorMessage = `Error: ${error.message || 'Unknown error'}`;
      }

      showMessage({
        message: errorMessage,
        type: 'danger',
      });
    } finally {
      setDeleting(false);
    }
  };

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
        message: 'Profile picture updated successfully!',
        type: 'success',
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      showMessage({
        message: 'Failed to upload photo: ' + (error.message || 'Unknown error'),
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
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 120}}>
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
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Faculty / Major</Text>
            <Text style={styles.infoValue}>
              {(userData?.faculty || 'Not specified') +
                ' / ' +
                (userData?.jurusan || 'Not specified')}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Student ID</Text>
            <Text style={styles.infoValue}>
              {userData?.studentId || 'Not specified'}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValue}>
              {userData?.phone || 'Not specified'}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button
            text="Logout"
            onPress={handleLogout}
            textColor="#FFFFFF"
            bgColor="#000000"
          />
          <Gap height={16} />
          <Button
            text={deleting ? 'Deleting Account...' : 'Delete Account'}
            onPress={confirmDeleteAccount}
            textColor="#FFFFFF"
            bgColor="#FF3B30"
          />
        </View>
      </ScrollView>

      <Modal
        visible={showPasswordModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          if (!deleting) {
            setShowPasswordModal(false);
            setPassword('');
          }
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Account Deletion</Text>
            <Text style={styles.modalMessage}>
              Enter your password to permanently delete your account and all
              associated data:
            </Text>

            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              editable={!deleting}
              autoFocus={true}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  if (!deleting) {
                    setShowPasswordModal(false);
                    setPassword('');
                  }
                }}
                disabled={deleting}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDeleteAccount}
                disabled={deleting || !password.trim()}>
                {deleting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.deleteButtonText}>Delete Account</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    fontFamily: 'Poppins-Medium',
    marginBottom: 24,
    color: '#333',
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
    fontFamily: 'Poppins-Bold',
    marginBottom: 2,
    color: '#333',
  },
  profileEmail: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  changeText: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 8,
    marginLeft: 22,
  },
  infoBox: {
    marginBottom: 24,
  },
  infoItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#6C757D',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    lineHeight: 20,
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
  actionsContainer: {
    marginBottom: 40,
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#FF3B30',
  },
  modalMessage: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  deleteButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
});
//l
export default Account;
// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {showMessage} from 'react-native-flash-message';
// import {ArrowLeftIcon} from '../../assets/index';
// import {BottomTabs, Button} from '../../components/index';
// import {getDatabase, ref, onValue, update} from 'firebase/database';
// import {getAuth} from 'firebase/auth';

// interface UserData {
//   nama?: string;
//   email?: string;
//   faculty?: string;
//   jurusan?: string;
//   studentId?: string;
//   phone?: string;
//   foto?: string;
// }

// const Account = ({navigation}) => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user) {
//       const db = getDatabase();
//       const userRef = ref(db, 'users/' + user.uid);

//       const unsubscribe = onValue(userRef, snapshot => {
//         const data = snapshot.val();
//         setUserData(data || {});
//         setLoading(false);
//       });

//       return () => unsubscribe();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const convertToBase64 = async (uri: string) => {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onerror = reject;
//       reader.onload = () => {
//         resolve(reader.result);
//       };
//       reader.readAsDataURL(blob);
//     });
//   };

//   const uploadImage = async (uri: string) => {
//     setUploading(true);
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (!user) {
//       showMessage({
//         message: 'User not authenticated',
//         type: 'danger',
//       });
//       return;
//     }

//     try {
//       const base64String = await convertToBase64(uri);

//       const db = getDatabase();
//       await update(ref(db, `users/${user.uid}`), {
//         foto: base64String,
//       });

//       showMessage({
//         message: 'Foto profil berhasil diupdate!',
//         type: 'success',
//       });
//     } catch (error) {
//       console.error('Upload error:', error);
//       showMessage({
//         message: 'Gagal mengupload foto',
//         type: 'danger',
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   const onSelectImage = () => {
//     Alert.alert(
//       'Upload Photo',
//       'Choose a method',
//       [
//         {
//           text: 'Camera',
//           onPress: () => {
//             launchCamera({mediaType: 'photo'}, response => {
//               if (response.didCancel) {
//                 showMessage({
//                   message: 'Image selection canceled',
//                   type: 'warning',
//                 });
//                 return;
//               }
//               if (response.assets && response.assets.length > 0) {
//                 const uri = response.assets[0].uri;
//                 if (uri) {
//                   uploadImage(uri);
//                 }
//               }
//             });
//           },
//         },
//         {
//           text: 'Gallery',
//           onPress: () => {
//             launchImageLibrary({mediaType: 'photo'}, response => {
//               if (response.didCancel) {
//                 showMessage({
//                   message: 'Image selection canceled',
//                   type: 'warning',
//                 });
//                 return;
//               }
//               if (response.assets && response.assets.length > 0) {
//                 const uri = response.assets[0].uri;
//                 if (uri) {
//                   uploadImage(uri);
//                 }
//               }
//             });
//           },
//         },
//         {text: 'Cancel', style: 'cancel'},
//       ],
//       {cancelable: true},
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#000000" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.page}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={{paddingBottom: 100}}>
//         <TouchableOpacity
//           style={styles.backIcon}
//           onPress={() => navigation.goBack()}>
//           <ArrowLeftIcon width={24} height={24} />
//         </TouchableOpacity>

//         <Text style={styles.title}>Account</Text>

//         <View style={styles.profileSection}>
//           <View style={styles.profileRow}>
//             <View style={styles.profileTouchable}>
//               <TouchableOpacity
//                 onPress={onSelectImage}
//                 disabled={uploading}
//                 style={styles.touchableContent}>
//                 {userData?.foto ? (
//                   <Image
//                     source={{uri: userData.foto}}
//                     style={styles.profileCircle}
//                   />
//                 ) : (
//                   <View style={styles.profileCircle} />
//                 )}
//               </TouchableOpacity>
//               {uploading && (
//                 <View style={styles.uploadOverlay} pointerEvents="none">
//                   <ActivityIndicator color="#fff" />
//                 </View>
//               )}
//             </View>
//             <View style={styles.textColumn}>
//               <Text style={styles.profileName}>
//                 {userData?.nama || 'No Name'}
//               </Text>
//               <Text style={styles.profileEmail}>
//                 {userData?.email || 'No Email'}
//               </Text>
//             </View>
//           </View>
//           <Text style={styles.changeText}>change</Text>
//         </View>

//         <View style={styles.infoBox}>
//           <Text style={styles.infoLabel}>Faculty / Major</Text>
//           <Text style={styles.infoValue}>
//             {(userData?.faculty || 'Not specified') +
//               ' / ' +
//               (userData?.jurusan || 'Not specified')}
//           </Text>

//           <Text style={styles.infoLabel}>Student ID</Text>
//           <Text style={styles.infoValue}>
//             {userData?.studentId || 'Not specified'}
//           </Text>

//           <Text style={styles.infoLabel}>Phone Number</Text>
//           <Text style={styles.infoValue}>
//             {userData?.phone || 'Not specified'}
//           </Text>
//         </View>
//       </ScrollView>

//       <BottomTabs navigation={navigation} activeIndex={0} />
//     </View>
//   );
// };

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
//   profileTouchable: {
//     position: 'relative',
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     overflow: 'hidden',
//   },
//   touchableContent: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
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
//     width: 200,
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
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   uploadOverlay: {
//     position: 'absolute',
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Account;
