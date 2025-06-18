import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
  Pressable,
  Alert,
  Animated,
  ActivityIndicator
} from "react-native";
import { Share } from 'react-native';

import { useLocalSearchParams } from "expo-router";
import GoBack from "@/components/GoBack";
import SearchBarVoice from "@/components/SearchBarVoice";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import FilterPopup from "@/components/FilterFood";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import CreateWishlistPopup from "@/components/CreateWishlistPopup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '@/config/api';

// Enums and Interfaces
export enum FoodType {
  VEG = "veg",
  NON_VEG = "non_veg",
  HALAL = "halal",
  VEGAN = "vegan",
  KOSHER = "kosher",
  GLUTEN_FREE = "gluten_free",
  JAIN = "jain",
  EGGETARIAN = "egg",
  SEAFOOD = "seafood",
  ORGANIC = "organic"
}

interface IAddon {
  addonId?: string;
  name: string;
  price: number;
  isAvailable?: boolean;
}

export interface IFoodItem {
  foodItemId?: string;
  restaurantId: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  image?: string;
  isAvailable?: boolean;
  typeOfFood: FoodType[];
  tags?: string[];
  category?: string;
  rating?: number;
  ratingCount?: number;
  stock?: number;
  addons?: IAddon[];
}

interface Restaurant {
  restaurantId: string;
restaurantName: string;
  googleLocation?: string;
  location: string;
  coverImage: string;
  ratingCount: number;
  ratingAverage: number;
  categories: string[];
  menu: string[];
  isActive: boolean;
  details?: string;
}

interface CheckoutPopupProps {
  totalItems: number;
}

interface WishlistPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onCreateNewList: () => void;
  onSave: () => void;
  selectedLists: string[];
  onToggleList: (listId: string) => void;
}

interface WishlistList {
  id: string;
  name: string;
  image: any;
}

const RestaurantSelect = () => {
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [foodItems, setFoodItems] = useState<IFoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  // Bookmark states
  const [bookmarkedItems, setBookmarkedItems] = useState<Record<string, boolean>>({});
  const [cartCounts, setCartCounts] = useState<Record<string, number>>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const router = useRouter();
  const totalItemsInCart = Object.values(cartCounts).reduce((sum, count) => sum + count, 0);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  // Add favorite restaurant state
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Record<string, boolean>>({});
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Wishlist popup states
  const [isWishlistPopupVisible, setIsWishlistPopupVisible] = useState<boolean>(false);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [activeBookmarkedItemId, setActiveBookmarkedItemId] = useState<string | null>(null);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  // Create new wishlist states
  const [isCreateWishlistVisible, setIsCreateWishlistVisible] = useState(false);
  const [activeItemDetails, setActiveItemDetails] = useState({ 
    image: '', 
    name: '' 
  });

  const [wishlistLists, setWishlistLists] = useState<WishlistList[]>([]);

  // API Functions
const fetchRestaurantDetails = async (id: string) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RESTAURANT}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch restaurant: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    // FIX: Handle different API response structures
    if (data.restaurant) {
      return data.restaurant; // If data is wrapped in a restaurant property
    } else if (data.data) {
      return data.data; // If data is wrapped in a data property
    }
    return data; // If data is directly the restaurant object
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    throw error;
  }
};
const fetchFoodItemsByRestaurant = async (id: string) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FOOD_ITEMS}/restaurant/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch food items: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    // FIX: Ensure we always return an array
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.items)) {
      return data.items;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn('API returned unexpected format:', data);
      return []; // Return empty array as fallback
    }
  } catch (error) {
    console.error('Error fetching food items:', error);
    return []; // Return empty array on error
  }
};

