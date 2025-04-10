import React, { useState, useEffect } from "react";
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
  Alert
} from "react-native";
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

interface Restaurant {
  restaurantId: string;
  name: string;
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

interface MenuItem {
  menuItemId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  restaurantId: string;
  image: string;
  isAvailable: boolean;
}

const mockRestaurants: Restaurant[] = [
  {
    restaurantId: "r1",
    name: "The Spice Hub",
    googleLocation: "https://maps.google.com/?q=The+Spice+Hub",
    location: "123 Flavor Street, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 250,
    ratingAverage: 4.5,
    categories: ["Biryani", "North Indian", "Desserts"],
    menu: ["m1", "m2", "m3"],
    isActive: true,
  },
  {
    restaurantId: "r2",
    name: "Westside Grill",
    googleLocation: "https://maps.google.com/?q=Westside+Grill",
    location: "456 Grilling Avenue, Food City",
    coverImage: "https://via.placeholder.com/500x300",
    ratingCount: 300,
    ratingAverage: 4.7,
    categories: ["Grill", "North Indian", "Burgers"],
    menu: ["m4"],
    isActive: true,
  },
];

const mockMenu: MenuItem[] = [
  {
    menuItemId: 1,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken and spices.",
    price: 12.99,
    category: "Biryani",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 2,
    name: "Gulab Jamun",
    description: "Delicious deep-fried dumplings soaked in sugar syrup.",
    price: 4.99,
    category: "Desserts",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 3,
    name: "Paneer Tikka",
    description:
      "Soft paneer cubes marinated in spices and grilled to perfection.",
    price: 9.99,
    category: "North Indian",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 4,
    name: "Grilled Chicken",
    description: "Juicy chicken grilled with herbs and spices.",
    price: 14.99,
    category: "Grill",
    restaurantId: "r2",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 5,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken and spices.",
    price: 12.99,
    category: "Biryani",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
  {
    menuItemId: 6,
    name: "Paneer Tikka",
    description:
      "Soft paneer cubes marinated in spices and grilled to perfection.",
    price: 9.99,
    category: "North Indian",
    restaurantId: "r1",
    image: "https://via.placeholder.com/150",
    isAvailable: true,
  },
];

const RestaurantSelect = () => {
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  // Bookmark states
  const [bookmarkedItems, setBookmarkedItems] = useState<Record<number, boolean>>({});
  const [cartCounts, setCartCounts] = useState<Record<number, number>>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const router = useRouter();
  const totalItemsInCart = Object.values(cartCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Add favorite restaurant state
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Record<string, boolean>>({});
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const getFilteredMenuItems = (
    items: MenuItem[],
    query: string
  ): MenuItem[] => {
    const searchTerm = query.toLowerCase();
    if (!searchTerm) return items;

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
  };

  const getFilteredCategories = (
    categories: string[],
    filteredItems: MenuItem[]
  ): string[] => {
    if (!searchQuery) return categories;

    const availableCategories = new Set(
      filteredItems.map((item) => item.category)
    );

    return categories.filter(
      (category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        availableCategories.has(category)
    );
  };

  // Toggle bookmark for a specific menu item
  const toggleBookmark = (menuItemId: number) => {
    setBookmarkedItems(prev => ({
      ...prev,
      [menuItemId]: !prev[menuItemId]
    }));
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
      counts[category] = menuItems.filter(
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

  useEffect(() => {
    const selectedRestaurant = mockRestaurants.find(
      (r) => r.restaurantId === restaurantId
    );
    setRestaurant(selectedRestaurant || null);

    const items = mockMenu.filter((item) => item.restaurantId === restaurantId);
    setMenuItems(items);
  }, [restaurantId]);

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
      ([menuItemId, quantity]) => {
        const menuItem = menuItems.find(
          (item) => item.menuItemId === parseInt(menuItemId)
        );
        return {
          name: menuItem?.name,
          quantity,
          price: menuItem?.price,
        };
      }
    );

    router.push({
      pathname: "./BillingScreen",
      params: {
        restaurantId: restaurant?.restaurantId,
        restaurantName: restaurant?.name,
        cart: JSON.stringify(selectedItems),
      },
    });
  };

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = (item: MenuItem) => {
    setCartCounts((prevCounts) => {
      const newCount = prevCounts[item.menuItemId]
        ? prevCounts[item.menuItemId] + 1
        : 1;
      return { ...prevCounts, [item.menuItemId]: newCount };
    });
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    setCartCounts((prevCounts) => {
      const newCount =
        prevCounts[item.menuItemId] > 0 ? prevCounts[item.menuItemId] - 1 : 0;
      return { ...prevCounts, [item.menuItemId]: newCount };
    });
  };

  const handleShareRestaurant = () => {
    Alert.alert("Share", `Sharing ${restaurant.name} with friends!`);
    setDropdownVisible(false);
  };

  const NavigationBar = () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const toggleSelection = (filter: string) => {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((item) => item !== filter));
      } else {
        setSelectedFilters([...selectedFilters, filter]);
      }
    };

    const toggleFilterDropdown = () => {
      setIsFilterOpen(!isFilterOpen);
    };

    const filterImages: { [key: string]: any } = {
      Veg: require("./../../assets/images/Veg.png"),
      Egg: require("./../../assets/images/Egg.png"),
      "Non Veg": require("./../../assets/images/NonVeg.png"),
    };

    return (
      <View style={styles.FileListcontainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilters.includes("filter") && styles.selected,
          ]}
          onPress={() => setIsFilterVisible(true)}
        >
          <Ionicons name="funnel-outline" size={18} color="black" />
          <Text style={styles.buttonText}>Filter</Text>
          <Ionicons
            name={isFilterOpen ? "caret-up" : "caret-down"}
            size={18}
            color="grey"
            style={styles.dropdownIcon}
          />
          <FilterPopup
            isVisible={isFilterVisible}
            onClose={() => setIsFilterVisible(false)}
            onApply={handleFilterApply}
          />
        </TouchableOpacity>

        {["Veg", "Egg", "Non Veg"].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.button,
              selectedFilters.includes(filter) && styles.selected,
            ]}
            onPress={() => toggleSelection(filter)}
          >
            <Image source={filterImages[filter]} style={styles.filterIcon} />
            <Text
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

  const filteredMenuItems = getFilteredMenuItems(menuItems, searchQuery);
  const filteredCategories = getFilteredCategories(
    restaurant.categories,
    filteredMenuItems
  );

  const renderMenuItem = (item: MenuItem) => {
    const count = cartCounts[item.menuItemId] || 0;
    const isBookmarked = bookmarkedItems[item.menuItemId] || false;

    return (
      <View style={styles.menuCard} key={item.menuItemId}>
        <Image style={styles.menuImage} source={{ uri: item.image }} />
        <TouchableOpacity 
          style={styles.iconWrapper} 
          onPress={() => toggleBookmark(item.menuItemId)}
        >
          <FontAwesome
            name={isBookmarked ? 'bookmark' : 'bookmark-o'}
            size={18}
            color="#01615F"
          />
        </TouchableOpacity>
        <View style={styles.menuDetails}>
          <Text style={styles.menuName}>{item.name}</Text>
          <Text style={styles.menuCategory}>{item.category}</Text>
          <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.addButtonContainer}>
          {count === 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.minusButton}
                onPress={() => handleRemoveFromCart(item)}
              >
                <Text style={styles.addButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterText}>{count}</Text>
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const CheckoutPopup: React.FC<CheckoutPopupProps> = ({ totalItems }) => {
    return (
      <View style={styles.popupContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>
            {`Checkout ${totalItems} item${totalItems > 1 ? "s" : ""}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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

            <Text style={styles.title} numberOfLines={1}>
              {restaurant.name}
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
                <Text style={styles.dropdownText}>
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
                <Text style={styles.dropdownText}>Share</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Favorite Badge */}
        {isRestaurantFavorite && (
          <View style={styles.favoriteBadge}>
            <FontAwesome name="heart" size={14} color="#fff" />
            <Text style={styles.favoriteBadgeText}>Favorite</Text>
          </View>
        )}

        {/* Search Bar */}
        <SearchBarVoice
          redirectTargets={["Dishes", "Restaurants"]}
          placeholder={`Search Dishes in ${restaurant.name}`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <NavigationBar />

        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item}
          renderItem={({ item: category }) => (
            <View>
              <TouchableOpacity
                style={styles.categoryChip}
                onPress={() => toggleCategory(category)}
              >
                <Text style={styles.categoryText}>{category}</Text>
                <Ionicons
                  name={
                    expandedCategories.has(category) ? "caret-up" : "caret-down"
                  }
                  size={16}
                  color="grey"
                />
              </TouchableOpacity>
              {expandedCategories.has(category) &&
                filteredMenuItems
                  .filter((menuItem) => menuItem.category === category)
                  .map(renderMenuItem)}
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleOpenModal}
        >
          <Image source={require("./../../assets/images/Restaurant.png")} />
          <Text style={styles.floatbuttonText}>Menu</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {totalItemsInCart > 0 && <CheckoutPopup totalItems={totalItemsInCart} />}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Menu Categories</Text>
                <FlatList
                  data={restaurant?.categories}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => {
                    const itemsCount = getItemsCountPerCategory()[item];
                    return (
                      <View style={styles.categoryItem}>
                        <Text style={styles.categoryText}>{item}</Text>
                        <Text style={styles.itemsCountText}>
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
    display: "flex",
    justifyContent: "center",
    paddingVertical: 8,
    gap: 8,
    width: 350,
    overflow: "hidden",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 8,
    marginLeft: 50,
    borderWidth: 1,
    borderColor: "black",
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
  },
  buttonText: {
    marginLeft: 2,
    fontSize: RFPercentage(2),
    color: "black",
    fontFamily: "Poppins-Regular",
  },
  filterIcon: {
    width: 20,
    height: 20,
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
});