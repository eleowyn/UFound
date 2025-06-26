import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Foundlabel from '../../atoms/statuslabel/foundlabel';
import Lostlabel from '../../atoms/statuslabel/lostlabel';

interface PostTypeSelectorProps {
  selectedType: 'Found' | 'Lost';
  onSelect: (type: 'Found' | 'Lost') => void;
}

const PostTypeSelector: React.FC<PostTypeSelectorProps> = ({
  selectedType,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selectedType === 'Found' && styles.selectedButton]}
        onPress={() => onSelect('Found')}
        activeOpacity={0.7}>
        <Foundlabel
          width={80}
          height={30}
          fontSize={14}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedType === 'Lost' && styles.selectedButton]}
        onPress={() => onSelect('Lost')}
        activeOpacity={0.7}>
        <Lostlabel
          width={80}
          height={30}
          fontSize={14}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PostTypeSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 4,
  },
  selectedButton: {
    borderColor: '#3CB371',
    borderRadius: 20,
    backgroundColor: 'rgba(60, 179, 113, 0.1)',
  },
});
