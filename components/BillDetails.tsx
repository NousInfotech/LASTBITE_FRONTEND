import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BillDetails = () => {
  const billItems = [
    { label: 'Item Total', value: '$70' },
    { label: 'Delivery Fee | 11.0 kms', value: '$79.00' },
    { label: 'Platform Fee', value: '$7.00' },
    { label: 'GST and Restaurant Charges', value: '$4.76' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bill Details</Text>

      {billItems.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}

      <Text style={styles.discountText}>
        Order above Rs. 169 for a discount on delivery
      </Text>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>To Pay</Text>
        <Text style={styles.totalValue}>$161</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    color: '#666666',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  discountText: {
    color: '#666666',
    fontSize: 13,
    marginVertical: 8,
    fontStyle: 'italic',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});

export default BillDetails;
