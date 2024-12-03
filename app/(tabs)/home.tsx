import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import LocationHeader from '@/components/LocationHeader';
import SearchBarVoice from '@/components/SearchBarVoice';
import Banner from '@/components/Banner';
import FoodMenu from '@/components/FoodMenu';
import FilterButtons from '@/components/FilterButtons';

const Home = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const banners = [
    {
      title: "Instamart Essentials",
      subtitle: "Fresh groceries delivered within",
      deliveryTime: "15 minutes.",
      buttonText: "Shop Groceries",
      buttonColor: "#006B4D",
      buttonTextColor: "#FFFFFF",
      backgroundColor: "#E2FFEC",
      titleColor: "#000000",
      subtitleColor: "#4A4A4A",
      groceryImage: require('../../assets/images/instamart-img.png'),
      height: 180,
      borderRadius: 12,
    },
    {
      title: "Craving Something Special?",
      subtitle: "Find popular cuisines and discover",
      deliveryTime: "what you're in the mood for!",
      buttonText: "Explore Cuisines",
      buttonColor: "#FF6347",
      buttonTextColor: "#FFFFFF",
      backgroundColor: "#FFF0E1",
      titleColor: "#333333",
      subtitleColor: "#7D7D7D",
      groceryImage: require('../../assets/images/Img 1.png'),
      height: 180,
      borderRadius: 12,
    },
    {
      title: "Top Picks Around You",
      subtitle: "Order from the trending restaurants",
      deliveryTime: "in your area.",
      buttonText: "Grab a Snack",
      buttonColor: "#FFC107",
      buttonTextColor: "#FFFFFF",
      backgroundColor: "#FFF7E1",
      titleColor: "#333333",
      subtitleColor: "#7D7D7D",
      groceryImage: require('../../assets/images/Img 3.png'),
      height: 180,
      borderRadius: 12,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.home}>
      <LocationHeader />
      <SearchBarVoice />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Section */}
        <Banner {...banners[currentBannerIndex]} onButtonPress={() => console.log("Button pressed")} />
        {/* Food Menu */}
        <FoodMenu />
        <FilterButtons/>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    // paddingHorizontal: 16, 
    paddingBottom: 20, // Add some bottom padding for spacing
  },
});
