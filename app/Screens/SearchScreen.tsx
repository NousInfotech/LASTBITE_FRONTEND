import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import GoBack from "@/components/GoBack";
import SearchBarVoice from "@/components/SearchBarVoice";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

interface Restaurant {
  restaurantId: string;
  name: string;
  details: string;
  coverImage: string;
  ratingCount: number;
  ratingAverage: number;
  categories: string[];
  menu: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const SearchScreen = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  const isNewRestaurant = (createdAt: string) => {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const diffInDays =
      (now.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
  };

  const dishes = [
    {
      id: 1,
      name: "Pasta",
      type: "Dish",
      image: "https://via.placeholder.com/32",
    },
    {
      id: 2,
      name: "Burger",
      type: "Dish",
      image: "https://via.placeholder.com/32",
    },
    {
      id: 3,
      name: "Idly",
      type: "Dish",
      image: "https://via.placeholder.com/32",
    },
  ];

  const restaurants: Restaurant[] = [
    {
      restaurantId: "r1",
      name: "The Spice Hub",
      details: "35-45 mins to Westside Park",
      coverImage: "https://via.placeholder.com/500x300",
      ratingCount: 250,
      ratingAverage: 4.5,
      categories: ["Biryani", "North Indian", "Desserts"],
      menu: ["m1", "m2", "m3"],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      restaurantId: "r2",
      name: "Westside Grill",
      details: "35-45 mins to Westside Park",
      coverImage: "https://via.placeholder.com/500x300",
      ratingCount: 250,
      ratingAverage: 4.5,
      categories: ["Biryani", "North Indian", "Desserts"],
      menu: ["m1", "m2", "m3"],
      isActive: true,
      createdAt: "2023-12-15T10:30:00.000Z",
      updatedAt: "2024-01-10T12:00:00.000Z",
    },
    {
      restaurantId: "r3",
      name: "Food Hut",
      details: "35-45 mins to Westside Park",
      coverImage: "https://via.placeholder.com/500x300",
      ratingCount: 250,
      ratingAverage: 4.5,
      categories: ["Biryani", "North Indian", "Desserts"],
      menu: ["m1", "m2", "m3"],
      isActive: true,
      createdAt: "2023-12-15T10:30:00.000Z",
      updatedAt: "2024-01-10T12:00:00.000Z",
    },
  ];

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes((searchText || "").toString().toLowerCase())
  );
  
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes((searchText || "").toString().toLowerCase())
  );
  
  const displayType = searchText.toLowerCase().includes("dish")
    ? "dish"
    : searchText.toLowerCase().includes("restaurant")
    ? "restaurant"
    : "both";

  const handleRestaurantClick = (restaurant: Restaurant) => {
    router.push({
      pathname: "./RestaurantSelect",
      params: { restaurantId: restaurant.restaurantId },
    });
  };

  const handleDishClick = (dish: { id: number; name: string; type: string }) => {
    router.push({
      pathname: "./DishesSearch",
      params: { id: dish.id.toString(), name: dish.name, type: dish.type },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search for Dishes & Restaurants</Text>
      </View>
      <View>
        <SearchBarVoice
          // onInputPress={(text: string) => setSearchText(text)} 
          redirectTargets={["Dishes", "Restaurants"]}
          placeholder="Dishes, restaurants & more"
          onChangeText={(text: string) => setSearchText(text)} 
        />
      </View>
  
      {displayType === "dish" || displayType === "both" ? (
        <>
          {filteredDishes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommendations "Dishes"</Text>
            </View>
          )}
          {filteredDishes.slice(0, 2).map((dish) => (
            <View key={dish.id} style={styles.dishesItem}>
              <View style={styles.dishesLeft}>
                <TouchableOpacity
                  style={styles.dishButton}
                  onPress={() => handleDishClick(dish)}
                >
                  <Image style={styles.dishImage} source={{ uri: dish.image }} />
                </TouchableOpacity>
                <View style={styles.dishesDetails}>
                  <TouchableOpacity onPress={() => handleDishClick(dish)}>
                    <Text style={styles.dishesType}>{dish.name}</Text>
                    <Text style={styles.dishesText}>Dish</Text>
                  
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </>
      ) : null}
  
      {displayType === "restaurant" || displayType === "both" ? (
        <>
          {filteredRestaurants.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommendation "Restaurants"</Text>
            </View>
          )}
          {filteredRestaurants.slice(0, 2).map((restaurant) => (
            <View key={restaurant.restaurantId} style={styles.dishesItem}>
              <View style={styles.dishesLeft}>
                <TouchableOpacity
                  style={styles.dishButton}
                  onPress={() => handleRestaurantClick(restaurant)}
                >
                  <Image
                    style={styles.dishImage}
                    source={{ uri: restaurant.coverImage }}
                  />
                </TouchableOpacity>
                <View style={styles.dishesDetails}>
                  <TouchableOpacity
                    onPress={() => handleRestaurantClick(restaurant)}
                  >
                    <Text style={styles.dishesType}>{restaurant.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.dishesText}>
                    {isNewRestaurant(restaurant.createdAt) && (
                      <Text style={styles.newBadge}>New • </Text>
                    )}
                    {restaurant.details}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </>
      ) : null}
    </SafeAreaView>
  );
  
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: "#929292",
    borderRadius: 8,
    fontFamily: "Poppins-Regular",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  locationOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  locationText: {
    marginLeft: 16,
    color: "#01615F",
    fontSize: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  dishesItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  dishesLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dishButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
  },
  dishImage: {
    width: "100%",
    height: "100%",
  },
  dishesDetails: {
    marginLeft: 16,
    flex: 1,
  },
  dishesType: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  dishesText: {
    fontSize: 10,
    color: "#666",
    marginTop: 1,
    fontFamily: "Poppins-Regular",
  },
  menu: {
    position: "absolute",
    top: 50,
    right: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    zIndex: 10,
  },
  menuOption: {
    padding: 8,
    fontSize: 16,
    color: "#333",
  },
  newBadge: {
    color: "#01615F",
    fontWeight: "bold",
  },
  inlineImage: {
    width: 16, // Adjust as per your design
    height: 16, // Ensure height matches the font size for alignment
    marginRight: 4, // Add spacing between the image and the text
    resizeMode: "contain",
  },
});
