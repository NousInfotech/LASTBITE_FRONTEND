// AddMoreItems Component
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

// Define types for the item object and props
interface CartItemProps {
  item: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  };
  onUpdateQuantity: (id: number, newQuantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.priceText}>₹{item.price}</Text>
    </View>
  );
};

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface AddMoreItemsProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const AddMoreItems: React.FC<AddMoreItemsProps> = ({ items, setItems }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleUpdateQuantity = (id: number, newQuantity: number): void => {
    if (newQuantity >= 1) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleAddMoreItem = () => {
    const newItem: Item = {
      id: items.length + 1,
      name: `Item ${items.length + 1}`,
      quantity: 1,
      price: 100,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <CartItem key={item.id} item={item} onUpdateQuantity={handleUpdateQuantity} />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddMoreItem}>
        <Text style={styles.addButtonText}>Add More Items</Text>
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: '#006d5b',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  priceText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    minWidth: 60,
    textAlign: 'right',
  },
  addButton: {
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#006d5b',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#006d5b',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default AddMoreItems;