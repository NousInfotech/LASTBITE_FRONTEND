import React from "react";
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

// Define the type for restaurant
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
  createdAt: string; // Timestamp when the restaurant was added
  updatedAt: string; // Timestamp when the restaurant details were last updated
}

const SearchScreen = () => {
  const router = useRouter();

  // Function to check if a restaurant is new
  const isNewRestaurant = (createdAt: string) => {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const diffInDays = (now.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7; // Consider new if added within the last 7 days
  };

  // Dummy data for dishes and restaurants
  const dishes = [
    { id: 1, name: "Pasta", type: "Dish", image: "https://via.placeholder.com/32" },
    { id: 2, name: "Burger", type: "Dish", image: "https://via.placeholder.com/32" },
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
      createdAt: "new Date().toISOString()", // Recently added
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
      createdAt: "2023-12-15T10:30:00.000Z", // Older restaurant
      updatedAt: "2024-01-10T12:00:00.000Z",
    },
  ];

  const handleRestaurantClick = (restaurant: Restaurant) => {
    router.push({
      pathname: "/Screens/RestaurantSelect",
      params: {
        restaurantId: restaurant.restaurantId,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search for Dishes & Restaurants</Text>
      </View>

      {/* Search Bar */}
      <View>
        <SearchBarVoice
          onInputPress={() => {}}
          redirectTargets={["Dishes", "Restaurants"]}
          placeholder="Dishes, restaurants & more"
        />
      </View>

      {/* Dishes Recommendations */}
      <View style={styles.section}>
        <Text style={styles.headerTitle}>Recommended Dishes</Text>
      </View>
      {dishes.map((dish) => (
        <View key={dish.id} style={styles.dishesItem}>
          <View style={styles.dishesLeft}>
            <TouchableOpacity style={styles.dishButton}>
              <Image style={styles.dishImage} source={{ uri: dish.image }} />
            </TouchableOpacity>
            <View style={styles.dishesDetails}>
              <Text style={styles.dishesType}>{dish.name}</Text>
              <Text style={styles.dishesText}>{dish.type}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Restaurant Recommendations */}
      <View style={styles.section}>
        <Text style={styles.headerTitle}>Recommended Restaurants</Text>
      </View>
      {restaurants.map((restaurant) => (
        <View key={restaurant.restaurantId} style={styles.dishesItem}>
          <View style={styles.dishesLeft}>
            <TouchableOpacity
              style={styles.dishButton}
              onPress={() => handleRestaurantClick(restaurant)}
            >
              <Image style={styles.dishImage} source={{ uri: restaurant.coverImage }} />
            </TouchableOpacity>
            <View style={styles.dishesDetails}>
              <TouchableOpacity onPress={() => handleRestaurantClick(restaurant)}>
                <Text style={styles.dishesType}>{restaurant.name}</Text>
              </TouchableOpacity>
              <Text style={styles.dishesText}>
  {isNewRestaurant(restaurant.createdAt) && (
    <Text>
      <Image 
        source={require("../../assets/images/Rating.png")} 
        style={styles.inlineImage} 
      />{" "}
      <Text style={styles.newBadge}>New</Text>
    </Text>
  )}
  {isNewRestaurant(restaurant.createdAt) && " • "}
  {restaurant.details}
</Text>

            </View>
          </View>
        </View>
      ))}
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
    marginLeft: 16,
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: "#929292",
    borderRadius: 8,
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
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
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
    fontSize: 16,
    fontWeight: "500",
  },
  dishesText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
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
