import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const MealCustomizer = () => {


  
  const [quantity, setQuantity] = useState<{ [key: number]: number }>({});
  const items = [
    { id: 1, name: 'Lorem Ipsum', price: '₹34', image: require('../assets/images/Coke.png') },
    { id: 2, name: 'Lorem Ipsum', price: '₹34', image: require('../assets/images/Mango.png') },
    { id: 3, name: 'Lorem Ipsum', price: '₹34', image: require('../assets/images/Banana.png') },
    { id: 4, name: 'Lorem Ipsum', price: '₹34', image: require('../assets/images/Cake.png') },
  ];

  const renderItem = ({ item }: { item: any }) => {
    const currentQuantity = quantity[item.id] || 0;

    return (
      <View style={styles.productCard}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.secondContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
            
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Meal</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 16,
  },
  productList: {
    paddingRight: 16,
  },
  productCard: {
    width: 143,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingBottom: 12,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    height: 260,
  },
  productImage: {
    width: '100%',
    height: 143,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  secondContainer: {
    padding: 8,
  },
  productName: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    color: '#01615F',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default MealCustomizer;
