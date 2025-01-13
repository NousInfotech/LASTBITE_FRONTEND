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
  ScrollView
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import GoBack from "@/components/GoBack";
import SearchBarVoice from "@/components/SearchBarVoice";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

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
  const [cartCounts, setCartCounts] = useState<Record<number, number>>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const router = useRouter();
  const totalItemsInCart = Object.values(cartCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load custom fonts
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
          onPress={toggleFilterDropdown}
        >
          <Ionicons name="funnel-outline" size={18} color="black" />
          <Text style={styles.buttonText}>Filter</Text>
          <Ionicons
            name={isFilterOpen ? "caret-up" : "caret-down"}
            size={18}
            color="grey"
            style={styles.dropdownIcon}
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

  const renderMenuItem = (item: MenuItem) => {
    const count = cartCounts[item.menuItemId] || 0;

    return (
      <View style={styles.menuCard} key={item.menuItemId}>
        <Image style={styles.menuImage} source={{ uri: item.image }} />
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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <GoBack />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{restaurant.name}</Text>
        </View>

        {/* Search Bar */}
        <SearchBarVoice
          onInputPress={() => {}}
          redirectTargets={["Dishes", "Restaurants"]}
          placeholder={`Search Dishes in ${restaurant.name}`}
        />
        <NavigationBar />
        {/* Categories and Menu Items */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FlatList
          data={restaurant.categories}
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
                menuItems
                  .filter((menuItem) => menuItem.category === category)
                  .map(renderMenuItem)}
            </View>
          )}
        />
</ScrollView>
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
                <FlatList
                  data={restaurant?.categories}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <View style={styles.categoryItem}>
                      <Text style={styles.categoryText}>{item}</Text>
                    </View>
                  )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 70,
    fontFamily: "Poppins-SemiBold",
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
    fontSize: 12,
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
    fontSize: 12,
    color: "#333",
    fontFamily: "Poppins-SemiBold",
  },
  menuCategory: {
    fontSize: 10,
    color: "#777",
    marginVertical: 2,
    fontFamily: "Poppins-Regular",
  },
  menuPrice: {
    fontSize: 12,
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
    fontSize: 10,
    fontFamily: "Poppins-Regular",
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
    fontSize: 12,
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
    fontSize: 18,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  categoryItem: {
    paddingVertical: 10,
  },
});
