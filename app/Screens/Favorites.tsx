import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
} from "react-native";
import GoBack from "@/components/GoBack";
import FilterButtons from "@/components/FilterButtons";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import RestaurantCard from "@/components/FoodList"; // Corrected import

const Favourites = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const restaurantData = [
    {
      id: 1,
      name: "Pizza Palace",
      image: "https://example.com/pizza.jpg",
      rating: 4.5,
      deliveryTime: "30 min",
      location: "Downtown",
    },
    {
      id: 2,
      name: "Sushi Spot",
      image: "https://example.com/sushi.jpg",
      rating: 4.8,
      deliveryTime: "25 min",
      location: "Uptown",
    },
  ];

  const handleFavorite = (id: number | string) => {
    console.log(`Favorited restaurant with ID: ${id}`);
  };

  const handleHide = (id: number | string) => {
    console.log(`Hidden restaurant with ID: ${id}`);
  };

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Show a loading screen if needed
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      {/* Centered Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/Fav.png")}
          style={styles.mainImage}
        />
      </View>

      {/* Filter Buttons */}
      <FilterButtons />

      {/* Restaurant List */}
      <FlatList
        data={restaurantData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onFavorite={handleFavorite}
            onHide={handleHide}
            setToastVisible={setToastVisible}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
