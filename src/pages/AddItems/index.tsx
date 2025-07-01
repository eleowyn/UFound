import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, push, set, onValue, update} from 'firebase/database';
import app from '../../config/Firebase';
import {
  Loading,
  Header,
  Button,
  Gap,
  BottomTabs,
  DateTimePicker,
  PostTypeSelector,
  FormInput,
  ImagePicker,
} from '../../components/index';

interface NavigationProps {
  goBack: () => void;
  replace: (screen: string) => void;
  navigate: (screen: string) => void;
}

interface AddItemsProps {
  navigation: NavigationProps;
  route?: {
    params?: {
      editItem?: any;
    };
  };
}

const AddItems: React.FC<AddItemsProps> = ({navigation, route}) => {
  const editItem = route?.params?.editItem;
  const isEditing = !!editItem;

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [selectedPostType, setSelectedPostType] = useState<'Found' | 'Lost'>(
    editItem?.postType || 'Found',
  );
  const [date, setDate] = useState(editItem ? new Date(editItem.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [itemName, setItemName] = useState(editItem?.itemName || '');
  const [location, setLocation] = useState(editItem?.location || '');
  const [contact, setContact] = useState(editItem?.contact || '');
  const [description, setDescription] = useState(editItem?.description || '');
  const [selectedImage, setSelectedImage] = useState<any>(
    editItem?.imageBase64 ? { uri: editItem.imageBase64 } : null
  );

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    
    if (user) {
      const db = getDatabase(app);
      const userRef = ref(db, 'users/' + user.uid);
      
      onValue(userRef, (snapshot: any) => {
        const data = snapshot.val();
        if (data && data.nama) {
          setUserName(data.nama);
        }
      });
    }
  }, []);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDate(selectedTime);
    }
  };

  const openCamera = () => {
    setLoading(true);
    launchCamera({mediaType: 'photo'}, response => {
      setLoading(false);
      if (response.didCancel) {
        showMessage({
          message: 'Image selection canceled',
          type: 'info',
        });
      } else if (response.errorCode) {
        showMessage({
          message: 'Camera error: ' + response.errorMessage,
          type: 'danger',
        });
      } else if (response.assets?.length) {
        setSelectedImage(response.assets[0]);
        showMessage({
          message: 'Image selected from camera',
          type: 'success',
        });
      }
    });
  };

  const openGallery = () => {
    setLoading(true);
    launchImageLibrary({mediaType: 'photo'}, response => {
      setLoading(false);
      if (response.didCancel) {
        showMessage({
          message: 'Image selection canceled',
          type: 'info',
        });
      } else if (response.errorCode) {
        showMessage({
          message: 'Gallery error: ' + response.errorMessage,
          type: 'danger',
        });
      } else if (response.assets?.length) {
        setSelectedImage(response.assets[0]);
        showMessage({
          message: 'Image selected from gallery',
          type: 'success',
        });
      }
    });
  };

  const selectImage = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {text: 'Camera', onPress: openCamera},
        {text: 'Gallery', onPress: openGallery},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const convertImageToBase64 = async (imageUri: string): Promise<string | null> => {
    try {
      console.log('Converting image to base64...');
      const response = await fetch(imageUri);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          console.log('Image converted to base64 successfully');
          resolve(base64String);
        };
        reader.onerror = () => {
          console.error('Error converting image to base64');
          reject(new Error('Failed to convert image to base64'));
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      showMessage({
        message: 'Failed to process image. Saving item without image.',
        type: 'warning',
      });
      return null;
    }
  };

  const saveItemToFirebase = async () => {
    try {
      const auth = getAuth(app);
      const user = auth.currentUser;
      
      if (!user) {
        showMessage({
          message: 'Please login to add items',
          type: 'danger',
        });
        return false;
      }

      console.log(isEditing ? 'Updating item in Firebase...' : 'Saving item to Firebase...');
      const db = getDatabase(app);

      let imageBase64 = selectedImage?.uri;
      
      // Only convert to base64 if it's a new image (not already base64)
      if (selectedImage?.uri && !selectedImage.uri.startsWith('data:')) {
        console.log('Processing image...');
        try {
          imageBase64 = await convertImageToBase64(selectedImage.uri);
          console.log('Image processed successfully');
        } catch (imageError) {
          console.error('Image processing failed, continuing without image:', imageError);
          showMessage({
            message: 'Image processing failed, saving item without image',
            type: 'warning',
          });
          imageBase64 = null;
        }
      }

      if (isEditing && editItem) {
        // Update existing item
        const itemRef = ref(db, `items/${editItem.id}`);
        const updateData = {
          itemName,
          location,
          contact,
          description,
          postType: selectedPostType,
          date: date.toISOString(),
          imageBase64,
        };

        console.log('Updating item data:', updateData);
        await update(itemRef, updateData);
        console.log('Item updated successfully');
      } else {
        // Create new item
        const itemsRef = ref(db, 'items');
        const newItemRef = push(itemsRef);

        const itemData = {
          id: newItemRef.key,
          itemName,
          location,
          contact,
          description,
          postType: selectedPostType,
          date: date.toISOString(),
          imageBase64,
          createdBy: user.uid,
          createdAt: Date.now(),
        };

        console.log('Saving item data:', itemData);
        await set(newItemRef, itemData);
        console.log('Item saved successfully');
      }
      
      return true;
    } catch (error) {
      console.error('Error saving item:', error);
      showMessage({
        message: 'Failed to save item. Please try again.',
        type: 'danger',
      });
      return false;
    }
  };

  const handlePost = async () => {
    setLoading(true);
    
    if (!itemName || !location || !contact || !description) {
      showMessage({
        message: 'Please fill all required fields',
        type: 'danger',
      });
      setLoading(false);
      return;
    }

    const success = await saveItemToFirebase();
    
    setLoading(false);
    
    if (success) {
      showMessage({
        message: isEditing ? 'Item updated successfully!' : 'Item posted successfully!',
        type: 'success',
      });
      
      if (!isEditing) {
        // Reset form only for new posts
        setItemName('');
        setLocation('');
        setContact('');
        setDescription('');
        setSelectedImage(null);
        setDate(new Date());
        setSelectedPostType('Found');
      }
      
      navigation.goBack();
    }
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <Header
          title={isEditing ? "Edit Item" : "Add Items"}
          subTitle="Find your items and help people find it too!"
        />

        <View style={styles.formContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoIconGreen}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
            <Text style={styles.infoText}>
              Hey {userName || 'there'}, fill this form to {isEditing ? 'update' : 'add'} founded or lost items!
            </Text>
          </View>

          <Gap height={24} />

          <DateTimePicker
            label="Date & Time"
            date={date}
            showDate={showDatePicker}
            showTime={showTimePicker}
            onDateChange={onDateChange}
            onTimeChange={onTimeChange}
            onShowDatePicker={() => setShowDatePicker(true)}
            onShowTimePicker={() => setShowTimePicker(true)}
          />

          <Gap height={16} />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Post Type</Text>
            <PostTypeSelector
              selectedType={selectedPostType}
              onSelect={setSelectedPostType}
            />
          </View>

          <Gap height={16} />

          <View style={styles.rowContainer}>
            <View style={styles.halfWidthContainer}>
              <FormInput
                label="Item's Name"
                placeholder="Type the item's name..."
                placeholderTextColor="#666"
                value={itemName}
                onChangeText={setItemName}
              />
            </View>
            <View style={styles.halfWidthContainer}>
              <FormInput
                label="Location"
                placeholder="Where is found or lost?"
                placeholderTextColor="#666"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>

          <Gap height={16} />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Add Picture</Text>
            <ImagePicker
              imageUri={selectedImage?.uri || null}
              onSelectImage={selectImage}
            />
          </View>

          <Gap height={16} />

          <FormInput
            label="Your Information/Contact"
            placeholder="Give your contact so they can contact you!"
            placeholderTextColor="#666"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />

          <Gap height={16} />

          <FormInput
            label="Description/Item Information"
            placeholder="Describe the item, color, texture, etc..."
            placeholderTextColor="#666"
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />

          <Gap height={32} />

          <Button
            text={isEditing ? "Update" : "Post"}
            onPress={handlePost}
            bgColor="#000000"
            textColor="#FFFFFF"
          />

          <Gap height={100} />
        </View>
      </ScrollView>

      <BottomTabs navigation={navigation} activeIndex={0} />
      <FlashMessage position="top" />
      {loading && <Loading />}
    </View>
  );
};

export default AddItems;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  infoIconGreen: {
    width: 32,
    height: 32,
    backgroundColor: '#3CB371',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  plusIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    lineHeight: 16,
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 0,
  },
  halfWidthContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 6,
    color: '#000',
  },
});
