import React, { useState } from 'react';
import { View, Text,StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import GoBack from '@/components/GoBack';
import ProductSearch from '../../components/ProductSearch';  // Import the ProductSearch component
import ProductGrid from '@/components/ProductGrid';  // Assuming ProductGrid is another component
import SearchBarVoice from '@/components/SearchBarVoice';
import HotDeals from '@/components/HotDeals';
import ProductGridScrollView from '@/components/ProductGridScrollView';

type Product = {
  id: string;
  name: string;
  weight: string;
  price: string;
  image: any; // Use `ImageSourcePropType` if you want stricter type-checking
};

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const productData = [
    {
      title: 'Popular Searches',
      items: [
        { id: '1', name: 'Lorem Ipsum', image: require('../../assets/images/Orange.png') },
        { id: '2', name: 'Lorem Ipsum', image: require('../../assets/images/Broccoli.png') },
        { id: '3', name: 'Lorem Ipsum', image: require('../../assets/images/Apple.png') },
        { id: '4', name: 'Lorem Ipsum', image: require('../../assets/images/Mixture.png') },
        { id: '5', name: 'Lorem Ipsum', image: require('../../assets/images/Pulses.png') },
        { id: '6', name: 'Lorem Ipsum', image: require('../../assets/images/QuestNatural.png') },
      ],
    },
    {
      title: 'Discover More',
      items: [
        { id: '7', name: 'Lorem Ipsum', image: require('../../assets/images/Chips.png') },
        { id: '8', name: 'Lorem Ipsum', image: require('../../assets/images/FreshJuice.png') },
        { id: '9', name: 'Lorem Ipsum', image: require('../../assets/images/Lays.png') },
        { id: '10', name: 'Lorem Ipsum', image: require('../../assets/images/Lays.png') },
        { id: '11', name: 'Lorem Ipsum', image: require('../../assets/images/LaysWavy.png') },
        { id: '12', name: 'Lorem Ipsum', image: require('../../assets/images/Tropicana.png') },
      ],
    },
   
  ];
  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed header */}
      <View style={styles.fixedHeader}>
        <GoBack />
        <Text style={styles.headerTitle}>Search groceries and essentials</Text>
      </View>
      
      {/* Fixed SearchBar */}
      <View style={styles.fixedSearchBar}>
        <SearchBarVoice />
      </View>

      {/* Scrollable content */}
      <ScrollView style={styles.scrollView}>
        <ProductSearch />
        <ProductGridScrollView categories={productData} />
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
    paddingTop: 10, // Adjust for status bar height
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',   
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    
  },
  fixedSearchBar: {
    position: 'absolute',
    top: 60, // Adjust to align under the header
    left: 0,
    right: 0,
    zIndex: 5,
    backgroundColor: '#fff',
 
    paddingBottom: 10,
  },
  scrollView: {
    marginTop: 120, // Adjust for both header and search bar height
  },
});

export default ProductList;
