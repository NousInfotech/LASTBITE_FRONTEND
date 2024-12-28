import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BillItem {
  label: string;
  amount: number;
  note?: string;
}

interface BillDetailsProps {
  items: BillItem[];
  total: number;
}

const BillDetails: React.FC<BillDetailsProps> = () => {
  const billItems: BillItem[] = [
    { label: 'Item Total', amount: 70},
    { label: 'Delivery Fee | 11.0 kms', amount: 79.00 },
    { 
      label: 'Order above Rs.169 for discount ed delivery',
      amount: 0,
      note: 'info'
    },
    { label: 'Platform fee', amount: 7.00 },
    { label: 'GST and Restaurant Charges', amount: 4.76 },
  ];

  const totalAmount = billItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bill Details</Text>
      <View style={styles.billContainer}>
        {billItems.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.billRow,
              item.note && styles.noteRow
            ]}
          >
            <Text 
              style={[
                styles.label,
                item.note && styles.noteText
              ]}
            >
              {item.label}
            </Text>
            {item.amount > 0 && (
              <Text style={styles.amount}>
                ₹{item.amount.toFixed(2)}
              </Text>
            )}
          </View>
        ))}
        
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>To Pay</Text>
          <Text style={styles.totalAmount}>₹{totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontFamily:'Poppins-SemiBold',
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  billContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  noteRow: {
    marginTop: -4,
    marginBottom: -4,
  },
  label: {
    fontSize: 13,
    fontFamily:'Poppins-Regular',
    color: '#929292',
    flex: 1,
  },
  noteText: {
    fontSize: 13,
    fontFamily:'Poppins-Regular',
    color: '#929292',
  },
  amount: {
    fontSize: 14,
    color: '#000',
    fontFamily:'Poppins-Regular',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 15,
    fontFamily:'Poppins-Medium',
    color: '#333333',
  },
  totalAmount: {
    fontSize: 15,
    fontFamily:'Poppins-SemiBold',
    color: '#333333',
  },
});

export default BillDetails;