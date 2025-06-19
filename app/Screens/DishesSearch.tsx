import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import Header from "@/components/GoBack";
import { Ionicons } from "@expo/vector-icons";
import SearchBarVoice from "@/components/SearchBarVoice";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFPercentage } from "react-native-responsive-fontsize";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import { IRestaurant } from "@/Interfaces/restaurant.interface";
import { IFoodItem } from "@/Interfaces/foodItem.interface";
import { RestaurantApiService } from "@/services/restaurant.service";
import { FoodItemApiService } from "@/services/foodItemApi.service";

// Define the types for the query params
interface DishesSearchParams {
  id?: string;
  name?: string;
  type?: string;
  existingCart?: string;
  fromCheckout?: string;
}

interface CheckoutPopupProps {
  totalItems: number;
  onCheckout: () => void;
}

// Updated MenuItem interface to match IFoodItem
interface MenuItem {
  foodItemId: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  restaurantId: string;
  image: string;
  isAvailable: boolean;
  typeOfFood: string[];
  tags?: string[];
  rating?: number;
  ratingCount?: number;
}

const CheckoutPopup: React.FC<CheckoutPopupProps> = ({
  totalItems,
  onCheckout,
}) => {
  return (
    <View style={styles.popupContainer}>
      <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
        <Text allowFontScaling={false} style={styles.checkoutText}>
          {`Checkout ${totalItems} item${totalItems > 1 ? "s" : ""}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DishesSearch: React.FC = () => {
  const params = useLocalSearchParams();
  const { id, name, type, existingCart, fromCheckout } = params as DishesSearchParams;
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [cartCounts, setCartCounts] = useState<Record<string, number>>({});
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFromCheckout, setIsFromCheckout] = useState(false);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data from API
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Loading restaurants and menu items...');
        
        // Load restaurants
        const restaurantsData = await RestaurantApiService.getAllRestaurants();
        console.log('Loaded restaurants:', restaurantsData);
        setRestaurants(restaurantsData);
        
        // Load all food items
        const foodItemsData = await FoodItemApiService.getAllFoodItems();
        console.log('Loaded food items:', foodItemsData);
        
        // Convert IFoodItem to MenuItem format
        const convertedMenuItems: MenuItem[] = foodItemsData.map((item: IFoodItem) => ({
          foodItemId: item.foodItemId || '',
          name: item.name,
          description: item.description || '',
          price: item.price,
          discountPrice: item.discountPrice,
          category: item.category || 'General',
          restaurantId: item.restaurantId,
          image: item.image || 'https://via.placeholder.com/150',
          isAvailable: item.isAvailable !== false,
          typeOfFood: item.typeOfFood || [],
          tags: item.tags || [],
          rating: item.rating,
          ratingCount: item.ratingCount,
        }));
        
        setMenuItems(convertedMenuItems);
        console.log('Converted menu items:', convertedMenuItems);
        
      } catch (error) {
        console.error('Error loading initial data:', error);
        setError('Failed to load restaurants and menu items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Parse existing cart if available
  useEffect(() => {
    if (existingCart) {
      try {
        const parsedCart = JSON.parse(existingCart);
        if (Array.isArray(parsedCart)) {
          const newCartCounts: Record<string, number> = {};
          
          parsedCart.forEach((item: any) => {
            // Check if foodItemId exists, otherwise try to find by name
            if (item.foodItemId) {
              newCartCounts[item.foodItemId] = item.quantity;
            } else if (item.menuItemId) {
              // Handle legacy menuItemId
              newCartCounts[item.menuItemId.toString()] = item.quantity;
            } else if (item.name) {
              // Try to find the menu item by name
              const menuItem = menuItems.find(mi => 
                mi.name.toLowerCase() === item.name?.toLowerCase()
              );
              if (menuItem) {
                newCartCounts[menuItem.foodItemId] = item.quantity;
              }
            }
          });
          
          setCartCounts(newCartCounts);
        }
      } catch (error) {
        console.error("Error parsing existing cart:", error);
      }
    }
    
    // Check if coming from checkout
    if (fromCheckout === "true") {
      setIsFromCheckout(true);
    }
  }, [existingCart, fromCheckout, menuItems]);

  // Calculate total items in cart
  const totalItemsInCart = Object.values(cartCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("./../../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Medium": require("./../../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-SemiBold": require("./../../assets/fonts/Poppins-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };
    loadFonts();
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [item.foodItemId]: (prevCounts[item.foodItemId] || 0) + 1,
    }));
    setModalVisible(false); // Close modal after adding to cart
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [item.foodItemId]: Math.max((prevCounts[item.foodItemId] || 0) - 1, 0),
    }));
  };

  const handleViewDetails = (item: MenuItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleCheckout = () => {
    const selectedItems = Object.entries(cartCounts)
      .filter(([_, quantity]) => quantity > 0)
      .map(([foodItemId, quantity]) => {
        const menuItem = menuItems.find(
          (item) => item.foodItemId === foodItemId
        );
        return {
          foodItemId: foodItemId,
          menuItemId: foodItemId, // For backward compatibility
          name: menuItem?.name,
          quantity,
          price: menuItem?.discountPrice || menuItem?.price,
          category: menuItem?.category,
        };
      });

    const firstItemId = Object.keys(cartCounts).find(
      (foodItemId: string) => cartCounts[foodItemId] > 0
    );
    const restaurantId = firstItemId
      ? menuItems.find((item) => item.foodItemId === firstItemId)
          ?.restaurantId
      : undefined;

    const restaurant = restaurantId
      ? restaurants.find((rest) => rest.restaurantId === restaurantId)
      : undefined;

    if (restaurant) {
      router.push({
        pathname: "./BillingScreen",
        params: {
          restaurantId: restaurant.restaurantId,
          restaurantName: restaurant.restaurantName,
          cart: JSON.stringify(selectedItems),
        },
      });
    } else {
      console.error("No matching restaurant found for the selected items.");
    }
  };

  const filterMenuItems = (searchQuery: string): Record<string, MenuItem[]> => {
    const grouped: Record<string, MenuItem[]> = {};

    const searchTerm =
      searchQuery.toLowerCase() || (name ? name.toLowerCase() : "");

    if (!searchTerm) {
      // If no search term, return all items grouped by restaurant
      menuItems.forEach((menuItem) => {
        if (!grouped[menuItem.restaurantId]) {
          grouped[menuItem.restaurantId] = [];
        }
        grouped[menuItem.restaurantId].push(menuItem);
      });
      return grouped;
    }

    // Search in restaurant names
    const matchingRestaurants = restaurants.filter((restaurant) =>
      restaurant.restaurantName.toLowerCase().includes(searchTerm)
    );

    matchingRestaurants.forEach((restaurant) => {
      const restaurantMenuItems = menuItems.filter(
        (item) => item.restaurantId === restaurant.restaurantId && item.isAvailable
      );
      if (restaurantMenuItems.length > 0) {
        grouped[restaurant.restaurantId!] = restaurantMenuItems;
      }
    });

    // Search in menu item names, descriptions, and tags
    menuItems.forEach((menuItem) => {
      if (
        menuItem.isAvailable && (
          menuItem.name.toLowerCase().includes(searchTerm) ||
          menuItem.description?.toLowerCase().includes(searchTerm) ||
          menuItem.category?.toLowerCase().includes(searchTerm) ||
          menuItem.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
        )
      ) {
        if (!grouped[menuItem.restaurantId]) {
          grouped[menuItem.restaurantId] = [];
        }
        if (
          !grouped[menuItem.restaurantId].some(
            (item) => item.foodItemId === menuItem.foodItemId
          )
        ) {
          grouped[menuItem.restaurantId].push(menuItem);
        }
      }
    });

    return grouped;
  };

  const renderRestaurantSection = (
    restaurantId: string,
    menuItems: MenuItem[]
  ) => {
    const restaurant = restaurants.find(
      (rest) => rest.restaurantId === restaurantId
    );
    if (!restaurant) return null;

    const navigateToAddMoreItems = () => {
      router.push({
        pathname: "/Screens/RestaurantSelect",
        params: {
          restaurantId,
          restaurantName: restaurant.restaurantName,
        },
      });
    };

    return (
      <View style={styles.restaurantSection} key={restaurantId}>
        <View style={styles.restaurantHeader}>
          <Text allowFontScaling={false} style={styles.restaurantName}>
            {restaurant.restaurantName}
          </Text>
          <TouchableOpacity onPress={navigateToAddMoreItems}>
            <Ionicons name="arrow-forward-outline" size={18} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.restaurantSubContainer}>
          <Text allowFontScaling={false} style={styles.restaurantSub}>
            {restaurant.rating || '4.0'}
          </Text>
          <Image
            source={require("./../../assets/images/Star.png")}
            style={styles.starIcon}
          />
          <Text allowFontScaling={false} style={styles.headerLocation}>
            {restaurant.address?.street || restaurant.address?.city || 'Location not available'}
          </Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {menuItems.map((item) => (
            <View style={styles.menuCard} key={item.foodItemId}>
              <View style={styles.leftSection}>
                <Text allowFontScaling={false} style={styles.menuName}>{item.name}</Text>
                <Text allowFontScaling={false} style={styles.menuCategory}>{item.category}</Text>
                <View style={styles.priceContainer}>
                  {item.discountPrice && item.discountPrice < item.price ? (
                    <>
                      <Text allowFontScaling={false} style={styles.discountPrice}>
                        ${item.discountPrice.toFixed(2)}
                      </Text>
                      <Text allowFontScaling={false} style={styles.originalPrice}>
                        ${item.price.toFixed(2)}
                      </Text>
                    </>
                  ) : (
                    <Text allowFontScaling={false} style={styles.menuPrice}>
                      ${item.price.toFixed(2)}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.viewDetailsButton}
                  onPress={() => handleViewDetails(item)}
                >
                  <Text allowFontScaling={false} style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rightSection}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.menuImage}
                    source={{ uri: item.image }}
                  />
                </View>
                <View style={styles.addButtonContainer}>
                  {cartCounts[item.foodItemId] ? (
                    <View style={styles.counterContainer}>
                      <TouchableOpacity
                        style={styles.minusButton}
                        onPress={() => handleRemoveFromCart(item)}
                      >
                        <Text allowFontScaling={false} style={styles.ButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text allowFontScaling={false} style={styles.counterText}>
                        {cartCounts[item.foodItemId]}
                      </Text>
                      <TouchableOpacity
                        style={styles.plusButton}
                        onPress={() => handleAddToCart(item)}
                      >
                        <Text allowFontScaling={false} style={styles.ButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => handleAddToCart(item)}
                    >
                      <Text allowFontScaling={false} style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  if (!fontsLoaded || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text allowFontScaling={false} style={styles.loadingText}>
            {!fontsLoaded ? "Loading Fonts..." : "Loading Restaurants and Menu Items..."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text allowFontScaling={false} style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              setLoading(true);
              // Trigger reload by calling the useEffect again
              const loadInitialData = async () => {
                try {
                  const [restaurantsData, foodItemsData] = await Promise.all([
                    RestaurantApiService.getAllRestaurants(),
                    FoodItemApiService.getAllFoodItems()
                  ]);
                  
                  setRestaurants(restaurantsData);
                  
                  const convertedMenuItems: MenuItem[] = foodItemsData.map((item: IFoodItem) => ({
                    foodItemId: item.foodItemId || '',
                    name: item.name,
                    description: item.description || '',
                    price: item.price,
                    discountPrice: item.discountPrice,
                    category: item.category || 'General',
                    restaurantId: item.restaurantId,
                    image: item.image || 'https://via.placeholder.com/150',
                    isAvailable: item.isAvailable !== false,
                    typeOfFood: item.typeOfFood || [],
                    tags: item.tags || [],
                    rating: item.rating,
                    ratingCount: item.ratingCount,
                  }));
                  
                  setMenuItems(convertedMenuItems);
                } catch (error) {
                  setError('Failed to load data. Please try again.');
                } finally {
                  setLoading(false);
                }
              };
              loadInitialData();
            }}
          >
            <Text allowFontScaling={false} style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const groupedMenu = filterMenuItems(searchText || (name as string) || "");
  const hasResults = Object.keys(groupedMenu).length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

   <Header title="Search for dishes & Restaurant"/>
      <SearchBarVoice
        redirectTargets={["Dishes", "Restaurants"]}
        placeholder={name?.toString() || "Search for dishes"}
        value={searchText}
        onChangeText={setSearchText}
      />

      {!hasResults ? (
        <View style={styles.noResultsContainer}>
          <Text allowFontScaling={false} style={styles.noResultsText}>
            The searched dish is not available at any restaurant
          </Text>
          <Text allowFontScaling={false} style={styles.noResultsSubText}>
            Try searching for a different dish
          </Text>
        </View>
      ) : (
        <ScrollView>
          {Object.entries(groupedMenu).map(([restaurantId, menuItems]) =>
            renderRestaurantSection(restaurantId, menuItems)
          )}
        </ScrollView>
      )}

      {totalItemsInCart > 0 && (
        <CheckoutPopup
          totalItems={totalItemsInCart}
          onCheckout={handleCheckout}
        />
      )}

      {/* Product Details Modal */}
      <ProductDetailsModal
        visible={modalVisible}
        onClose={handleCloseModal}
        item={selectedItem}
        onAddToCart={handleAddToCart}
        cartCounts={cartCounts} // Pass the cartCounts from parent
      />
    </SafeAreaView>
  );
};

export default DishesSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    color: "#ff0000",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#01615F",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
  },
  restaurantSection: {
    marginVertical: 8,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: RFPercentage(2.5),
    marginTop: RFPercentage(2),
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  headerLocation: {
    fontSize: RFPercentage(1.3),
    marginLeft: 10,
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
  restaurantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -2,
    marginLeft: 10,
  },
  restaurantSub: {
    fontSize: RFPercentage(2),
    color: "gray",
    fontFamily: "Poppins-Regular",
    marginRight: 4,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  restaurantName: {
    fontSize: 15,
    marginLeft: 10,
    fontFamily: "Poppins-SemiBold",
  },
  horizontalScroll: {
    marginTop: 10,
  },
  menuCard: {
    width: 250, // Fixed width for stability
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    marginLeft: 2,
    padding: 10,
    backgroundColor: "#fff",
  },
  leftSection: {
    width: "50%", // Fixed width percentage
    justifyContent: "space-between",
  },
  rightSection: {
    width: "50%", // Fixed width percentage
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  menuImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  addButtonContainer: {
    width: 60,
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 0,
    marginTop: -30,
  },
  addButton: {
    borderColor: "#01615F",
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingVertical: 5,
    borderRadius: 5,
    width: "100%", // Takes full width of container
    alignItems: "center",
  },
  menuName: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  menuCategory: {
    fontSize: RFPercentage(1.3),
    color: "gray",
    fontFamily: "Poppins-Regular",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuPrice: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
  discountPrice: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#01615F",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "gray",
    textDecorationLine: "line-through",
  },
  viewDetailsButton: {
    marginTop: 8,
    width: 85,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00796b",
  },
  viewDetailsText: {
    fontSize: RFPercentage(1.3),
    fontFamily: "Poppins-Regular",
  },
  addButtonText: {
    color: "#01615F",
    fontSize: RFPercentage(2),
  },
  ButtonText: {
    color: "#FFF",
    fontSize: 20,
  },
  counterContainer: {
    flexDirection: "row",
  },
  minusButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#01615F",
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 4,
    width: 25,
    color: "white",
  },
  plusButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#01615F",
    borderRadius: 4,
    width: 25,
    paddingHorizontal: 4,
    marginLeft: 10,
    color: "#fff",
  },
  counterText: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#01615F",
    borderRadius: 2,
    width: 30,
    height: 30,
    padding: 4,
    borderWidth: 1,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  popupContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
  },
  checkoutButton: {
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  checkoutText: {
    color: "white",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontFamily: "Poppins-Medium",
    fontSize: RFPercentage(2),
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  noResultsSubText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
});