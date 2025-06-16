import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import LocationHeader from "@/components/LocationHeader";
import SearchBarVoice from "@/components/SearchBarVoice";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const [prepTime, setPrepTime] = useState(15);
  const [modalVisible, setModalVisible] = useState(false);
 const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const orderNumber = "136558-19";

  const handleViewOrder = () => {
    router.push("/Screens/ViewOrder");
  };

 const handleConfirmOrder = (orderId: string) => {
  setSelectedOrderId(orderId);
  setModalVisible(true);
};

  const decrementPrepTime = () => {
    if (prepTime > 5) {
      setPrepTime(prepTime - 5);
    }
  };

  const incrementPrepTime = () => {
    if (prepTime < 60) {
      setPrepTime(prepTime + 5);
    }
  };

  const confirmPreparationTime = () => {
    console.log(
      `Order ${selectedOrderId} confirmed with preparation time: ${prepTime} minutes`
    );
    setModalVisible(false);
    router.push("/Screens/ViewOrder");
  };

  const navigateToOrdersToday = () => {
    router.push("/Screens/OrdersToday");
  };

  const navigateToAvgRating = () => {
    router.push("/Screens/RatingReview");
  };

  const navigateToPayments = () => {
    router.push("/(tabstwo)/payment");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <LocationHeader />
      <SearchBarVoice
        onInputPress={() => {}}
        redirectTargets={["Dishes", "Restaurants"]}
        placeholder="Search...."
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={navigateToOrdersToday} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/order-1.png")}
                style={styles.icon}
              />
            </View>
            <Text allowFontScaling={false}  style={styles.label}>Orders Today</Text>
            <Text allowFontScaling={false}  style={styles.value}>20</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={navigateToAvgRating}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/Star.png")}
                style={styles.icon}
              />
            </View>
            <Text allowFontScaling={false}  style={styles.label}>Average Rating</Text>
            <Text allowFontScaling={false}  style={styles.value}>₹500</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.singleCardContainer}>
          <TouchableOpacity style={styles.card} onPress={navigateToPayments}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/cash.png")}
                style={styles.icon}
              />
            </View>
            <Text allowFontScaling={false}  style={styles.label}>Pending Payments</Text>
            <Text allowFontScaling={false}  style={styles.value}>2</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerRow}>
          <Text allowFontScaling={false}  style={styles.sectionTitle}>Orders Today</Text>
          <TouchableOpacity>
            <Text allowFontScaling={false}  style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Order Cards */}
        <View style={styles.orderCards}>
          {/* New Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text allowFontScaling={false}  style={styles.orderId}>
                  Order ID:{" "}
                  <Text allowFontScaling={false}  style={styles.orderNumber}>#{orderNumber}</Text>
                </Text>
                <Text allowFontScaling={false}  style={styles.orderTime}>
                  05:16 PM | 2 items for ₹500
                </Text>
              </View>
              <Text allowFontScaling={false}  style={styles.orderAmount}>₹500</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={handleViewOrder}
              >
                <Text allowFontScaling={false}  style={styles.viewButtonText}>View Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => handleConfirmOrder("#136558-19")}
              >
                <Text allowFontScaling={false}  style={styles.confirmButtonText}>Confirm Order</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Delivered Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <View style={styles.statusRow}>
                  <Text allowFontScaling={false}  style={styles.status}>🚚 Order Delivered</Text>
                </View>
                <Text allowFontScaling={false}  style={styles.orderId}>
                  Order ID:{" "}
                  <Text allowFontScaling={false}  style={styles.orderNumber}>#{orderNumber}</Text>
                </Text>
                <Text allowFontScaling={false}  style={styles.orderTime}>
                  05:16 PM | 2 items for ₹500
                </Text>
              </View>
              <Text allowFontScaling={false}  style={styles.orderAmount}>₹500</Text>
            </View>

            <TouchableOpacity
              style={styles.singleButton}
              onPress={handleViewOrder}
            >
              <Text allowFontScaling={false}  style={styles.viewButtonText}>View Order</Text>
            </TouchableOpacity>
          </View>

          {/* Packing Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <View style={styles.statusRow}>
                  <Text allowFontScaling={false}  style={styles.status}>📦 Packing</Text>
                </View>
                <Text allowFontScaling={false}  style={styles.orderId}>
                  Order ID:{" "}
                  <Text allowFontScaling={false}  style={styles.orderNumber}>#{orderNumber}</Text>
                </Text>
                <Text allowFontScaling={false}  style={styles.orderTime}>
                  05:16 PM | 2 items for ₹500
                </Text>
              </View>
              <Text allowFontScaling={false}  style={styles.orderAmount}>₹500</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={handleViewOrder}
              >
                <Text allowFontScaling={false}  style={styles.viewButtonText}>View Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text allowFontScaling={false}  style={styles.confirmButtonText}>Order Packed</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Preparing Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
              <Text allowFontScaling={false}  style={styles.orderId}>
                  Order ID:{" "}
                  <Text allowFontScaling={false}  style={styles.orderNumber}>#{orderNumber}</Text>
                </Text>
                <Text allowFontScaling={false}  style={styles.orderTime}>
                  05:16 PM | 2 items for ₹500
                </Text>
              </View>
              <Text allowFontScaling={false}  style={styles.orderAmount}>₹500</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={handleViewOrder}
              >
                <Text allowFontScaling={false}  style={styles.viewButtonText}>View Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text allowFontScaling={false}  style={styles.confirmButtonText}>Order Prepared</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Preparation Time Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text allowFontScaling={false}  style={styles.modalTitle}>
              How long will this take to prepare?
            </Text>

            <View style={styles.timeSelector}>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={decrementPrepTime}
              >
                <Text allowFontScaling={false}  style={styles.timeButtonText}>-</Text>
              </TouchableOpacity>

              <View style={styles.timeDisplay}>
                <Text allowFontScaling={false}  style={styles.timeText}>{prepTime} MINS</Text>
              </View>

              <TouchableOpacity
                style={styles.timeButton}
                onPress={incrementPrepTime}
              >
                <Text allowFontScaling={false}  style={styles.timeButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={confirmPreparationTime}
            >
              <Text allowFontScaling={false}  style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  singleCardContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#01615F",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    alignItems: "center",
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#E9F2EE",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  value: {
    color: "#fff",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: RFPercentage(2),
    fontWeight: "600",
    color: "#000",
  },
  viewAll: {
    fontSize: 14,
    color: "#01615F",
    fontWeight: "500",
  },
  orderCards: {
    gap: 16,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  orderNumber: {
    color: "#01615F",
    fontWeight: "700",
  },
  orderTime: {
    fontSize: RFPercentage(2),
    color: "#666666",
    marginTop: 4,
  },
  orderAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#01615F",
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: "#01615F",
    alignItems: "center",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: "#01615F",
    alignItems: "center",
  },
  viewButtonText: {
    color: "#01615F",
    fontSize: 14,
    fontWeight: "500",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: "700",
    color: "#01615F",
  },
  preparingStatus: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2196F3",
  },
  prepTime: {
    fontSize: RFPercentage(2),
    color: "#666666",
  },
  singleButton: {
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#01615F",
    alignItems: "center",
  },

  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 20,
    textAlign: "center",
  },
  timeSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  timeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#01615F",
    alignItems: "center",
    justifyContent: "center",
  },
  timeButtonText: {
    fontSize: 20,
    color: "#01615F",
    fontWeight: "500",
  },
  timeDisplay: {
    paddingHorizontal: 20,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  doneButton: {
    width: "100%",
    backgroundColor: "#01615F",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Home;