// 2. Fix the loadRestaurantData function
useEffect(() => {
  const loadRestaurantData = async () => {
    if (!restaurantId) {
      setError('Restaurant ID not provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [restaurantData, foodItemsData] = await Promise.all([
        fetchRestaurantDetails(restaurantId),
        fetchFoodItemsByRestaurant(restaurantId)
      ]);

      // FIX: Add debugging logs
      console.log('Restaurant Data:', restaurantData);
      console.log('Restaurant Name:', restaurantData?.name);

      setRestaurant(restaurantData);
      
      if (Array.isArray(foodItemsData)) {
        setFoodItems(foodItemsData);
        
        const categories = [...new Set(foodItemsData.map((item: IFoodItem) => item.category).filter(Boolean))];
        
        if (restaurantData && categories.length > 0) {
          setRestaurant(prev => prev
            ? { ...prev, categories: categories.filter((c): c is string => typeof c === 'string') }
            : null
          );
        }
      } else {
        console.error('Food items data is not an array:', foodItemsData);
        setFoodItems([]);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load restaurant data');
      console.error('Error loading restaurant data:', err);
    } finally {
      setLoading(false);
    }
  };

  loadRestaurantData();
}, [restaurantId]);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

const getFilteredFoodItems = (items: IFoodItem[], query: string, filters: string[]): IFoodItem[] => {
  let filteredItems = items;

  // Apply text search filter
  if (query) {
    const searchTerm = query.toLowerCase();
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.category?.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Apply food type filters
  if (filters.length > 0) {
    filteredItems = filteredItems.filter((item) => {
      return filters.some(filter => {
        switch (filter) {
          case 'Veg':
            return item.typeOfFood.includes(FoodType.VEG);
          case 'Non Veg':
            return item.typeOfFood.includes(FoodType.NON_VEG);
          case 'Egg':
            return item.typeOfFood.includes(FoodType.EGGETARIAN);
          default:
            return false;
        }
      });
    });
  }

  return filteredItems;
};


  const getFilteredCategories = (categories: string[], filteredItems: IFoodItem[]): string[] => {
    if (!searchQuery) return categories;

    const availableCategories = new Set(
      filteredItems.map((item) => item.category).filter(Boolean)
    );

    return categories.filter(
      (category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        availableCategories.has(category)
    );
  };

  // Toggle bookmark for a specific food item
  const toggleBookmark = (foodItemId: string) => {
    const isCurrentlyBookmarked = bookmarkedItems[foodItemId] || false;
    
    setBookmarkedItems(prev => ({
      ...prev,
      [foodItemId]: !prev[foodItemId]
    }));
    
    // Only show the wishlist popup when adding to bookmarks, not when removing
    if (!isCurrentlyBookmarked) {
      setActiveBookmarkedItemId(foodItemId);
      showWishlistPopup();
    }
  };

  // Wishlist popup functions
  const showWishlistPopup = () => {
    setIsWishlistPopupVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideWishlistPopup = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsWishlistPopupVisible(false);
      setSelectedLists([]);
    });
  };

  const handleCreateNewList = () => {
    // Get the active food item details if we have an active bookmarked item
    if (activeBookmarkedItemId) {
      const item = foodItems.find(item => item.foodItemId === activeBookmarkedItemId);
      if (item) {
        setActiveItemDetails({ 
          image: item.image || '', 
          name: item.name 
        });
      }
    }
    
    hideWishlistPopup(); // Close the wishlist selection popup
    setIsCreateWishlistVisible(true); // Open the create new list popup
  };

  const handleSaveNewWishlist = async (listName: string) => {
    // Create a new unique ID
    const newListId = `list-${Date.now()}`;
    
    // Create new list object
    const newList = {
      id: newListId,
      name: listName,
      image: require("./../../assets/images/Restaurant.png")
    };
    
    try {
      // Get existing lists or initialize empty array
      const savedListsStr = await AsyncStorage.getItem('wishlistLists') || '[]';
      const savedLists = JSON.parse(savedListsStr);
      
      // Add new list
      const updatedLists = [...savedLists, newList];
      
      // Save updated lists
      await AsyncStorage.setItem('wishlistLists', JSON.stringify(updatedLists));
      
      // If we have a bookmarked item, save it with the list
      if (activeBookmarkedItemId) {
        const bookmarkedItem = foodItems.find(item => item.foodItemId === activeBookmarkedItemId);
        
        if (bookmarkedItem) {
          // Get existing wishlist items or initialize empty object
          const savedItemsStr = await AsyncStorage.getItem('wishlistItems') || '{}';
          const savedItems = JSON.parse(savedItemsStr);
          
          // Add item to the new list
          savedItems[newListId] = [{
            id: bookmarkedItem.foodItemId?.toString() || '',
            name: bookmarkedItem.name,
            price: bookmarkedItem.discountPrice || bookmarkedItem.price,
            image: bookmarkedItem.image || '',
            restaurant: restaurant?.restaurantName || '',
            restaurantId: bookmarkedItem.restaurantId
          }];
          
          await AsyncStorage.setItem('wishlistItems', JSON.stringify(savedItems));
        }
      }
      
      // Update local state
      setWishlistLists(updatedLists);
      
      // Show feedback to user
      Alert.alert(
        "New List Created", 
        `Your new list "${listName}" has been created and item has been added!`
      );
      
      setIsCreateWishlistVisible(false);
    } catch (error) {
      console.error("Error saving wishlist data:", error);
      Alert.alert("Error", "Failed to create wishlist. Please try again.");
    }
  };

  useEffect(() => {
    const loadSavedWishlists = async () => {
      try {
        const savedLists = await AsyncStorage.getItem('wishlistLists');
        if (savedLists) {
          setWishlistLists(JSON.parse(savedLists));
        }
      } catch (error) {
        console.error("Error loading saved wishlists:", error);
      }
    };
    
    loadSavedWishlists();
  }, []);

  const toggleListSelection = (listId: string) => {
    setSelectedLists(prev => {
      if (prev.includes(listId)) {
        return prev.filter(id => id !== listId);
      } else {
        return [...prev, listId];
      }
    });
  };

  const handleSaveToWishlist = () => {
    if (selectedLists.length === 0) {
      Alert.alert("No List Selected", "Please select at least one list to save to.");
      return;
    }

    const selectedListNames = selectedLists.map(id => 
      wishlistLists.find(list => list.id === id)?.name
    ).filter(Boolean);

    Alert.alert(
      "Added to Wishlist", 
      `Item has been added to: ${selectedListNames.join(', ')}`
    );
    
    hideWishlistPopup();
  };

  // Toggle favorite for a restaurant
  const toggleFavorite = (restaurantId: string) => {
    setFavoriteRestaurants(prev => {
      const newState = {
        ...prev,
        [restaurantId]: !prev[restaurantId]
      };
      
      // Show a toast or alert when adding to favorites
      if (newState[restaurantId]) {
        Alert.alert("Added to Favorites", "Restaurant has been added to your favorites!");
      } else {
        Alert.alert("Removed from Favorites", "Restaurant has been removed from your favorites.");
      }
      
      return newState;
    });
    setDropdownVisible(false);
  };

  const getItemsCountPerCategory = () => {
    const counts: Record<string, number> = {};
    restaurant?.categories.forEach((category) => {
      counts[category] = foodItems.filter(
        (item) => item.category === category
      ).length;
    });
    return counts;
  };

  const handleFilterApply = (filters: any) => {
    console.log("Applied Filters:", filters);
  };

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

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const handleCheckout = () => {
    const selectedItems = Object.entries(cartCounts).map(
      ([foodItemId, quantity]) => {
        const foodItem = foodItems.find(
          (item) => item.foodItemId === foodItemId
        );
        return {
          name: foodItem?.name,
          quantity,
          price: foodItem?.discountPrice || foodItem?.price,
        };
      }
    );

    router.push({
      // pathname: "./BillingScreen",
      pathname: "./checkoutPageRestaurant",
      params: {
        restaurantId: restaurant?.restaurantId,
        restaurantName: restaurant?.restaurantName,
        cart: JSON.stringify(selectedItems),
      },
    });
  };

