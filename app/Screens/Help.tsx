import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const Help = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showRefunds, setShowRefunds] = useState(false);

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
    return null; // Optionally, show a loading screen or placeholder
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      {showRefunds ? (
        <View style={styles.container_A}>
        <View style={styles.card}>
          {/* Header Section */}
          <View style={styles.header_A}>
            <Text style={styles.storeName}>Spice House</Text>
            <Text style={styles.status}>Completed <Ionicons name="checkmark-circle" size={16} color="#008000" /></Text>
          </View>
  
          <Text style={styles.paymentMethod}>To: UPI</Text>
          <Text style={styles.completedOn}>Completed On: <Text style={styles.boldText}>15 Nov 2024</Text></Text>
          <Text style={styles.amount}>₹280.00</Text>
  
          <TouchableOpacity style={styles.orderIdContainer}>
            <Text style={styles.orderId}>Order ID: <Text style={styles.boldText}>#56789</Text></Text>
            <Ionicons name="chevron-forward" size={16} color="#777" />
          </TouchableOpacity>
  
          {/* Refund Timeline */}
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={styles.circle} />
              <View style={styles.timelineText}>
                <Text style={styles.timelineTitle}>Last Bites has initiated your refund</Text>
                <Text style={styles.timelineDate}>15 Nov 2024</Text>
                <Text style={styles.completedText}>Completed</Text>
              </View>
            </View>
  
            <View style={styles.timelineItem}>
              <View style={styles.circle} />
              <View style={styles.timelineText}>
                <Text style={styles.timelineTitle}>Your bank has processed your refund</Text>
                <Text style={styles.timelineDate}>15 Nov 2024</Text>
                <Text style={styles.completedText}>Completed</Text>
              </View>
            </View>
  
            <View style={styles.timelineItem}>
              <View style={styles.circle} />
              <View style={styles.timelineText}>
                <Text style={styles.timelineTitle}>Refund credited to your account</Text>
                <Text style={styles.timelineDate}>15 Nov 2024</Text>
                <Text style={styles.completedDescription}>
                  Completed: The refund amount should reflect in your account by now. 
                  If there is an issue, please contact your bank's customer support.
                </Text>
              </View>
            </View>
          </View>
  
          {/* Confirmation Section */}
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>Did you receive Your Refund?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.yesButton}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
  
          {/* Back Button */}
          <TouchableOpacity onPress={() => setShowRefunds(false)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={16} color="#01615F" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      ) : (
        <>
          <View style={styles.refundContainer}>
            <View style={styles.refundContent}>
              <View>
                <Text style={styles.refundText}>You have 1 Active Refund</Text>
                <TouchableOpacity
                  style={styles.viewRefundButton}
                  onPress={() => setShowRefunds(true)}
                >
                  <View style={styles.viewRefundContent}>
                    <Text style={styles.viewRefundText}>View All Refunds</Text>
                    <Ionicons name="chevron-forward" size={16} color="#01615F" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.imageWrapper}>
                <Image
                  source={require("../../assets/images/Transaction.png")}
                  style={styles.transactionImage}
                />
              </View>
            </View>
          </View>

          {/* Recent Order Section */}
          <View style={styles.orderContainer}>
            <Text style={styles.orderTitle}>Recent Order</Text>
            <View style={styles.orderDetails}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.restaurantName}>Biryani Central</Text>
                  <Text style={styles.orderInfo}>Indiranagar, Bangalore</Text>
                </View>
                <View style={styles.orderMeta}>
                  <Text style={styles.orderAmount}>₹250</Text>
                  <Text style={styles.orderDate}>12th Nov 2024, 7:30 PM</Text>
                </View>
              </View>
              <Text style={styles.itemsText}>Items</Text>
              <Text style={styles.itemsDetails}>
                Spicy Chicken Biryani - 1 Plate, Raita - 1 Cup & Gulab Jamun - 2 Pieces
              </Text>
            </View>
          </View>

          {/* Help with Other Queries */}
          <View style={styles.queriesContainer}>
            <Text style={styles.queriesTitle}>Help with Other Queries</Text>

            <TouchableOpacity style={styles.queryButton}>
              <View style={styles.queryContent}>
                <Text style={styles.queryButtonText}>General issues</Text>
                <Ionicons name="chevron-forward" size={16} color="#777" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.queryButton}>
              <View style={styles.queryContent}>
                <Text style={styles.queryButtonText}>FAQs</Text>
                <Ionicons name="chevron-forward" size={16} color="#777" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.queryButton}>
              <View style={styles.queryContent}>
                <Text style={styles.queryButtonText}>Instant Onboarding</Text>
                <Ionicons name="chevron-forward" size={16} color="#777" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.queryButton}>
              <View style={styles.queryContent}>
                <Text style={styles.queryButtonText}>Legal Terms & Conditions</Text>
                <Ionicons name="chevron-forward" size={16} color="#777" />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Help;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  refundContainer: {
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  refundContent: {
    flexDirection: "row", // Align text + button and image in one row
    alignItems: "center", // Align items vertically
    justifyContent: "space-between", // Push items apart
  },
  refundText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  viewRefundButton: {
    marginTop: 4,
  },
  viewRefundContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewRefundText: {
    color: "#01615F",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    marginRight: 4, // Space between text and chevron
  },
  imageWrapper: {
    width: 50, // Circle width
    height: 50, // Circle height
    borderRadius: 25, // Half of width & height to make it circular
    backgroundColor: "#EFFFF4", // Light green background
    justifyContent: "center", // Center the image
    alignItems: "center",
  },
  transactionImage: {
    width: 30, // Adjust size as needed
    height: 30,
    resizeMode: "contain",
  },

  orderContainer: {
    padding: 16,
  },
  orderTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  orderDetails: {
    padding: 16,
    marginTop: 16,
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantName: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  orderInfo: {
    fontSize: 13,
    color: "#777",
    fontFamily: "Poppins-Regular",
  },
  orderMeta: {
    alignItems: "flex-end",
  },
  orderAmount: {
    fontSize: 14,
    color: "#01615F",
    fontFamily: "Poppins-Medium",
  },
  orderDate: {
    fontSize: 11,
    color: "#777",
    fontFamily: "Poppins-Regular",
  },
  itemsText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginTop: 16,
  },
  itemsDetails: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginTop: 4,
    color: "#777",
  },

  queriesContainer: {
    marginHorizontal: 16,
  },
  queriesTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  queryButton: {
    padding: 10,
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  queryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  queryButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    paddingHorizontal: 16,
  },

  container_A: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header_A: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "#01615F",
    fontWeight: "bold",
  },
  paymentMethod: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  completedOn: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  boldText: {
    fontWeight: "bold",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  orderIdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  orderId: {
    fontSize: 14,
    color: "#555",
  },
  timeline: {
    marginTop: 16,
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#01615F",
    marginTop: 5,
    marginRight: 12,
  },
  timelineText: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  timelineDate: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  completedText: {
    fontSize: 12,
    color: "#01615F",
    marginTop: 2,
    fontWeight: "bold",
  },
  completedDescription: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  confirmationContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  confirmationText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  yesButton: {
    backgroundColor: "#01615F",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  noButton: {
    backgroundColor: "#01615F",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    alignSelf: "center",
  },
  backText: {
    fontSize: 14,
    color: "#01615F",
    marginLeft: 4,
    fontWeight: "bold",
  },
});
