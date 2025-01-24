import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import GoBack from "@/components/GoBack"; // Replace with your back button component
import { useRouter } from "expo-router";
import * as Font from "expo-font";

// Define interfaces for active and past orders
interface Order {
  restaurant: string;
  location: string;
  price: string;
  item: string;
  orderTime: string;
}

interface PastOrder extends Order {
  status: string;
  rating?: number; 
  feedback?: string; 
  ratingDel?: number;
  feedbackDel?:string;
}


const Orders: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order>({
    restaurant: "Nawabi Biryani & Tandoor (Unit of NUTRI VALLEY)",
    location: "Muhammadpur",
    price: "₹149",
    item: "Chicken Egg Biryani (1)",
    orderTime: "September 9, 8:54 PM",
  });

  const [pastOrders, setPastOrders] = useState<PastOrder[]>([
    {
      restaurant: "Nawabi Biryani & Tandoor (Unit of NUTRI VALLEY)",
      location: "Muhammadpur",
      price: "₹149",
      item: "Chicken Egg Biryani (1)",
      orderTime: "September 9, 8:54 PM",
      status: "Delivered",
    },
    {
      restaurant: "Nawabi Biryani & Tandoor (Unit of NUTRI VALLEY)",
      location: "Muhammadpur",
      price: "₹149",
      item: "Chicken Egg Biryani (1)",
      orderTime: "September 9, 8:54 PM",
      status: "Delivered",
      rating: 4.0,
      feedback: "Good",
      ratingDel: 3.0,
      feedbackDel:"Loved it",
    },
  ]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally show a loading placeholder
  }

  const renderOrder = (order: Order | PastOrder, isPast: boolean = false) => (
    <View style={styles.orderCard} key={order.orderTime}>
      <View style={styles.row}>
        <Text style={styles.restaurantName}>{order.restaurant}</Text>
        {isPast && "status" in order && order.status === "Delivered" && (
          <Text style={styles.orderStatus}>{order.status}</Text>
        )}
      </View>
      <Text style={styles.orderDetails}>{order.location}</Text>
      <Text style={styles.orderDetails}>Price: {order.price}</Text>
      {isPast && <View style={styles.horizontalLine} />}
      <Text style={styles.orderItem}>{order.item}</Text>
      <Text style={styles.orderTime}>Order placed: {order.orderTime}</Text>
      <View style={styles.orderActions}>
        {isPast && "rating" in order ? (
          <View style={styles.ratedOrderContainer}>
            <TouchableOpacity style={styles.fullWidthButton}>
              <Text style={styles.actionText}>Reorder</Text>
            </TouchableOpacity>
            <View style={styles.ratingsRow}>
              <View style={styles.ratingGroup}>
                <Text style={styles.ratingLabel}>You rating for Delivery</Text>
                <View style={styles.ratingValue}>
                  <Text style={styles.ratingNumber}>{order.rating}</Text>
                  <Text style={styles.starIcon}> ⭐ </Text>
                  <Text style={styles.feedbackText}>| {order.feedback}</Text>
                </View>
              </View>
              <View style={[styles.ratingGroup, styles.secondRatingGroup]}>
                <Text style={styles.ratingLabel}>You Food Rating</Text>
                <View style={styles.ratingValue}>
                  <Text style={styles.ratingNumber}>{order.ratingDel}</Text>
                  <Text style={styles.starIcon}> ⭐ </Text>
                  <Text style={styles.feedbackText}> | {order.feedbackDel}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <>
            {isPast ? (
              <>
                <TouchableOpacity style={styles.actionButton}
                onPress={() => router.push("/Screens/BillingScreen")}
                >
                  <Text style={styles.actionText}>Reorder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.rateButton]}
                onPress={() => router.push("/Screens/RateOrder")}
                >
                  <Text style={styles.mainText}>Rate Order</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.actionButton}
                 onPress={() => router.push("/Screens/HelpOrder")}
                >
                  <Text style={styles.actionText}>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.trackButton]}>
                  <Text style={styles.mainText}>Track Order</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
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
        <Text style={styles.headerTitle}>Orders</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Active Order</Text>
        {renderOrder(activeOrder)}

        <Text style={styles.sectionTitle}>Past Orders</Text>
        {pastOrders.map((order) => renderOrder(order, true))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;

// Exact color and font styling based on the design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  content: {
    padding: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    marginVertical: 6,
    color: "#555555",
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  restaurantName: {
    fontSize: 15,
    fontFamily: "Poppins-Bold",
    color: "#333333",
    flex: 1,
  },
  orderDetails: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#777777",
    marginVertical: 2,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginVertical: 10,
  },
  orderItem: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#444444",
    marginVertical: 6,
  },
  orderTime: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    color: "#01615F",
    marginLeft: 8,
  },
  orderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 6,
    borderColor: "#01615F",
    borderWidth: 1,
    alignItems: "center",
    marginRight: 8,
  },
  trackButton: {
    backgroundColor: "#01615F",
  },
  rateButton: {
    backgroundColor: "#01615F",
  },
  actionText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
  mainText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#FFF",
  },
  fullWidthButton: {
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 6,
    borderColor: "#01615F",
    borderWidth: 1,
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  ratedOrderContainer: {
    width: "100%",
  },
  ratingsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  ratingGroup: {
    flex: 1,
  },
  secondRatingGroup: {
    marginLeft: 16,
  },
  ratingLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    marginBottom: 4,
  },
  ratingValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNumber: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  starIcon: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  feedbackText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
  },
});