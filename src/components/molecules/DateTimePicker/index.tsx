import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from '@react-native-community/datetimepicker';

interface DateTimePickerProps {
  label?: string;
  date: Date;
  showDate: boolean;
  showTime: boolean;
  onDateChange: (event: any, selectedDate?: Date) => void;
  onTimeChange: (event: any, selectedTime?: Date) => void;
  onShowDatePicker: () => void;
  onShowTimePicker: () => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  date,
  showDate,
  showTime,
  onDateChange,
  onTimeChange,
  onShowDatePicker,
  onShowTimePicker,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity style={styles.input} onPress={onShowDatePicker}>
        <Text style={styles.text}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.input, {marginTop: 12}]} onPress={onShowTimePicker}>
        <Text style={styles.text}>{date.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePickerModal
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTime && (
        <DateTimePickerModal
          value={date}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 6,
    color: '#000',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
});
