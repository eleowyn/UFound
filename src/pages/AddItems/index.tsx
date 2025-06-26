import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import FlashMessage, {showMessage} from 'react-native-flash-message';
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
}

const AddItems: React.FC<AddItemsProps> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<'Found' | 'Lost'>(
    'Found',
  );
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);

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

  const handlePost = () => {
    setLoading(true);
    if (!itemName || !location || !contact || !description) {
      showMessage({
        message: 'Please fill all required fields',
        type: 'danger',
      });
      setLoading(false);
      return;
    }

    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false);
      showMessage({
        message: 'Item posted successfully!',
        type: 'success',
      });
      navigation.goBack();
    }, 2000);
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
        />

        <View style={styles.formContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoIconGreen}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
            <Text style={styles.infoText}>
              Hey elshara, fill this form to add founded or lost items!
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
            placeholderTextColor="#000"
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />

          <Gap height={32} />

          <Button
            text="Post"
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
