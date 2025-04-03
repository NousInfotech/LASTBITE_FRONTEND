import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router'; // Replace with your router library if not using Expo
import * as Font from 'expo-font';
import { RFPercentage } from 'react-native-responsive-fontsize';

// Define the Product type
type Product = {
  id: string;
  name: string;
  weight: string;
  price: string;
  image: any;
};

// Example product data
const products: Product[] = [
  {
    id: '1',
    name: 'Lorem Ipsum ',
    weight: '48 g',
    price: '₹300',
    image: require('../assets/images/TooYumm.png'),
  },
  {
    id: '2',
    name: 'Lorem Ipsum ',
    weight: '48 g',
    price: '₹300',
    image: require('../assets/images/cabbage.png'),
  },
  {
    id: '3',
    name: 'Lorem Ipsum ',
    weight: '48 g',
    price: '₹300',
    image: require('../assets/images/Cheetos.png'),
  },
  {
    id: '4',
    name: 'Lorem Ipsum ',
    weight: '48 g',
    price: '₹300',
    image: require('../assets/images/TooYumm.png'),
  },
];

const ProductSearch: React.FC = () => {
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
  const router = useRouter();

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

  // Render a single product card
  const renderProduct = ({ item }: { item: Product }) => {
    const currentQuantity = quantity[item.id] || 0;

    return (
      <View style={styles.productCard}>
        
        <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>

        {/* Image Section */}
        <View>
          <Image source={item.image} style={styles.productImage} />
        </View>

        {/* Product Details Section */}
        <View style={styles.secondContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productWeight}>{item.weight}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
          
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hot deals</Text>
       
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingVertical:14,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: RFPercentage(2),
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  seeAll: {
    fontSize: RFPercentage(2),
    color: '#01615F',
    fontFamily: 'Poppins-Medium',
  },
  arrow: {
    fontSize: 20,
    color: '#01615F',
  },
  productList: {
    paddingRight: 16,
  },
  productCard: {
    width: 123,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingBottom: 12,
    height: 240,
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },
  productImage: {
    width: '100%',
    height: 143,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  secondContainer:{
    paddingHorizontal:8,
  },
  productName: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  productWeight: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Poppins',
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
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#01615F',
    backgroundColor: '#fff',
  },
  addButtonText: {
    color: '#01615F',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minusButton: {
    backgroundColor: '#01615F',
    padding: 2,
    height: 25,
    width: 25,
    borderRadius: 5,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',
  },
  plusButton: {
    position: 'absolute',
    right: 12,
    top: 3,
    zIndex: 1,
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonText: {
    color: '#01615F',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

export default ProductSearch;
