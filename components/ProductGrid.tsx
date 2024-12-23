import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import * as Font from 'expo-font';

const windowWidth = Dimensions.get('window').width;

// Define TypeScript interfaces
interface ProductItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

interface Category {
  title: string;
  items: ProductItem[];
}

// Define categories with types
const categories: Category[] = [
  {
    title: 'Groceries',
    items: [
      { id: '1', name: 'Lorem Ipsum', image: require('../assets/images/Orange.png') },
      { id: '2', name: 'Lorem Ipsum', image: require('../assets/images/Broccoli.png') },
      { id: '3', name: 'Lorem Ipsum', image: require('../assets/images/Apple.png') },
      { id: '4', name: 'Lorem Ipsum', image: require('../assets/images/Mixture.png') },
      { id: '5', name: 'Lorem Ipsum', image: require('../assets/images/Pulses.png') },
      { id: '6', name: 'Lorem Ipsum', image: require('../assets/images/QuestNatural.png') },
    ],
  },
  {
    title: 'Snacks & Drinks',
    items: [
      { id: '7', name: 'Lorem Ipsum', image: require('../assets/images/Chips.png') },
      { id: '8', name: 'Lorem Ipsum', image: require('../assets/images/FreshJuice.png') },
      { id: '9', name: 'Lorem Ipsum', image: require('../assets/images/Lays.png') },
      { id: '10', name: 'Lorem Ipsum', image: require('../assets/images/Lays.png') },
      { id: '11', name: 'Lorem Ipsum', image: require('../assets/images/LaysWavy.png') },
      { id: '12', name: 'Lorem Ipsum', image: require('../assets/images/Tropicana.png') },
    ],
  },
  {
    title: 'Beauty Products',
    items: [
      { id: '13', name: 'Lorem Ipsum', image: require('../assets/images/BodyScrub.png') },
      { id: '14', name: 'Lorem Ipsum', image: require('../assets/images/Centella.png') },
      { id: '15', name: 'Lorem Ipsum', image: require('../assets/images/SunScreen.png') },
      { id: '16', name: 'Lorem Ipsum', image: require('../assets/images/SkinCare.png') },
      { id: '17', name: 'Lorem Ipsum', image: require('../assets/images/Concealer.png') },
      { id: '18', name: 'Lorem Ipsum', image: require('../assets/images/Foundation.png') },
    ],
  },
];

const ProductGrid: React.FC = () => {
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

  const renderProductItem = (item: ProductItem) => (
    <TouchableOpacity key={item.id} style={styles.productItem}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} />
      </View>
      <Text style={styles.productName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCategory = (category: Category) => (
    <View key={category.title} style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <View style={styles.productsGrid}>
        {category.items.map((item) => renderProductItem(item))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => renderCategory(category))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    padding: 16,
    paddingVertical:4,
  },
  categoryTitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: (windowWidth - 48) / 3,
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    paddingBottom: 8,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
  },
});

export default ProductGrid;
