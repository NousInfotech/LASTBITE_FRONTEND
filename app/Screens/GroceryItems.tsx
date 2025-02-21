import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Switch,
  Modal,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { useGroceries, useDeleteGrocery } from "@/api/queryHooks"; 
import { GroceryItem } from "@/api/types";

const Menu = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GroceryItem | null>(null);

  const { data: menuItems = [], isLoading, error, refetch } = useGroceries(); // Fetching data
  const deleteGrocery = useDeleteGrocery(); // Mutation for delete API

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

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading groceries</Text>;
  }

  const openDeleteModal = (item: GroceryItem) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const deleteItem = async () => {
    if (selectedItem) {
      try {
        await deleteGrocery.mutateAsync(selectedItem._id);
        setIsModalVisible(false);
        refetch(); // Refresh the list after deletion
      } catch (err) {
        console.error("Error deleting item:", err);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.menuList}>
          {menuItems.map((item) => (
            <View key={item._id} style={styles.menuItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <View style={styles.nameContainer}>
                  <Text style={styles.itemName}>{item.itemName}</Text>
                </View>
                <Text style={styles.itemType}>{item.quantity} Kg</Text>
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
                    onValueChange={() => {}}
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
                        pathname: "/Screens/EditGrocery",
                        params: {
                          id: item._id , // Ensure correct key
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
            console.log("Closing Modal");
            setIsModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Are you sure you want to delete?
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
    fontSize: 12,
    color: "#333333",
  },
  vegIcon: {
    width: 14,
    height: 14,
    //   marginLeft: 4,
  },
  itemType: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
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
    fontSize: 10,
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
    fontSize: 10,
    fontFamily: "Poppins-Medium",
  },
  editButton: {
    borderColor: "#01615F",
  },
  editButtonText: {
    fontSize: 10,
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
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 12,
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
