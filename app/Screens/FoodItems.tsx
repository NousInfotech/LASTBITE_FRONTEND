import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Switch,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
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

  useEffect(() => {
    console.log("Modal State Changed:", isModalVisible);
  }, [isModalVisible]);

  const toggleAvailability = (itemId: string) => {
    setMenuItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  const openDeleteModal = (item: MenuItem) => {
    console.log("Opening Modal for:", item); // Debugging
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const deleteItem = () => {
    if (selectedItem) {
      setMenuItems((items) =>
        items.filter((item) => item.id !== selectedItem.id)
      );
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.menuList}>
          {menuItems
            .filter((item) => item.category === activeTab)
            .map((item) => (
              <View key={item.id} style={styles.menuItem}>
                <View style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Image
                    source={
                      item.isVeg
                        ? require("../../assets/images/Veg.png")
                        : require("../../assets/images/NonVeg.png")
                    }
                    style={styles.vegIcon}
                  />
                  <View style={styles.nameContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>
                  <Text style={styles.itemType}>
                    {item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                  </Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
                <View style={styles.rightContainer}>
                  <View style={styles.statusContainer}>
                    <Text
                      style={[
                        styles.availabilityText,
                        !item.available && styles.outOfStockText,
                      ]}
                    >
                      {item.available ? "Available" : "Out of Stock"}
                    </Text>
                    <Switch
                      value={item.available}
                      onValueChange={() => toggleAvailability(item.id)}
                      trackColor={{ false: "#E5E5E5", true: "#01615F" }}
                      thumbColor={"#FFFFFF"}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => openDeleteModal(item)}
                    >
                      <Text style={styles.actionButtonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() =>
                        router.push({
                          pathname: "/Screens/EditFood",
                          params: {
                            id: item.id,
                            name: item.name,
                            price: item.price.toString(), 
                            available: item.available.toString(), 
                            category: item.category,
                            isVeg: item.isVeg.toString(), 
                          },
                        })
                      }
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            console.log("Closing Modal"); // Debugging
            setIsModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Are you sure want to delete?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.cancelbuttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.confirmButton]}
                  onPress={deleteItem}
                >
                  <Text style={[styles.buttonText, { color: "#FFF" }]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#E5E5E5",
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: RFPercentage(2),
    color: "#333333",
  },
  vegIcon: {
    width: 14,
    height: 14,
    //   marginLeft: 4,
  },
  itemType: {
    fontFamily: "Poppins-Regular",
    fontSize: RFPercentage(1.3),
    color: "#666666",
    marginTop: 2,
  },
  itemPrice: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#01615F",
    marginTop: 4,
  },
  rightContainer: {
    position: "absolute",
    top: -4,
    right: 4,
    alignItems: "flex-end",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },

  availabilityText: {
    fontSize: RFPercentage(1.3),
    fontFamily: "Poppins-Regular",
    color: "#01615F",
  },
  outOfStockText: {
    color: "#FF0000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginRight: 4,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FF0000",
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FF0000",
    fontSize: RFPercentage(1.3),
    fontFamily: "Poppins-Medium",
  },
  editButton: {
    borderColor: "#01615F",
  },
  editButtonText: {
    fontSize: RFPercentage(1.3),
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#FFFFF",
  },
  confirmButton: {
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#000",
  },
  cancelbuttonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "red",
  },
});

export default Menu;
