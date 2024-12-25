import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define types for the props passed to AddMoreItems
interface AddMoreItemsProps {
  item: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  };
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
}

const AddMoreItems: React.FC<AddMoreItemsProps> = ({ item, onUpdateQuantity }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemName}>{item.name}</Text>
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        style={styles.quantityButton}
        onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
      >
        <Text style={styles.quantityButtonText}>−</Text>
      </TouchableOpacity>

      <Text style={styles.quantityText}>{item.quantity}</Text>

      <TouchableOpacity
        style={styles.quantityButton}
        onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
      >
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>

      <Text style={styles.priceText}>${item.price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 16,
  },
  itemName: {
    fontSize: 14,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#008080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  priceText: {
    marginLeft: 'auto',
    fontSize: 14,
  },
});

export default AddMoreItems;
