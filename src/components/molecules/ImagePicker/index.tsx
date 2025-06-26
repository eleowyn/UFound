import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';

interface ImagePickerProps {
  imageUri: string | null;
  onSelectImage: () => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({imageUri, onSelectImage}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pictureContainer} onPress={onSelectImage}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.selectedImage} />
        ) : (
          <View style={styles.pictureUpload}>
            <View style={styles.cameraIconContainer}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
});
