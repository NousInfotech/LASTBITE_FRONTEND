import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import RestaurantCard from "./Foods";
import { useRouter } from "expo-router";
import { isRestaurantHidden, Restaurant } from "@/utils/RestaurantStorage";

// This is a placeholder for fetching restaurants from your API
const fetchRestaurants = async (): Promise<Restaurant[]> => {
  // Replace with your actual API call
  return [
    {
      restaurantId: "1",
      name: "Pizza Palace",
      details: "Italian cuisine",
      coverImage: "https://example.com/pizza.jpg",
      ratingCount: 120,
      ratingAverage: 4.5,
      categories: ["Italian", "Pizza"],
      menu: ["Pizza", "Pasta"],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

const RestaurantList = () => {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);

  const loadRestaurants = async () => {
    setLoading(true);
    try {
      const allRestaurants = await fetchRestaurants();
      setRestaurants(allRestaurants);
      
      // Filter out hidden restaurants
      const visible = await filterHiddenRestaurants(allRestaurants);
      setFilteredRestaurants(visible);
    } catch (error) {
      console.error("Error loading restaurants:", error);
    }
    setLoading(false);
  };

  const filterHiddenRestaurants = async (restaurantList: Restaurant[]) => {
    const filtered = [];
    for (const restaurant of restaurantList) {
      const hidden = await isRestaurantHidden(restaurant.restaurantId);
      if (!hidden) {
        filtered.push(restaurant);
      }
    }
    return filtered;
  };

  const handleFavorite = (id: string) => {
    console.log(`Favorited restaurant with ID: ${id}`);
  };

  const handleHide = async (id: string) => {
    // After hiding, refresh the list
    setFilteredRestaurants(filteredRestaurants.filter(r => r.restaurantId !== id));
  };

  const handlePress = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={filteredRestaurants}
      keyExtractor={(item) => item.restaurantId}
      renderItem={({ item }) => (
        <RestaurantCard
          restaurant={item}
          onFavorite={handleFavorite}
          onHide={handleHide}
          setToastVisible={setToastVisible}
          onPress={handlePress}
        />
      )}
    />
  );
};

export default RestaurantList;