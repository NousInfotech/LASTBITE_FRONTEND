import React from 'react';
import { StatusBar, StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationHeader from '@/components/LocationHeader';
import SearchBarVoice from '@/components/SearchBarVoice';
import HotDeals from '@/components/HotDeals';
import ProductGrid from '@/components/ProductGrid';
import { useRouter } from 'expo-router';


const productData = [
  {
    title: 'Groceries',
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
    title: 'Snacks & Drinks',
    items: [
      { id: '7', name: 'Lorem Ipsum', image: require('../../assets/images/Chips.png') },
      { id: '8', name: 'Lorem Ipsum', image: require('../../assets/images/FreshJuice.png') },
      { id: '9', name: 'Lorem Ipsum', image: require('../../assets/images/Lays.png') },
      { id: '10', name: 'Lorem Ipsum', image: require('../../assets/images/Lays.png') },
      { id: '11', name: 'Lorem Ipsum', image: require('../../assets/images/LaysWavy.png') },
      { id: '12', name: 'Lorem Ipsum', image: require('../../assets/images/Tropicana.png') },
    ],
  },
  {
    title: 'Beauty Products',
    items: [
      { id: '13', name: 'Lorem Ipsum', image: require('../../assets/images/BodyScrub.png') },
      { id: '14', name: 'Lorem Ipsum', image: require('../../assets/images/Centella.png') },
      { id: '15', name: 'Lorem Ipsum', image: require('../../assets/images/SunScreen.png') },
      { id: '16', name: 'Lorem Ipsum', image: require('../../assets/images/SkinCare.png') },
      { id: '17', name: 'Lorem Ipsum', image: require('../../assets/images/Concealer.png') },
      { id: '18', name: 'Lorem Ipsum', image: require('../../assets/images/Foundation.png') },
    ],
  },
];

const SuperMart: React.FC = () => {
  const router = useRouter();

  const handleInputRedirect = () => {
    router.push("/Screens/ProductList");
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Fixed header */}
      <View style={styles.fixedHeader}>
        <LocationHeader />
        <SearchBarVoice
        onInputPress={handleInputRedirect}
        redirectTargets={["Bottles"]}
        placeholder="Search for  'Bottles' "
      />
      </View>

      {/* Scrollable content */}
      <ScrollView style={styles.scrollView}>
        <HotDeals />
        <ProductGrid categories={productData} />
      </ScrollView>
    </View>
  );
};

export default SuperMart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure it is on top of the scrollable content
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  scrollView: {
    marginTop: 140, // Adjust to give space for the fixed header
  },
});
