import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import * as Font from 'expo-font';

const MealCustomizer = () => {
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

  const items = [
    { id: 1, name: 'Lorem Ipsum', price: '34', image: require('../assets/images/Coke.png') },
    { id: 2, name: 'Lorem Ipsum', price: '34', image: require('../assets/images/Mango.png') },
    { id: 3, name: 'Lorem Ipsum', price: '34', image: require('../assets/images/Banana.png') },
    { id: 4, name: 'Lorem Ipsum', price: '34', image: require('../assets/images/Cake.png') },
  ];

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.productCard}>
        <View>
          <Image source={item.image} style={styles.productImage} />
          <View style={styles.plusIcon}>
            <Text style={styles.plusText}>+</Text>
            {/* Replace with your icon library's component if necessary */}
          </View>
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>
      </View>
    );
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Optionally, show a loading screen or placeholder
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COMPLETE TOUR MEAL</Text>
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
    marginHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    // iOS Shadow (uniform on all sides)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },  // No horizontal or vertical offset, even shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,  // Consistent blur radius
    // Android Shadow
    elevation: 5,  // Set elevation for Android shadow
  },
  
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: 16,
  },
  productList: {
    paddingRight: 16,
  },
  productCard: {
    width: 79,
    height: 130,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    position:'relative',
  },
  productImage: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    borderRadius: 8,
    marginTop:8,
  },
  plusIcon: {
    position: 'absolute',
    top: 1,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor:'#01615F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    color: '#01615F',
    fontSize: 12,
    fontFamily:'Poppins-Regular'
  },
  secondContainer: {},
  productName: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: 14,
    color: '#191A1F',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default MealCustomizer;
