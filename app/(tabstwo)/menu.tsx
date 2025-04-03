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
  Dimensions,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/MaterialIcons";
import FoodItems from "./../Screens/FoodItems";
import GroceryItems from "./../Screens/GroceryItems";
import { RFPercentage } from "react-native-responsive-fontsize";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  available: boolean;
  category: "food" | "grocery";
  isVeg: boolean;
}

const Menu = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"food" | "grocery">("food");
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "available" | "outOfStock">("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
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

  const openOptionsModal = () => setIsOptionsModalVisible(true);

  const openFilterModal = () => {
    setIsOptionsModalVisible(false);
    setIsFilterModalVisible(true);
  };

  const applyFilter = (filterType: "all" | "available" | "outOfStock") => {
    setFilter(filterType);
    setIsFilterModalVisible(false);
  };

  const filteredItems = menuItems.filter((item) => {
    if (filter === "available") return item.available;
    if (filter === "outOfStock") return !item.available;
    return true;
  });

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

      {activeTab === "food" ? <FoodItems /> : <GroceryItems />}

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
                  onPress={() => {
                    setIsOptionsModalVisible(false);
                    const targetScreen = activeTab === "food" ? "/Screens/AddFood" : "/Screens/AddGrocery";
                    router.push(targetScreen);
                  }}
                >
                  <Text style={styles.modalButtonText}>Add New Item</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalButton}
                  onPress={() => {
                    setIsOptionsModalVisible(false);
                    openFilterModal();
                  }}
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
    fontSize: RFPercentage(2),
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
});

export default Menu;