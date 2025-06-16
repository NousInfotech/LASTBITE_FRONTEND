import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CartCounter from './CartCounter';
import * as Font from 'expo-font';
import { RFPercentage } from 'react-native-responsive-fontsize';

type Product = {
  id: string;
  title: string;
  weight: string;
  price: string;
  image: any;
};

type ProductCardProps = {
  item: Product;
  onAdd: () => void;
  cartCount: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const HotDealsList = ({ item, onAdd, cartCount, onIncrement, onDecrement }: ProductCardProps) => {
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
    return null; // Optionally, show a loading screen or placeholder
  }

  return (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text allowFontScaling={false}  style={styles.productTitle}>{item.title}</Text>
      <Text allowFontScaling={false}  style={styles.productWeight}>{item.weight}</Text>
      <View style={styles.productFooter}>
        <Text allowFontScaling={false}  style={styles.productPrice}>₹{item.price}</Text>
        {cartCount > 0 ? (
          <CartCounter
            count={cartCount}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        ) : (
          <TouchableOpacity onPress={onAdd} style={styles.addButton}>
            <Text allowFontScaling={false}  style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: '48%',
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 13,
    fontFamily:'Poppins-SemiBold',
  },
  productWeight: {
    fontSize: RFPercentage(2),
    color: '#666',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productPrice: {
    fontSize: RFPercentage(2),
    fontWeight: '600',
    color: '#01615F',
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#01615F',
  },
  addButtonText: {
    color: '#01615F',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HotDealsList;
