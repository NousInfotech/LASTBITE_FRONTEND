import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';


const SavingsCorner = () => {

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


  const handleCouponClick = () => {
    console.log('Apply coupon clicked');
  };

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false}  style={styles.title}>SAVINGS CORNER</Text>
      <TouchableOpacity
        style={styles.couponContainer}
        onPress={handleCouponClick}
        activeOpacity={0.8}
      >
        <View style={styles.couponContent}>
          <Ionicons name="pricetag" size={17} color="#fff" style={styles.icon} />
          <Text allowFontScaling={false}  style={styles.couponText}>Apply Coupon</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginLeft:12,
    marginTop:15,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 14,
    fontFamily:'Poppins-Regular',
    color: '#1A202C',
    marginBottom: 12,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  couponContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
    backgroundColor:'#01615F',
    padding:4,
    borderRadius:5,
  },
  couponText: {
    fontSize: 13,
    color: '#000',
    fontFamily:'Poppins-Regular',
  },
});

export default SavingsCorner;
