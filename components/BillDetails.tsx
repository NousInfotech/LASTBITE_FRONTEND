import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface BillItem {
  label: string;
  amount: number;
  note?: string;
}

interface BillDetailsProps {
  items: BillItem[];
  total: number;
}

const BillDetails: React.FC<BillDetailsProps> = ({ items, total }) => {
  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>Bill Details</Text>
      <View style={styles.billContainer}>
        {items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.billRow,
              item.note && styles.noteRow
            ]}
          >
            <Text allowFontScaling={false}
              style={[
                styles.label,
                item.note && styles.noteText
              ]}
            >
              {item.label}
            </Text>
            {item.amount > 0 && (
              <Text allowFontScaling={false} style={styles.amount}>
                ₹{item.amount.toFixed(2)}
              </Text>
            )}
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text allowFontScaling={false} style={styles.totalLabel}>To Pay</Text>
          <Text allowFontScaling={false} style={styles.totalAmount}>₹{total.toFixed(2)}</Text>
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
    fontSize: RFPercentage(2),
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