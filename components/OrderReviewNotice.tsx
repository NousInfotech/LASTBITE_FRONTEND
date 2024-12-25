import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OrderReviewNotice = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Review your order and address details to avoid cancellations
      </Text>
      
      <View style={styles.noteContainer}>
        <Text style={styles.noteLabel}>Note: </Text>
        <Text style={styles.noteText}>
          Please ensure your address and order details are correct. This order, if cancelled, is non-refundable.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.policyButton}
        onPress={() => {/* Handle policy click */}}
      >
        <Text style={styles.policyText}>READ POLICY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  noteContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',
    marginBottom: 12,
  },
  noteLabel: {
    color: '#2C2C2C',
    fontWeight: '600',
  },
  noteText: {
    color: '#666666',
    flex: 1,
  },
  policyButton: {
    alignSelf: 'flex-start',
  },
  policyText: {
    color: '#00A699',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default OrderReviewNotice;
