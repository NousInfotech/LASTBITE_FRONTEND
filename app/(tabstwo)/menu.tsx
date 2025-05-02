import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoBack from "@/components/GoBack";
import { useRouter, useFocusEffect } from "expo-router";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useCallback } from "react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  available: boolean;
  category: "food" | "grocery";
  isVeg: boolean;
  image?: {
    uri: string;
    base64?: string;
  } | null;
}

const FOOD_ITEMS_STORAGE_KEY = "@food_items";
const GROCERY_ITEMS_STORAGE_KEY = "@grocery_items";

const Menu = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"food" | "grocery">("food");
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "available" | "outOfStock">("all");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);
  const [foodItems, setFoodItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Lorem ipsum emat",
      price: 200,
      available: true,
      category: "food",
      isVeg: true,
    },
    {
      id: "2",
      name: "Lorem ipsum emat",
      price: 300,
      available: false,
      category: "food",
      isVeg: false,
    },
    {
      id: "3",
      name: "Lorem ipsum emat",
      price: 250,
      available: true,
      category: "food",
      isVeg: true,
    },
  ]);
  const [groceryItems, setGroceryItems] = useState<MenuItem[]>([]);

  // Load fonts
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

  // Use this instead of useIsFocused
  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  // Initial load of items
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      // Load food items
      const storedFoodItems = await AsyncStorage.getItem(FOOD_ITEMS_STORAGE_KEY);
      if (storedFoodItems !== null) {
        setFoodItems(JSON.parse(storedFoodItems));
      } else {
        // If no stored items, save the default ones
        await AsyncStorage.setItem(FOOD_ITEMS_STORAGE_KEY, JSON.stringify(foodItems));
      }

      // Load grocery items
      const storedGroceryItems = await AsyncStorage.getItem(GROCERY_ITEMS_STORAGE_KEY);
      if (storedGroceryItems !== null) {
        setGroceryItems(JSON.parse(storedGroceryItems));
      }
    } catch (error) {
      console.error("Failed to load items from storage", error);
      Alert.alert("Error", "Failed to load menu items. Please try again.");
    }
  };

  // Save items to AsyncStorage
  const saveItems = async (items: MenuItem[], storageKey: string) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save items to storage", error);
      Alert.alert("Error", "Failed to save menu items. Please try again.");
    }
  };

  const handleEditItem = (item: MenuItem) => {
    if (item.category === "food") {
      router.push({
        pathname: "/Screens/EditFood",
        params: { itemId: item.id }
      });
    } else {
      router.push({
        pathname: "/Screens/EditGrocery",
        params: { itemId: item.id }
      });
    }
  };

  const handleDeleteItem = (item: MenuItem) => {
    setItemToDelete(item);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      if (itemToDelete.category === "food") {
        const updatedItems = foodItems.filter(item => item.id !== itemToDelete.id);
        setFoodItems(updatedItems);
        await saveItems(updatedItems, FOOD_ITEMS_STORAGE_KEY);
      } else {
        const updatedItems = groceryItems.filter(item => item.id !== itemToDelete.id);
        setGroceryItems(updatedItems);
        await saveItems(updatedItems, GROCERY_ITEMS_STORAGE_KEY);
      }

      // Close modal and reset state
      setDeleteModalVisible(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Failed to delete item", error);
      Alert.alert("Error", "Failed to delete item. Please try again.");
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setItemToDelete(null);
  };

  const handleAddItem = () => {
    setIsOptionsModalVisible(false);
    const targetScreen = activeTab === "food" ? "/Screens/AddFood" : "/Screens/AddGrocery";
    router.push(targetScreen);
  };

  if (!fontsLoaded) {
    return null;
  }

  const openOptionsModal = () => setIsOptionsModalVisible(true);

  const openFilterModal = () => {
    setIsOptionsModalVisible(false);
    setIsFilterModalVisible(true);
  };

  const applyFilter = (filterType: "all" | "available" | "outOfStock") => {
    setFilter(filterType);
    setIsFilterModalVisible(false);
  };

  const getFilteredItems = () => {
    const items = activeTab === "food" ? foodItems : groceryItems;
    
    if (filter === "available") return items.filter(item => item.available);
    if (filter === "outOfStock") return items.filter(item => !item.available);
    return items;
  };

  const filteredItems = getFilteredItems();

  // Function to render individual item
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemContainer}>
      {/* Image display */}
      {item.image && item.image.uri ? (
        <Image 
          source={{ uri: item.image.uri }} 
          style={styles.itemImage} 
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
      
      <View style={styles.contentContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
          <View style={[styles.availabilityBadge, 
            { backgroundColor: item.available ? '#e1f5ee' : '#ffebeb' }]}>
            <Text style={[styles.availabilityText, 
              { color: item.available ? '#099873' : '#ff6b6b' }]}>
              {item.available ? 'Available' : 'Out of Stock'}
            </Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEditItem(item)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity onPress={openOptionsModal}>
          <Icon name="more-vert" size={24} color="#666666" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "food" && styles.activeTab]}
          onPress={() => setActiveTab("food")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "food" && styles.activeTabText,
            ]}
          >
            Food Items
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "grocery" && styles.activeTab]}
          onPress={() => setActiveTab("grocery")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "grocery" && styles.activeTabText,
            ]}
          >
            Grocery Items
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Options Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOptionsModalVisible}
        onRequestClose={() => setIsOptionsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOptionsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <View style={styles.dropdownContent}>
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={handleAddItem}
                >
                  <Text style={styles.modalButtonText}>Add New Item</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={openFilterModal}
                >
                  <Text style={styles.modalButtonText}>Filter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Filter Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsFilterModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <View style={styles.dropdownContent}>
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={() => applyFilter("available")}
                >
                  <Text style={styles.modalButtonText}>Available</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={() => applyFilter("outOfStock")}
                >
                  <Text style={styles.modalButtonText}>Out of Stock</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={() => applyFilter("all")}
                >
                  <Text style={styles.modalButtonText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={cancelDelete}
      >
        <TouchableWithoutFeedback onPress={cancelDelete}>
          <View style={styles.confirmModalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.confirmModalContainer}>
                <Text style={styles.confirmModalTitle}>Do you want to delete this item?</Text>
                <View style={styles.confirmModalButtons}>
                  <TouchableOpacity 
                    style={[styles.confirmModalButton, styles.cancelButton]}
                    onPress={cancelDelete}
                  >
                    <Text style={styles.cancelButtonText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.confirmModalButton, styles.confirmButton]}
                    onPress={confirmDelete}
                  >
                    <Text style={styles.confirmButtonText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: RFPercentage(2.5),
    marginTop: RFPercentage(2),
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#01615F",
  },
  tabText: {
    fontFamily: "Poppins-Medium",
    color: "#666666",
    fontSize: 14,
  },
  activeTabText: {
    color: "#01615F",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60, 
    right: 16,
    width: 200,
    backgroundColor: 'transparent',
  },
  filterDropdownContainer: {
    position: 'absolute',
    top: 120,
    right: 16,
    width: 200,
    backgroundColor: 'transparent',
  },
  dropdownContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  modalButtonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333333",
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  noImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#A0A0A0',
    fontFamily: 'Poppins-Regular',
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  availabilityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#01615F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  editButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  confirmModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  confirmModalTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E5E5E5',
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#333333',
  },
  confirmButton: {
    backgroundColor: '#FF3B30',
  },
  confirmButtonText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
});

export default Menu;