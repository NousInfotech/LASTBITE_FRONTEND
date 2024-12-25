import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

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

const AddMoreItems: React.FC<AddMoreItemsProps> = ({ item, onUpdateQuantity }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Optionally, show a loading screen or placeholder
  }

  return (
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

        <Text style={styles.priceText}>₹{item.price}</Text>
      </View>
    </View>
  );
};

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
    backgroundColor: '#01615F',
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
