import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SimpleDatePickerProps {
  visible: boolean;
  value: Date;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
}

const SimpleDatePicker: React.FC<SimpleDatePickerProps> = ({
  visible,
  value,
  onClose,
  onDateSelect,
}) => {
  const [selectedYear, setSelectedYear] = useState(value.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(value.getMonth());
  const [selectedDay, setSelectedDay] = useState(value.getDate());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);
    onDateSelect(newDate);
    onClose();
  };

  const renderPicker = (
    title: string,
    items: (string | number)[],
    selectedValue: string | number,
    onSelect: (value: any) => void
  ) => (
    <View style={styles.pickerColumn}>
      <Text style={styles.pickerTitle}>{title}</Text>
      <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pickerItem,
              (item === selectedValue) && styles.pickerItemSelected
            ]}
            onPress={() => onSelect(typeof item === 'string' ? index : item)}
          >
            <Text style={[
              styles.pickerItemText,
              (item === selectedValue) && styles.pickerItemTextSelected
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Select Date</Text>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.confirmButton}>Done</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.pickerContainer}>
            {renderPicker('Month', months, months[selectedMonth], setSelectedMonth)}
            {renderPicker('Day', days, selectedDay, setSelectedDay)}
            {renderPicker('Year', years, selectedYear, setSelectedYear)}
          </View>
          
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>
              Selected: {months[selectedMonth]} {selectedDay}, {selectedYear}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  confirmButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 200,
    padding: 16,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  pickerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  pickerScroll: {
    flex: 1,
  },
  pickerItem: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 2,
  },
  pickerItemSelected: {
    backgroundColor: '#007AFF',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#333',
  },
  pickerItemTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  selectedDateContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default SimpleDatePicker;