// 4. Add error handling for restaurant data
if (loading) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#01615F" />
        <Text allowFontScaling={false} style={styles.loadingText}>Loading restaurant...</Text>
      </View>
    </SafeAreaView>
  );
}

// Error state
if (error || !restaurant) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <Text allowFontScaling={false} style={styles.errorText}>
          {error || 'Restaurant not found'}
        </Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={async () => {
            if (!restaurantId) return;
            
            try {
              setError(null);
              setLoading(true);
              
              const [restaurantData, foodItemsData] = await Promise.all([
                fetchRestaurantDetails(restaurantId),
                fetchFoodItemsByRestaurant(restaurantId)
              ]);

              setRestaurant(restaurantData);
              
              // Ensure foodItemsData is an array
              if (Array.isArray(foodItemsData)) {
                setFoodItems(foodItemsData);
                const categories = [...new Set(foodItemsData.map((item: IFoodItem) => item.category).filter(Boolean))];
                
                if (restaurantData && categories.length > 0) {
                  setRestaurant(prev => prev
                    ? { ...prev, categories: categories.filter((c): c is string => typeof c === 'string') }
                    : null
                  );
                }
              } else {
                setFoodItems([]);
              }

            } catch (err) {
              setError(err instanceof Error ? err.message : 'Failed to load restaurant data');
            } finally {
              setLoading(false);
            }
          }}
        >
          <Text allowFontScaling={false} style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

  const handleAddToCart = (item: IFoodItem) => {
    const itemId = item.foodItemId || '';
    setCartCounts((prevCounts) => {
      const newCount = prevCounts[itemId] ? prevCounts[itemId] + 1 : 1;
      return { ...prevCounts, [itemId]: newCount };
    });
  };

  const handleRemoveFromCart = (item: IFoodItem) => {
    const itemId = item.foodItemId || '';
    setCartCounts((prevCounts) => {
      const newCount = prevCounts[itemId] > 0 ? prevCounts[itemId] - 1 : 0;
      return { ...prevCounts, [itemId]: newCount };
    });
  };

