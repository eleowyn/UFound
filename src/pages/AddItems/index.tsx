import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../components/molecules/header';
import {Button, Gap} from '../../components';
import BottomTabs from '../../components/molecules/Tabs';

const AddItems = () => {
  const [selectedPostType, setSelectedPostType] = useState('Found');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Removed unused showTimePicker state
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const formatDateTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Removed onTimeChange since time picker is removed

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

  const openCamera = () => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.8,
    };

    launchCamera(options, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
        Alert.alert('Success', 'Photo captured successfully!');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
        Alert.alert('Success', 'Photo selected successfully!');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      }
    });
  };

  const handlePost = () => {
    if (!itemName || !location || !contact || !description) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    Alert.alert('Success', 'Item posted successfully!');
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        
        <Header
          title="Add Items"
          subTitle="Find your items and help people find it too!"
          showBackButton={true}
        />
        
        <View style={styles.formContainer}>
          {/* Info Message */}
        <View style={styles.infoContainer}>
          <View style={styles.infoIconGreen}>
            <Text style={styles.plusIcon}>+</Text>
          </View>
          <Text style={styles.infoText}>
            Hey elshara, fill this form to add founded or lost items!
          </Text>
        </View>

        <Gap height={24} />

        {/* Date & Time */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date & Time</Text>
          <TouchableOpacity
            style={styles.dateTimeInput}
            onPress={() => {
              setShowDatePicker(true);
            }}>
            <Text style={styles.dateTimeText}>
              {date.toLocaleDateString('en-US') || 'Select date'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        <Gap height={16} />

        {/* Post Type */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Post Type</Text>
          <View style={styles.postTypeContainer}>
            <TouchableOpacity
              style={[
                styles.postTypeButton,
                selectedPostType === 'Found' && styles.foundButton,
              ]}
              onPress={() => setSelectedPostType('Found')}>
              <Text
                style={[
                  styles.postTypeText,
                  selectedPostType === 'Found' && styles.foundText,
                ]}>
                Found
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.postTypeButton,
                selectedPostType === 'Lost' && styles.lostButtonGray,
              ]}
              onPress={() => setSelectedPostType('Lost')}>
              <Text
                style={[
                  styles.postTypeText,
                  selectedPostType === 'Lost' && styles.lostTextGray,
                ]}>
                Lost
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Gap height={16} />

        {/* Item Name and Location Row */}
        <View style={styles.rowContainer}>
          <View style={styles.halfWidthContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Item's Name</Text>
          <TextInput
            placeholder="Type the item's name..."
            placeholderTextColor="#666"
            style={styles.textInput}
            value={itemName}
            onChangeText={setItemName}
          />
        </View>
          </View>
          <View style={styles.halfWidthContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Location</Text>
          <TextInput
            placeholder="Where is found or lost?"
            placeholderTextColor="#666"
            style={styles.textInput}
            value={location}
            onChangeText={setLocation}
          />
        </View>
          </View>
        </View>

        <Gap height={16} />

        {/* Add Picture */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Add Picture</Text>
            <TouchableOpacity style={styles.pictureContainer} onPress={selectImage}>
              {selectedImage && selectedImage.uri ? (
                <Image source={{uri: selectedImage.uri}} style={styles.selectedImage} />
              ) : (
                <View style={styles.pictureUploadGray}>
                  <View style={styles.cameraIconContainer}>
                    <Text style={styles.cameraIcon}>📷</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

        <Gap height={16} />

        {/* Contact Information */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Your Information/Contact</Text>
        <TextInput
          placeholder="Give your contact so they can contact you!"
          placeholderTextColor="#666"
          style={styles.textInput}
          value={contact}
          onChangeText={setContact}
          // Added keyboardType for contact input
          keyboardType="phone-pad"
        />
        </View>

        <Gap height={16} />

        {/* Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description/Item Information</Text>
          <View style={styles.descriptionContainer}>
          <TextInput
            placeholder="Describe the item, color, texture, etc..."
            placeholderTextColor="#000"
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            style={styles.descriptionInput}
          />
          </View>
        </View>

        <Gap height={32} />

        <Button text="Post" onPress={handlePost} bgColor="#000000" textColor="#FFFFFF" />

                  <Gap height={100} />
        </View>
      </ScrollView>

      <BottomTabs activeIndex={2} />
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
  infoIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
  postTypeButton: {
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 70,
    alignItems: 'center',
  },
  foundButton: {
    backgroundColor: '#3CB371',
    borderColor: '#3CB371',
  },
  lostButtonGray: {
    backgroundColor: '#FFC6C7',
    borderColor: '#FFC6C7',
  },
  postTypeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  foundText: {
    color: '#FFFFFF',
  },
  lostTextGray: {
    color: '#666',
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
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 6,
    color: '#000',
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 6,
    color: '#000000',
  },
  textInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    backgroundColor: '#fff',
    color: '#000',
  },
  dateTimeButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  dateTimeText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  timeButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  timeButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  dropdown: {
    height: 60,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#A0A0A0',
  },
  postTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  postTypeButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 70,
    alignItems: 'center',
  },
  foundButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  lostButton: {
    backgroundColor: '#FFA726',
    borderColor: '#FFA726',
  },
  postTypeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  foundText: {
    color: '#FFFFFF',
  },
  lostText: {
    color: '#FFFFFF',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 0,
  },
  halfWidthContainer: {
    flex: 1,
  },
  pictureContainer: {
    alignItems: 'center',
    marginTop: 6,
  },
  pictureUpload: {
    width: '100%',
    height: 120,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cameraIconContainer: {
    backgroundColor: '#CFCFCF',
    width: 80,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 20,
    opacity: 0.7,
  },
  selectedImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  descriptionInput: {
    height: 100,
    paddingTop: 12,
  },
  descriptionContainer: {
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  dateTimeInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dateTimeText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  pictureContainer: {
    alignItems: 'center',
    marginTop: 6,
  },
  pictureUpload: {
    width: '100%',
    height: 120,
    backgroundColor: '#D3D3D3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cameraIconContainer: {
    backgroundColor: '#CFCFCF',
    width: 80,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 20,
    opacity: 0.7,
  },
  selectedImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    resizeMode: 'cover',
  },
});
