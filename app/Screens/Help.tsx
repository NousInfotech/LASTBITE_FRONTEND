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
import Icon from "react-native-vector-icons/Feather";
import { RFPercentage } from "react-native-responsive-fontsize";

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
    return null;
  }


  const navigateToGeneralIssues = () => {
    router.push('/Screens/GeneralIssues');
  };

  const navigateToFaq = () => {
    router.push('/Screens/Faq');
  };

  const navigateToInstamartOnboarding = () => {
    router.push('/Screens/InstamartOnboarding');
  };

  const navigateToLegalRegulations = () => {
    router.push('/Screens/LegalRegulations');
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        {showRefunds ? (
          <TouchableOpacity
            onPress={() => setShowRefunds(false)}
            style={{ padding: 8, marginLeft: -8 }}
            activeOpacity={0.7}
          >
            <Icon name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <GoBack />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      {showRefunds ? (
        <View style={styles.container_A}>
          <View style={styles.card}>
            <View style={styles.header_A}>
              <Text style={styles.storeName}>Spice House</Text>
              <View style={styles.statusContainer}>
                <Text style={styles.status}>Completed</Text>
                <Image
                  source={require("../../assets/images/tick.png")}
                  style={styles.tickImage}
                />
              </View>
            </View>

            <Text style={styles.paymentMethod}>
              <Text style={styles.boldText}>To:</Text> UPI
            </Text>
            <View style={styles.completedRow}>
              <Text style={styles.completedOn}>
                <Text style={styles.boldText}>Completed On:</Text> 15 Nov 2024
              </Text>
              <Text style={styles.amount}>₹280.00</Text>
            </View>

            <TouchableOpacity style={styles.orderIdContainer}>
              <Text style={styles.orderId}>
                Order ID: <Text style={styles.boldText}>#56789</Text>
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#777" />
            </TouchableOpacity>

            {/* Refund Timeline */}
            <View style={styles.timeline}>
              <View style={styles.timelineItem}>
                <View style={styles.circle} />
                <View style={styles.timelineText}>
                  <Text style={styles.timelineTitle}>
                    Last Bites has initiated your refund
                  </Text>
                  <Text style={styles.timelineDate}>15 Nov 2024</Text>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>

              <View style={styles.timelineItem}>
                <View style={styles.circle} />
                <View style={styles.timelineText}>
                  <Text style={styles.timelineTitle}>
                    Your bank has processed your refund
                  </Text>
                  <Text style={styles.timelineDate}>15 Nov 2024</Text>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>

              <View style={styles.timelineItem}>
                <View style={styles.circle} />
                <View style={styles.timelineText}>
                  <Text style={styles.timelineTitle}>
                    Refund credited to your account
                  </Text>
                  <Text style={styles.timelineDate}>15 Nov 2024</Text>
                  <Text style={styles.completedDescription}>
                    Completed: The refund amount should reflect in your account
                    by now. If there is an issue, please contact your bank's
                    customer support.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>
              Did you receive Your Refund?
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.yesButton}>
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../assets/images/Thumbs_up.png")}
                    style={styles.thumbImage}
                  />
                  <Text style={styles.buttonText}>Yes</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton}>
                <View style={styles.buttonContent}>
                  <Image
                    source={require("../../assets/images/Thumbs_down.png")}
                    style={styles.thumbImage}
                  />
                  <Text style={styles.buttonText}>No</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* <TouchableOpacity
            onPress={() => setShowRefunds(false)}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={16} color="#01615F" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity> */}
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
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="#01615F"
                    />
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
                Spicy Chicken Biryani - 1 Plate, Raita - 1 Cup & Gulab Jamun - 2
                Pieces
              </Text>
            </View>
          </View>

          {/* Help with Other Queries */}
          <View style={styles.queriesContainer}>
            <Text style={styles.queriesTitle}>Help with Other Queries</Text>

            <TouchableOpacity style={styles.queryButton} onPress={navigateToGeneralIssues}>
              <View style={styles.queryContent}>
                <Text style={styles.queryButtonText}>General issues</Text>
                <Ionicons name="chevron-forward" size={16} color="#777" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.queryButton} onPress={navigateToFaq}>
              <View style={styles.queryContent}>
                <Text style={styles.queryButtonText}>FAQs</Text>
                <Ionicons name="chevron-forward" size={16} color="#777" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.queryButton} onPress={navigateToInstamartOnboarding}>
              <View style={styles.queryContent}>
                <Text style={styles.queryButtonText}>Instamart Onboarding</Text>
                <Ionicons name="chevron-forward" size={16} color="#777" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.queryButton} onPress={navigateToLegalRegulations}>
              <View style={styles.queryContent}>
                <Text style={styles.queryButtonText}>
                  Legal Terms & Conditions
                </Text>
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
    fontSize: RFPercentage(2),
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
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    marginTop: 16,
  },
  itemsDetails: {
    fontSize: RFPercentage(2),
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
    backgroundColor: "#FFF",
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
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // Ensures spacing between text and image
  },

  status: {
    fontSize: 14,
    color: "#01615F",
    fontWeight: "bold",
  },
  tickImage: {
    width: 18, // Adjust size as needed
    height: 18,
    resizeMode: "contain",
  },

  paymentMethod: {
    fontSize: RFPercentage(2),
    color: "#555",
    marginTop: 16,
  },
  completedOn: {
    fontSize: RFPercentage(2),
    color: "#555",
    marginTop: 4,
  },
  boldText: {
    fontFamily: "Poppins-SemiBold",
  },
  amount: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    color: "#000",
  },
  completedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  orderIdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
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
    fontSize: RFPercentage(2),
    color: "#777",
    marginTop: 2,
  },
  completedText: {
    fontSize: RFPercentage(2),
    marginTop: 2,
    color: "#333",
  },
  completedDescription: {
    fontSize: RFPercentage(2),
    color: "#777",
    marginTop: 4,
  },
  confirmationContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 6,
  },
  confirmationText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 0,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0, // Adds space between image and text
  },
  thumbImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  yesButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  noButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 14,
    color: "#01615F",
    fontFamily: "Poppins-Medium",
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
