import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
  Text,
  PixelRatio
} from "react-native";
import LocationHeader from "@/components/LocationHeader";
import SearchBarVoice from "@/components/SearchBarVoice";
import Banner from "@/components/Banner";
import FoodMenu from "@/components/FoodMenu";
import FilterButtons from "@/components/FilterButtons";
import RestaurantCard from "@/components/FoodList";
import SuccessToast from "@/components/SuccessToast";
import HiddenRestaurant from "@/components/HiddenRestaurant";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize";

// Import API service, data mapper, and interfaces
import { RestaurantApiService } from '@/services/restaurant.service';
import { DataMapper } from '@/utils/DataMapper';
import { IRestaurant, FoodType } from '@/Interfaces/restaurant.interface';

// API Response interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const Home = () => {
  const [restaurantList, setRestaurantList] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [apiError, setApiError] = useState<string | null>(null);
  
  const router = useRouter();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [hiddenRestaurants, setHiddenRestaurants] = useState<string[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [hiddenPopup, setHiddenPopup] = useState<IRestaurant | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<IRestaurant[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Fetch restaurants from API
const fetchRestaurants = async () => {
  console.log('Starting to fetch restaurants from API...');
  setIsLoading(true);
  setApiError(null);
  
  try {
    // If the service returns IRestaurant[] directly, handle it differently
    const apiData = await RestaurantApiService.getAllRestaurants(5, 1);
    console.log('API response received:', apiData);
    
    // Check if it's an array (direct data) or response object
    if (Array.isArray(apiData)) {
      // Service returned data array directly
      console.log('Service returned data array directly');
      const mappedRestaurants = DataMapper.mapIRestaurantsToRestaurants(apiData);
      console.log('Restaurants mapped successfully:', mappedRestaurants);
      
      if (mappedRestaurants.length > 0) {
        setRestaurantList(mappedRestaurants);
        console.log('Restaurant list updated with API data');
      } else {
        console.warn('No restaurants returned from mapping');
        setApiError('No restaurants available');
      }
    } else if (apiData && typeof apiData === 'object' && 'success' in apiData) {
      // Service returned full response object
      console.log('Service returned full response object');
      const apiResponse = apiData as ApiResponse<IRestaurant[]>;
      
      if (apiResponse.success && apiResponse.data && Array.isArray(apiResponse.data)) {
        const mappedRestaurants = DataMapper.mapIRestaurantsToRestaurants(apiResponse.data);
        console.log('Restaurants mapped successfully:', mappedRestaurants);
        
        if (mappedRestaurants.length > 0) {
          setRestaurantList(mappedRestaurants);
          console.log('Restaurant list updated with API data');
        } else {
          console.warn('No restaurants returned from mapping');
          setApiError('No restaurants available');
        }
      } else {
        console.error('Invalid API response structure:', apiResponse);
        setApiError('Invalid response from server');
      }
    } else {
      console.error('Unexpected response format:', apiData);
      setApiError('Unexpected response format from server');
    }
    
  } catch (error) {
    console.error('Error fetching restaurants from API:', error);
    setApiError(error instanceof Error ? error.message : 'Unknown error occurred');
  } finally {
    setIsLoading(false);
    console.log('Finished fetching restaurants');
  }
};

  // Load restaurants on component mount
  useEffect(() => {
    console.log('Home component mounted, fetching restaurants...');
    fetchRestaurants();
  }, []);

  const applyFilters = (filters: string[]) => {
    console.log('Applying filters:', filters);
    setSelectedFilters(filters);

    let filtered = restaurantList.filter((restaurant) => {
      console.log(`Filtering restaurant: ${restaurant.restaurantName}`, {
        typeOfFood: restaurant.typeOfFood,
        rating: restaurant.rating
      });
      
      // Check for food type filters with null/undefined safety
      const typeOfFood = restaurant.typeOfFood || [];
      const hasVeg = typeOfFood.includes(FoodType.VEG);
      const hasNonVeg = typeOfFood.includes(FoodType.NON_VEG);
      const hasVegan = typeOfFood.includes(FoodType.VEGAN);
      const rating = restaurant.rating || 0;
      
      if (filters.includes("Pure Veg") && !hasVeg) {
        console.log(`${restaurant.restaurantName} filtered out: not pure veg`);
        return false;
      }
      if (filters.includes("Non Veg") && !hasNonVeg) {
        console.log(`${restaurant.restaurantName} filtered out: not non-veg`);
        return false;
      }
      if (filters.includes("Vegan") && !hasVegan) {
        console.log(`${restaurant.restaurantName} filtered out: not vegan`);
        return false;
      }
      if (filters.includes("Ratings 4.0+") && rating < 4.0) {
        console.log(`${restaurant.restaurantName} filtered out: rating below 4.0`);
        return false;
      }
      if (filters.includes("Rating 4.5+") && rating < 4.5) {
        console.log(`${restaurant.restaurantName} filtered out: rating below 4.5`);
        return false;
      }
      
      console.log(`${restaurant.restaurantName} passed all filters`);
      return true;
    });

    console.log('Filtered restaurants:', filtered);
    setFilteredRestaurants(filtered);
  };

  // Update filtered restaurants when restaurant list changes
  useEffect(() => {
    console.log('Restaurant list changed, reapplying filters...');
    applyFilters(selectedFilters);
  }, [restaurantList, selectedFilters]);

  const handleFavorite = (id: string | number) => {
    console.log("Added to favorites:", id);
  };

  const handleHide = (restaurantId: string) => {
    console.log("Hidden restaurant:", restaurantId);
    const hiddenRestaurant = restaurantList.find(
      (restaurant) => restaurant.restaurantId === restaurantId
    );
    if (hiddenRestaurant) {
      setHiddenRestaurants((prev) => [...prev, restaurantId]);
      setHiddenPopup(hiddenRestaurant);
    }
  };

  const handleUndo = (restaurantId: string | number) => {
    console.log("Undo hide restaurant:", restaurantId);
    setHiddenRestaurants((prev) => prev.filter((id) => id !== restaurantId));
  };

  const handleInputRedirect = () => {
    console.log("Redirecting to search screen");
    router.push("/Screens/SearchScreen");
  };

  const handleCuisines = () => {
    console.log("Redirecting to dishes search");
    router.push('/Screens/DishesSearch')
  }

  const banners = [
    {
      title: "Supermart Essentials",
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
      title: "Craving  Special?",
      subtitle: "Popular cuisines and discover",
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
      onButtonPress: handleCuisines,
    },
    {
      title: "Top Picks Around You",
      subtitle: "Order from the trending restaurants",
      deliveryTime: "in your area.",
      buttonText: "Order Now",
      buttonColor: "#FFC107",
      buttonTextColor: "#FFFFFF",
      backgroundColor: "#FFF7E1",
      titleColor: "#333333",
      subtitleColor: "#7D7D7D",
      groceryImage: require("../../assets/images/Img 3.png"),
      height: 180,
      borderRadius: 12,
      onButtonPress: handleCuisines,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuSelection = (menuName: string) => {
    console.log("Menu selected:", menuName);
    setSelectedMenu(menuName);
    router.push({
      pathname: "/Screens/DishesSearch",
      params: { name: menuName },
    });
  };

  // Retry function for failed API calls
  const handleRetry = () => {
    fetchRestaurants();
  };

  // Render loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <LocationHeader />
        <SearchBarVoice
          onInputPress={handleInputRedirect}
          redirectTargets={["Dishes", "Restaurants"]}
          placeholder="Dishes, restaurants & more"
          onChangeText={handleMenuSelection}
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading restaurants...</Text>
        </View>
      </View>
    );
  }

  // Render error state
  if (apiError) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <LocationHeader />
        <SearchBarVoice
          onInputPress={handleInputRedirect}
          redirectTargets={["Dishes", "Restaurants"]}
          placeholder="Dishes, restaurants & more"
          onChangeText={handleMenuSelection}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
          <Text style={styles.errorMessage}>{apiError}</Text>
          <Text style={styles.retryButton} onPress={handleRetry}>
            Tap to retry
          </Text>
        </View>
      </View>
    );
  }

  // Render empty state
  if (restaurantList.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <LocationHeader />
        <SearchBarVoice
          onInputPress={handleInputRedirect}
          redirectTargets={["Dishes", "Restaurants"]}
          placeholder="Dishes, restaurants & more"
          onChangeText={handleMenuSelection}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No restaurants available</Text>
          <Text style={styles.emptyMessage}>Check back later for more options</Text>
          <Text style={styles.retryButton} onPress={handleRetry}>
            Tap to refresh
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <LocationHeader />
      <SearchBarVoice
        onInputPress={handleInputRedirect}
        redirectTargets={["Dishes", "Restaurants"]}
        placeholder="Dishes, restaurants & more"
        onChangeText={handleMenuSelection}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Banner
          {...banners[currentBannerIndex]}
          onButtonPress={() => console.log("Banner button pressed")}
        />
        <FoodMenu onSelectMenu={handleMenuSelection} />

        <FilterButtons onFilterChange={applyFilters} />
        
        {/* Debug information - only in development */}
        {__DEV__ && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugText}>
              Total restaurants: {restaurantList.length} | 
              Filtered: {filteredRestaurants.length} | 
              Hidden: {hiddenRestaurants.length}
            </Text>
          </View>
        )}
       // Replace this entire section in home.tsx:
{filteredRestaurants
  .filter(
    (restaurant) => !hiddenRestaurants.includes(restaurant.restaurantId || '')
  )
  .map((restaurant) => {
    // Convert IRestaurant to the format expected by RestaurantCard
    const restaurantCardData = {
      restaurantId: restaurant.restaurantId || '',
      name: restaurant.restaurantName || 'Unknown Restaurant',
      details: restaurant.cuisines?.join(', ') || 'Restaurant',
      coverImage: restaurant.profilePhoto || 'https://www.seasonsandsuppers.ca/wp-content/uploads/2019/10/slow-cooker-pulled-pork-1200.jpg',
      rating: restaurant.rating || 0,
      ratingCount: 100,
      deliveryTime: '30-45 mins',
      categories: restaurant.availableCategories || restaurant.cuisines || ['Restaurant'],
      menu: ['m1'],
      veg: restaurant.typeOfFood?.includes(FoodType.VEG) || false,
      nonVeg: restaurant.typeOfFood?.includes(FoodType.NON_VEG) || false,
      vegan: restaurant.typeOfFood?.includes(FoodType.VEGAN) || false,
      ratingAverage: restaurant.rating || 0,
      isActive: restaurant.isActive !== false,
      createdAt: restaurant.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: restaurant.updatedAt?.toISOString() || new Date().toISOString(),
    };

    return (
      <RestaurantCard
        key={restaurant.restaurantId}
        restaurant={restaurantCardData}
        onFavorite={handleFavorite}
        onHide={handleHide}
        setToastVisible={setToastVisible}
        onPress={() => {
          console.log("Restaurant card pressed:", restaurant.restaurantId);
          router.push({
            pathname: "/Screens/RestaurantSelect",
            params: { restaurantId: restaurant.restaurantId || '' },
          });
        }}
        isUnavailable={(restaurant.availableCategories?.length || 0) === 0}
      />
    );
  })}
      </ScrollView>
      <SuccessToast
        visible={toastVisible}
        message="Added to Wishlist Successfully!"
        subMessage="Enjoy your day with your favorite food!"
        onHide={() => setToastVisible(false)}
      />

      <Modal
        transparent
        animationType="fade"
        visible={!!hiddenPopup}
        onRequestClose={() => setHiddenPopup(null)}
      >
        <View style={styles.modalCentered}>
          {hiddenPopup && (
            <HiddenRestaurant
              restaurant={{
                id: hiddenPopup.restaurantId || '',
                name: hiddenPopup.restaurantName || 'Unknown Restaurant',
              }}
              onClose={() => setHiddenPopup(null)}
              onUndo={handleUndo}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  selectedText: {
    marginTop: 20,
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  debugContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 16,
    borderRadius: 5,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});