import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

type CartCounterProps = {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const CartCounter = ({ count, onIncrement, onDecrement }: CartCounterProps) => (
  
  <View style={styles.counterContainer}>
    <TouchableOpacity onPress={onDecrement} style={styles.counterButton}>
      <Text style={styles.counterButtonText}>-</Text>
    </TouchableOpacity>
    <Text style={styles.counterText}>{count}</Text>
    <TouchableOpacity onPress={onIncrement} style={styles.counterButton}>
      <Text style={styles.counterButtonText}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor:'#01615F',
    borderRadius: 4,
  },
  counterButton: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#01615F',
    backgroundColor: '#01615F',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  counterText: {
    color: '#01615F',
    fontSize: 14,
    marginHorizontal: 8,
  },
});

export default CartCounter;
