import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import LocationHeader from "@/components/LocationHeader";
import SearchBarVoice from "@/components/SearchBarVoice";
import Banner from "@/components/Banner";
import FoodMenu from "@/components/FoodMenu";
import FilterButtons from "@/components/FilterButtons";
import RestaurantCard from "@/components/FoodList";
import SuccessToast from "@/components/SuccessToast"; // Import SuccessToast
import restaurantData from "@/JSON DATA/restaurantData.json";
import { useRouter } from "expo-router";

interface Restaurant {
  id: string | number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  location: string;
}

const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(
    restaurantData.restaurants
  );
  const router = useRouter();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [hiddenRestaurants, setHiddenRestaurants] = useState<
    (string | number)[]
  >([]);
  const [toastVisible, setToastVisible] = useState(false); // Lifted state for toast visibility

  const handleFavorite = (id: string | number) => {
    console.log("Added to favorites:", id);
    // Add your favorite logic here
  };

  const handleHide = (id: string | number) => {
    console.log("Hidden restaurant:", id);
    setHiddenRestaurants((prev) => [...prev, id]);
  };

  const handleInputRedirect = () => {
    router.push("/Screens/SearchScreen");
  };

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
      groceryImage: require("../../assets/images/instamart-img.png"),
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
      groceryImage: require("../../assets/images/Img 1.png"),
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
      groceryImage: require("../../assets/images/Img 3.png"),
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <LocationHeader />
      <SearchBarVoice
        onInputPress={handleInputRedirect}
        redirectTargets={["Dishes", "Restaurants", "Groceries"]}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banner
          {...banners[currentBannerIndex]}
          onButtonPress={() => console.log("Button pressed")}
        />
        <FoodMenu />
        <FilterButtons />

        {/* Map through restaurants array to render RestaurantCard */}
        {restaurants
          .filter((restaurant) => !hiddenRestaurants.includes(restaurant.id)) // Filter out hidden restaurants
          .map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onFavorite={handleFavorite}
              onHide={handleHide}
              setToastVisible={setToastVisible} // Pass the toast state setter
            />
          ))}
      </ScrollView>
      {/* Centered Success Toast */}
      <SuccessToast
        visible={toastVisible}
        message="Added to Wishlist Successfully!"
        subMessage="Enjoy your day with your favorite food!"
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default Home;
