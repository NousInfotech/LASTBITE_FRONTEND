import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import Header from "@/components/GoBack";
import SearchBarVoice from "@/components/SearchBarVoice";
import { RFPercentage } from "react-native-responsive-fontsize";
import { RestaurantApiService } from "@/services/restaurant.service";
import { DataMapper } from "@/utils/DataMapper";
import { FoodItemApiService } from "@/services/foodItemApi.service";
import { IRestaurant } from "@/Interfaces/restaurant.interface";

const MINIMUM_RATING = 4.2;

const SearchScreen = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch restaurants
        const apiRestaurants = await RestaurantApiService.getAllRestaurants();
        const mappedRestaurants = DataMapper.mapIRestaurantsToRestaurants(apiRestaurants);
        
        // Filter restaurants with rating >= 4.2 and sort by rating
        const filteredRestaurants = mappedRestaurants.filter(restaurant => {
          const rating = restaurant.rating || 0;
          return rating >= MINIMUM_RATING;
        });
        const sortedRestaurants = filteredRestaurants.sort((a, b) => {
          const ratingA = a.rating || 0;
          const ratingB = b.rating || 0;
          return ratingB - ratingA;
        });
        setRestaurants(sortedRestaurants);
        
        // Get restaurant IDs that meet the rating criteria
        const qualifiedRestaurantIds = sortedRestaurants.map(r => r.restaurantId);
        
        console.log('Qualified restaurants:', sortedRestaurants.length);
        console.log('Qualified restaurant IDs:', qualifiedRestaurantIds);
        
        // Fetch food items for dishes
        const apiFoodItems = await FoodItemApiService.getAllFoodItems();
        console.log('Total food items:', apiFoodItems.length);
        
        // Filter dishes that are available in qualified restaurants AND have rating >= 4.2
        const availableDishes = apiFoodItems.filter(item => {
          const rating = item.rating || 0;
          // Check if dish is available in any qualified restaurant using restaurantId
          const isAvailableInQualifiedRestaurant = qualifiedRestaurantIds.includes(item.restaurantId);
          
          return rating >= MINIMUM_RATING && isAvailableInQualifiedRestaurant && item.isAvailable !== false;
        });

        console.log('Available dishes after filtering:', availableDishes.length);

        const mappedDishes = availableDishes.map(item => ({
          id: item.foodItemId,
          name: item.name,
          type: "Dish",
          image: item.image || "https://via.placeholder.com/32",
          rating: item.rating || 0,
          restaurantId: item.restaurantId
        }));

        // Sort dishes by rating
        const sortedDishes = mappedDishes.sort((a, b) => b.rating - a.rating);
        setDishes(sortedDishes);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isNewRestaurant = (createdAt?: Date) => {
    if (!createdAt) return false;
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const diffInDays = (now.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 7;
  };

  // Filter search results while maintaining the 4.2+ rating requirement
  const filteredDishes = dishes.filter(dish => 
    dish.name.toLowerCase().includes(searchText.toLowerCase()) && 
    dish.rating >= MINIMUM_RATING
  );

  const filteredRestaurants = restaurants.filter(restaurant => {
    const rating = restaurant.rating || 0;
    return restaurant.restaurantName.toLowerCase().includes(searchText.toLowerCase()) && 
           rating >= MINIMUM_RATING;
  });

  const displayType = searchText.toLowerCase().includes("dish") 
    ? "dish" 
    : searchText.toLowerCase().includes("restaurant") 
    ? "restaurant" 
    : "both";

  const handleRestaurantClick = (restaurant: IRestaurant) => {
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
  
       <Header title="Search for Dishes & Restaurants"/>
      <SearchBarVoice
        redirectTargets={["Dishes", "Restaurants"]}
        placeholder="Dishes, restaurants & more"
        onChangeText={setSearchText}
      />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Debug Info - Remove this after testing */}
        <View style={styles.debugContainer}>
          <Text style={styles.debugText}>
            Debug: Restaurants: {restaurants.length}, Dishes: {dishes.length}
          </Text>
        </View>

        {/* Show message when no data is available */}
        {restaurants.length === 0 && dishes.length === 0 && !loading && (
          <View style={styles.section}>
            <Text allowFontScaling={false} style={styles.noResultsText}>
              No restaurants or dishes found with 4.2+ rating
            </Text>
          </View>
        )}

      {/* Dishes Section - Show only when no search text - REMOVED .slice(0, 2) */}
      {(!searchText || searchText.trim() === '') && dishes.length > 0 && (
        <View style={styles.section}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>
            Recommendations "Dishes" (4.2+ ⭐) - {dishes.length} available
          </Text>
          {dishes.map(dish => (
            <View key={dish.id} style={styles.dishesItem}>
              <View style={styles.dishesLeft}>
                <TouchableOpacity style={styles.dishButton} onPress={() => handleDishClick(dish)}>
                  <Image style={styles.dishImage} source={{ uri: dish.image }} />
                </TouchableOpacity>
                <View style={styles.dishesDetails}>
                  <TouchableOpacity onPress={() => handleDishClick(dish)}>
                    <Text allowFontScaling={false} style={styles.dishesType}>{dish.name}</Text>
                    <Text allowFontScaling={false} style={styles.dishesText}>
                      Dish • ⭐ {dish.rating.toFixed(1)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Filtered Dishes Section - REMOVED .slice(0, 2) */}
      {(displayType === "dish" || displayType === "both") && searchText.trim() !== '' && filteredDishes.length > 0 && (
        <View style={styles.section}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>
            Dishes (4.2+ ⭐) - {filteredDishes.length} found
          </Text>
          {filteredDishes.map(dish => (
            <View key={dish.id} style={styles.dishesItem}>
              <View style={styles.dishesLeft}>
                <TouchableOpacity style={styles.dishButton} onPress={() => handleDishClick(dish)}>
                  <Image style={styles.dishImage} source={{ uri: dish.image }} />
                </TouchableOpacity>
                <View style={styles.dishesDetails}>
                  <TouchableOpacity onPress={() => handleDishClick(dish)}>
                    <Text allowFontScaling={false} style={styles.dishesType}>{dish.name}</Text>
                    <Text allowFontScaling={false} style={styles.dishesText}>
                      Dish • ⭐ {dish.rating.toFixed(1)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Restaurants Section - Show only when no search text - REMOVED .slice(0, 2) */}
      {(!searchText || searchText.trim() === '') && restaurants.length > 0 && (
        <View style={styles.section}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>
            Recommendation "Restaurants" (4.2+ ⭐) - {restaurants.length} available
          </Text>
          {restaurants.map(restaurant => {
            const rating = restaurant.rating || 0;
            return (
              <View key={restaurant.restaurantId} style={styles.dishesItem}>
                <View style={styles.dishesLeft}>
                  <TouchableOpacity 
                    style={styles.dishButton} 
                    onPress={() => handleRestaurantClick(restaurant)}
                  >
                    <Image style={styles.dishImage} source={{ uri: restaurant.profilePhoto || "https://via.placeholder.com/50" }} />
                  </TouchableOpacity>
                  <View style={styles.dishesDetails}>
                    <TouchableOpacity onPress={() => handleRestaurantClick(restaurant)}>
                      <Text allowFontScaling={false} style={styles.dishesType}>{restaurant.restaurantName}</Text>
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.dishesText}>
                      {isNewRestaurant(restaurant.createdAt) && (
                        <Text allowFontScaling={false} style={styles.newBadge}>New • </Text>
                      )}
                      Restaurant • ⭐ {rating.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Filtered Restaurants Section - REMOVED .slice(0, 2) */}
      {(displayType === "restaurant" || displayType === "both") && searchText.trim() !== '' && filteredRestaurants.length > 0 && (
        <View style={styles.section}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>
            Restaurants (4.2+ ⭐) - {filteredRestaurants.length} found
          </Text>
          {filteredRestaurants.map(restaurant => {
            const rating = restaurant.rating || 0;
            return (
              <View key={restaurant.restaurantId} style={styles.dishesItem}>
                <View style={styles.dishesLeft}>
                  <TouchableOpacity 
                    style={styles.dishButton} 
                    onPress={() => handleRestaurantClick(restaurant)}
                  >
                    <Image style={styles.dishImage} source={{ uri: restaurant.profilePhoto || "https://via.placeholder.com/50" }} />
                  </TouchableOpacity>
                  <View style={styles.dishesDetails}>
                    <TouchableOpacity onPress={() => handleRestaurantClick(restaurant)}>
                      <Text allowFontScaling={false} style={styles.dishesType}>{restaurant.restaurantName}</Text>
                    </TouchableOpacity>
                    <Text allowFontScaling={false} style={styles.dishesText}>
                      {isNewRestaurant(restaurant.createdAt) && (
                        <Text allowFontScaling={false} style={styles.newBadge}>New • </Text>
                      )}
                      Restaurant • ⭐ {rating.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* No Results Message */}
      {searchText.trim() !== '' && filteredDishes.length === 0 && filteredRestaurants.length === 0 && (
        <View style={styles.section}>
          <Text allowFontScaling={false} style={styles.noResultsText}>
            No dishes or restaurants found with 4.2+ rating matching "{searchText}"
          </Text>
        </View>
      )}
      </ScrollView>
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
    fontSize: RFPercentage(2),
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
    fontSize: RFPercentage(2),
  },
  locationOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  locationText: {
    marginLeft: 16,
    color: "#01615F",
    fontSize: RFPercentage(2),
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
    fontSize: RFPercentage(1.3),
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
    fontSize: RFPercentage(2),
    color: "#333",
  },
  newBadge: {
    color: "#01615F",
    fontWeight: "bold",
  },
  inlineImage: {
    width: 16,
    height: 16,
    marginRight: 4,
    resizeMode: 'contain'
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: RFPercentage(1.8),
    color: "#666",
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  debugContainer: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    fontFamily: "Poppins-Regular",
  },
});