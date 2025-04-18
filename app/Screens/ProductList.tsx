import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';



export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState('Fruits');
  const router = useRouter();
  
  // Sample data for grocery items
  const groceryItems = [
    { id: '1', name: 'Lorem ipsum', image: require('../../assets/images/Orange.png'), price: '$2.99' },
    { id: '2', name: 'Lorem ipsum', image: require('../../assets/images/Broccoli.png'), price: '$3.49' },
    { id: '3', name: 'Lorem ipsum', image: require('../../assets/images/Apple.png'), price: '$1.99' },
    { id: '4', name: 'Lorem ipsum', image: require('../../assets/images/Orange.png'), price: '$2.99' },
    { id: '5', name: 'Lorem ipsum', image: require('../../assets/images/Broccoli.png'), price: '$3.49' },
    { id: '6', name: 'Lorem ipsum', image: require('../../assets/images/Apple.png'), price: '$1.99' },
    { id: '7', name: 'Lorem ipsum', image: require('../../assets/images/Orange.png'), price: '$2.99' },
    { id: '8', name: 'Lorem ipsum', image: require('../../assets/images/Broccoli.png'), price: '$3.49' },
    { id: '9', name: 'Lorem ipsum', image: require('../../assets/images/Apple.png'), price: '$1.99' },
    { id: '10', name: 'Lorem ipsum', image: require('../../assets/images/Orange.png'), price: '$2.99' },
    { id: '11', name: 'Lorem ipsum', image: require('../../assets/images/Broccoli.png'), price: '$3.49' },
    { id: '12', name: 'Lorem ipsum', image: require('../../assets/images/Apple.png'), price: '$1.99' },
    { id: '13', name: 'Lorem ipsum', image: require('../../assets/images/Orange.png'), price: '$2.99' },
    { id: '14', name: 'Lorem ipsum', image: require('../../assets/images/Broccoli.png'), price: '$3.49' },
    { id: '15', name: 'Lorem ipsum', image: require('../../assets/images/Apple.png'), price: '$1.99' },
  ];

  const handleProductDetails = () => {
    router.push('/Screens/ProductDetails');
  };

  const renderGroceryItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemImageContainer}>
      <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={16} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProductDetails}>
        <Image 
          source={item.image} 
          style={styles.itemImage} 
          onError={(e) => console.log("Image loading error:", e.nativeEvent.error)}
        />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search groceries and essentials.</Text>
      </View>
      
       <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for items"
        />
        <TouchableOpacity>
          <Ionicons name="close" size={20} color="gray" style={styles.clearIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="filter" size={20} color="#01615F" style={styles.filterIcon} />
        </TouchableOpacity>
        
      </View> 
      
      
      <FlatList
        data={groceryItems}
        renderItem={renderGroceryItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 30,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 36,
    marginRight: 8,
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 26,
    zIndex: 1,
  },
  clearIcon: {
    marginHorizontal: 8,
  },
  filterIcon: {
    marginLeft: 4,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  itemContainer: {
    flex: 1/3,
    padding: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  addButton: {
    position: 'absolute',
    right: 8,
    backgroundColor: '#01615F',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
});
