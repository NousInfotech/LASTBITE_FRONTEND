import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import GoBack from '@/components/GoBack';
import ProductSearch from './ProductSearch';
import ProductGridScrollView from '@/components/ProductGridScrollView';
import SearchBarVoice from '@/components/SearchBarVoice';
import { RFPercentage } from 'react-native-responsive-fontsize';

type Product = {
  id: string;
  name: string;
  image: any;
};

type ProductCategory = {
  title: string;
  items: Product[];
};

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState('');
 

  const productData: ProductCategory[] = [
    {
      title: 'Popular Searches',
      items: [
        { id: '1', name: 'Orange', image: require('../../assets/images/Orange.png') },
        { id: '2', name: 'Broccoli', image: require('../../assets/images/Broccoli.png') },
        { id: '3', name: 'Apple', image: require('../../assets/images/Apple.png') },
        { id: '4', name: 'Mixture', image: require('../../assets/images/Mixture.png') },
        { id: '5', name: 'Pulses', image: require('../../assets/images/Pulses.png') },
        { id: '6', name: 'Quest Natural', image: require('../../assets/images/QuestNatural.png') },
      ],
    },
    {
      title: 'Discover More',
      items: [
        { id: '7', name: 'Chips', image: require('../../assets/images/Chips.png') },
        { id: '8', name: 'Fresh Juice', image: require('../../assets/images/FreshJuice.png') },
        { id: '9', name: 'Lays Classic', image: require('../../assets/images/Lays.png') },
        { id: '10', name: 'Lays Flavor', image: require('../../assets/images/Lays.png') },
        { id: '11', name: 'Lays Wavy', image: require('../../assets/images/LaysWavy.png') },
        { id: '12', name: 'Tropicana', image: require('../../assets/images/Tropicana.png') },
      ],
    },
  ];

  const [filteredProductData, setFilteredProductData] = useState<ProductCategory[]>(productData);
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (text.trim() === '') {
      // If search query is empty, show all products
      setFilteredProductData(productData);
      return;
    }

    // Filter products across all categories
    const filtered = productData.map(category => ({
      ...category,
      items: category.items.filter(product => 
        product.name.toLowerCase().includes(text.toLowerCase())
      )
    })).filter(category => category.items.length > 0);

    setFilteredProductData(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed header */}
      <View style={styles.fixedHeader}>
        <GoBack />
        <Text style={styles.headerTitle}>Search groceries and essentials</Text>
      </View>
      
      {/* Fixed SearchBar */}
      <View style={styles.fixedSearchBar}>
        <SearchBarVoice
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Scrollable content */}
      <ScrollView style={styles.scrollView}>
        <ProductSearch />
        <ProductGridScrollView categories={filteredProductData} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',   
  },
  headerTitle: {
    fontSize: RFPercentage(2),
    fontWeight: '500',
    marginLeft: 16,
  },
  fixedSearchBar: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 5,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  scrollView: {
    marginTop: 120,
  },
});

export default ProductList;