const handleShareRestaurant = async () => {
  try {
    const result = await Share.share({
      message: `Check out ${restaurant?.restaurantName}! Great food with ${restaurant?.ratingAverage}/5 rating. Located at ${restaurant?.location}`,
      url: `https://yourapp.com/restaurant/${restaurantId}`, // Replace with your app's deep link
      title: `${restaurant?.restaurantName} - Great Food Awaits!`,
    });
    
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // Shared with activity type of result.activityType
      } else {
        // Shared
      }
    } else if (result.action === Share.dismissedAction) {
      // Dismissed
    }
  } catch (error) {
    Alert.alert('Error', 'Unable to share restaurant');
  }
  setDropdownVisible(false);
};


  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Helper function to get food type display
  const getFoodTypeDisplay = (typeOfFood: FoodType[]) => {
    if (typeOfFood.includes(FoodType.VEG)) return 'VEG';
    if (typeOfFood.includes(FoodType.NON_VEG)) return 'NON VEG';
    if (typeOfFood.includes(FoodType.EGGETARIAN)) return 'EGG';
    return 'VEG'; // Default
  };

  // WishlistPopup component
  const WishlistPopup: React.FC<WishlistPopupProps> = ({ 
    isVisible, 
    onClose, 
    onCreateNewList,
    onSave,
    selectedLists,
    onToggleList
  }) => {
    const translateY = slideAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    });
  
    if (!isVisible) return null;
  
    return (
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={wishlistStyles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View 
              style={[
                wishlistStyles.container,
                { transform: [{ translateY }] }
              ]}
            >
              <View style={wishlistStyles.header}>
                <Text allowFontScaling={false} style={wishlistStyles.title}>Add to Your Wishlist</Text>
                <TouchableOpacity onPress={onClose} style={wishlistStyles.closeButton}>
                  <Text allowFontScaling={false} style={wishlistStyles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={wishlistStyles.createNewListButton}
                onPress={onCreateNewList}
              >
                <View style={wishlistStyles.plusIconContainer}>
                  <Text allowFontScaling={false} style={wishlistStyles.plusIcon}>+</Text>
                </View>
                <Text allowFontScaling={false} style={wishlistStyles.createNewListText}>Create New List</Text>
              </TouchableOpacity>
              
              <Text allowFontScaling={false} style={wishlistStyles.listSectionTitle}>Your Lists</Text>
              
              {wishlistLists.slice(0, 1).map(list => (
                <TouchableOpacity 
                  key={list.id}
                  style={wishlistStyles.listItem}
                  onPress={() => onToggleList(list.id)}
                >
                  <Image source={list.image} style={wishlistStyles.listItemImage} />
                  <Text allowFontScaling={false} style={wishlistStyles.listItemText}>{list.name}</Text>
                  <View style={[
                    wishlistStyles.checkbox,
                    selectedLists.includes(list.id) && wishlistStyles.checkboxSelected
                  ]}>
                    {selectedLists.includes(list.id) && (
                      <View style={wishlistStyles.checkboxInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
              
              <Text allowFontScaling={false} style={wishlistStyles.listSectionTitle}>Suggested List</Text>
              
              {wishlistLists.slice(1).map(list => (
                <TouchableOpacity 
                  key={list.id}
                  style={wishlistStyles.listItem}
                  onPress={() => onToggleList(list.id)}
                >
                  <Image source={list.image} style={wishlistStyles.listItemImage} />
                  <Text allowFontScaling={false} style={wishlistStyles.listItemText}>{list.name}</Text>
                  <View style={[
                    wishlistStyles.checkbox,
                    selectedLists.includes(list.id) && wishlistStyles.checkboxSelected
                  ]}>
                    {selectedLists.includes(list.id) && (
                      <View style={wishlistStyles.checkboxInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity 
                style={wishlistStyles.saveButton}
                onPress={onSave}
              >
                <Text allowFontScaling={false} style={wishlistStyles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  };

const NavigationBarWithState = () => {
  const toggleSelection = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const filterImages: { [key: string]: any } = {
    Veg: require("./../../assets/images/Veg.png"),
    Egg: require("./../../assets/images/Egg.png"),
    "Non Veg": require("./../../assets/images/NonVeg.png"),
  };

  return (
    <View style={styles.FileListcontainer}>
      {/* <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsFilterVisible(true)}
      >
        <Ionicons name="funnel-outline" size={18} color="black" />
        <Text allowFontScaling={false} style={styles.buttonText}>Filter</Text>
        <Ionicons name="caret-down" size={18} color="grey" />
      </TouchableOpacity> */}

      {["Veg", "Egg", "Non Veg"].map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterOptionButton,
            selectedFilters.includes(filter) && styles.selected,
          ]}
          onPress={() => toggleSelection(filter)}
        >
          <Image source={filterImages[filter]} style={styles.filterIcon} />
          <Text allowFontScaling={false} 
            style={[
              styles.buttonText,
              selectedFilters.includes(filter) && { color: "#01615F" },
            ]}
          >
            {filter}
          </Text>
          {selectedFilters.includes(filter) && (
            <TouchableOpacity onPress={() => toggleSelection(filter)}>
              <Ionicons name="close-outline" size={14} color="#01615F" />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
  const CheckoutPopup: React.FC<CheckoutPopupProps> = ({ totalItems }) => {
    return (
      <View style={styles.popupContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text allowFontScaling={false} style={styles.checkoutText}>
            {`Checkout ${totalItems} item${totalItems > 1 ? "s" : ""}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

const renderFoodItem = (item: IFoodItem) => {
  const itemId = item.foodItemId || '';
  const count = cartCounts[itemId] || 0;
  const isBookmarked = bookmarkedItems[itemId] || false;
  const displayPrice = item.discountPrice || item.price;
  const hasDiscount = item.discountPrice && item.discountPrice < item.price;

  return (
    <View style={styles.menuCard} key={itemId}>
      <Image 
        style={styles.menuImage} 
        source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
      />
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => toggleBookmark(itemId)}
      >
        <FontAwesome
          name={isBookmarked ? 'bookmark' : 'bookmark-o'}
          size={18}
          color="#01615F"
        />
      </TouchableOpacity>
      <View style={styles.menuDetails}>
        <Text allowFontScaling={false} style={styles.menuName}>
          {item.name || 'Unknown Item'}
        </Text>
        <Text allowFontScaling={false} style={styles.menuCategory}>
          {item.category || 'General'} • {getFoodTypeDisplay(item.typeOfFood || [FoodType.VEG])}
        </Text>
        {item.description && (
          <Text allowFontScaling={false} style={styles.menuDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <View style={styles.priceContainer}>
          <Text allowFontScaling={false} style={styles.menuPrice}>
            ${displayPrice?.toFixed(2) || '0.00'}
          </Text>
          {hasDiscount && (
            <Text allowFontScaling={false} style={styles.originalPrice}>
              ${item.price?.toFixed(2) || '0.00'}
            </Text>
          )}
        </View>
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text allowFontScaling={false} style={styles.ratingText}>
              {item.rating.toFixed(1)} ({item.ratingCount || 0})
            </Text>
          </View>
        )}
      </View>
      <View style={styles.addButtonContainer}>
        {item.isAvailable === false ? (
          <Text allowFontScaling={false} style={styles.unavailableText}>Not Available</Text>
        ) : count === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Text allowFontScaling={false} style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.minusButton}
              onPress={() => handleRemoveFromCart(item)}
            >
              <Text allowFontScaling={false} style={styles.addButtonText}>-</Text>
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.counterText}>{count}</Text>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text allowFontScaling={false} style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
const filteredFoodItems = getFilteredFoodItems(foodItems, searchQuery, selectedFilters);
const filteredCategories = getFilteredCategories(
  restaurant?.categories || [],
  filteredFoodItems
);

  // Check if the current restaurant is favorited
  const isRestaurantFavorite = favoriteRestaurants[restaurantId] || false;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.optionsContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity>
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>

        <Text allowFontScaling={false} style={styles.title} numberOfLines={1}>
  {restaurant?.restaurantName || 'Loading...'}
</Text>

            <TouchableOpacity
              onPress={toggleDropdown}
              style={styles.menuButton}
            >
              <Feather name="more-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <View style={styles.dropdown}>
              <Pressable 
                style={styles.dropdownItem}
                onPress={() => toggleFavorite(restaurantId)}
              >
                <FontAwesome
                  name={isRestaurantFavorite ? "heart" : "heart-o"}
                  size={18}
                  color={isRestaurantFavorite ? "#FF375F" : "black"}
                  style={styles.icon}
                />
                <Text allowFontScaling={false}  style={styles.dropdownText}>
                  {isRestaurantFavorite ? "Remove from favorites" : "Add to favorites"}
                </Text>
              </Pressable>
              <Pressable 
                style={styles.dropdownItem}
                onPress={handleShareRestaurant}
              >
                <Feather
                  name="share-2"
                  size={18}
                  color="black"
                  style={styles.icon}
                />
                <Text allowFontScaling={false}  style={styles.dropdownText}>Share</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Favorite Badge */}
        {isRestaurantFavorite && (
          <View style={styles.favoriteBadge}>
            <FontAwesome name="heart" size={14} color="#fff" />
            <Text allowFontScaling={false}  style={styles.favoriteBadgeText}>Favorite</Text>
          </View>
        )}

        {/* Search Bar */}
       <SearchBarVoice
  redirectTargets={["Dishes", "Restaurants"]}
  placeholder={`Search Dishes in ${restaurant?.restaurantName || 'Restaurant'}`}
  value={searchQuery}
  onChangeText={setSearchQuery}
/>


       <NavigationBarWithState />

   <FlatList
  data={filteredCategories}
  keyExtractor={(item) => item}
  renderItem={({ item: category }) => (
    <View key={category}>
      <TouchableOpacity
        style={styles.categoryChip}
        onPress={() => toggleCategory(category)}
      >
        <Text allowFontScaling={false} style={styles.categoryText}>{category}</Text>
        <Ionicons
          name={expandedCategories.has(category) ? "caret-up" : "caret-down"}
          size={16}
          color="grey"
        />
      </TouchableOpacity>
      {expandedCategories.has(category) &&
        filteredFoodItems
          .filter((foodItem) => foodItem.category === category)
          .map((item) => (
            <View key={item.foodItemId || `item-${Math.random()}`}>
              {renderFoodItem(item)}
            </View>
          ))
      }
    </View>
  )}
/>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleOpenModal}
        >
          <Image source={require("./../../assets/images/Restaurant.png")} />
          <Text allowFontScaling={false}  style={styles.floatbuttonText}>Menu</Text>
        </TouchableOpacity>

        {/* Wishlist Popup */}
        <WishlistPopup
          isVisible={isWishlistPopupVisible}
          onClose={hideWishlistPopup}
          onCreateNewList={handleCreateNewList}
          onSave={handleSaveToWishlist}
          selectedLists={selectedLists}
          onToggleList={toggleListSelection}
        />

        {/* Create New Wishlist Popup */}
        <CreateWishlistPopup
          isVisible={isCreateWishlistVisible}
          onClose={() => setIsCreateWishlistVisible(false)}
          onSave={handleSaveNewWishlist}
          itemImage={activeItemDetails.image}
          itemName={activeItemDetails.name}
        />
      </SafeAreaView>
      {totalItemsInCart > 0 && <CheckoutPopup totalItems={totalItemsInCart} />}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text allowFontScaling={false}  style={styles.modalTitle}>Menu Categories</Text>
                <FlatList
                  data={restaurant?.categories}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const itemsCount = getItemsCountPerCategory()[item];
                    return (
                      <View style={styles.categoryItem}>
                        <Text allowFontScaling={false}  style={styles.categoryText}>{item}</Text>
                        <Text allowFontScaling={false}  style={styles.itemsCountText}>
                          ({itemsCount})
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default RestaurantSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  optionsContainer: {
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginTop: RFPercentage(3),
  },
  headerTitle: {
    fontSize: RFPercentage(2.5),
    marginTop: RFPercentage(2),
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  menuButton: {
    padding: 8,
  },
  dropdown: {
    position: "absolute",
    top: 60,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 6,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 20,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  menuText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "600",
  },
  favoriteBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF375F",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    position: "absolute",
    top: 12,
    right: 55,
    zIndex: 5,
  },
  favoriteBadgeText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
    fontFamily: "Poppins-Medium",
  },
  FileListcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "black",
    minWidth: 80,
    justifyContent: "center",
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "black",
    position: "relative",
  },
 selected: {
    borderColor: "#01615F",
    backgroundColor: "#F0F9FF",
  },
buttonText: {
    marginHorizontal: 4,
    fontSize: RFPercentage(1.8),
    color: "black",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
 filterIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
   filterOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "black",
    minWidth: 80,
    justifyContent: "center",
  },
  categoriesContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  categoryChip: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 12,
    borderRadius: 2,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 6,
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins-Medium",
  },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 4,
    padding: 10,
    backgroundColor: "#EFFFF4",
  },
  menuImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  menuDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: RFPercentage(2),
    color: "#333",
    fontFamily: "Poppins-SemiBold",
  },
  menuCategory: {
    fontSize: RFPercentage(1.3),
    color: "#777",
    marginVertical: 2,
    fontFamily: "Poppins-Regular",
  },
  menuPrice: {
    fontSize: RFPercentage(2),
    color: "#01615F",
    fontFamily: "Poppins-SemiBold",
  },
  addButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  minusButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: "#01615F",
    borderRadius: 4,
    height: 20,
  },
  plusButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: "#01615F",
    borderRadius: 4,
    height: 20,
  },
  counterText: {
    fontSize: 14,
    marginHorizontal: 10,
    color: "black",
    fontFamily: "Poppins-Regular",
  },
  addButton: {
    backgroundColor: "#01615F",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
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
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#01615F",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  floatbuttonImage: {
    color: "white",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  floatbuttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: RFPercentage(2.2),
    fontFamily: "Poppins-SemiBold",
    marginBottom: 15,
    textAlign: "center",
    color: "#01615F",
  },
  categoryItem: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemsCountText: {
    marginLeft: 8,
    color: "#777",
    fontSize: RFPercentage(1.8),
    fontFamily: "Poppins-Regular",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  retryButton: {
    backgroundColor: '#01615F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
    fontFamily: 'Poppins-Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontFamily: 'Poppins-Regular',
  },
  unavailableText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    fontFamily: 'Poppins-Regular',
  },

});

const wishlistStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 30,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#777',
  },
  createNewListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  plusIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  plusIcon: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  createNewListText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  listSectionTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listItemImage: {
    width: 36,
    height: 36,
    borderRadius: 6,
    marginRight: 12,
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxSelected: {
    borderColor: '#01615F',
    backgroundColor: '#01615F',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
  },
  saveButton: {
    backgroundColor: '#01615F',
    borderRadius: 6,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});