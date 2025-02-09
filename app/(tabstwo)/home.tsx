import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import LocationHeader from "@/components/LocationHeader";
import SearchBarVoice from "@/components/SearchBarVoice";

const Home = () => {
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
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={require("../../assets/images/order-1.png")} style={styles.icon} />
            </View>
            <Text style={styles.label}>Orders Today</Text>
            <Text style={styles.value}>20</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={require("../../assets/images/star.png")} style={styles.icon} />
            </View>
            <Text style={styles.label}>Average Rating</Text>
            <Text style={styles.value}>₹500</Text>
          </View>
        </View>
        <View style={styles.singleCardContainer}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={require("../../assets/images/cash.png")} style={styles.icon} />
            </View>
            <Text style={styles.label}>Pending Payments</Text>
            <Text style={styles.value}>2</Text>
          </View>
        </View>

        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Orders Today</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Order Cards */}
        <View style={styles.orderCards}>
          {/* New Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>Order ID: #136558-19</Text>
                <Text style={styles.orderTime}>05:16 PM | 2 items for ₹500</Text>
              </View>
              <Text style={styles.orderAmount}>₹500</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm Order</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Delivered Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
              <View style={styles.statusRow}>
              <Text style={styles.status}>🚚 Order Delivered</Text>
            </View>
                <Text style={styles.orderId}>Order ID: #136558-19</Text>
                <Text style={styles.orderTime}>05:16 PM | 2 items for ₹500</Text>
              </View>
              <Text style={styles.orderAmount}>₹500</Text>
            </View>
          
            <TouchableOpacity style={styles.singleButton}>
              <Text style={styles.viewButtonText}>View Order</Text>
            </TouchableOpacity>
          </View>

          {/* Packing Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
              <View style={styles.statusRow}>
              <Text style={styles.status}>📦 Packing</Text>
            </View>
                <Text style={styles.orderId}>Order ID: #136558-19</Text>
                <Text style={styles.orderTime}>05:16 PM | 2 items for ₹500</Text>
              </View>
              <Text style={styles.orderAmount}>₹500</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.confirmButtonText}>Order Packed</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Preparing Order */}
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>Order ID: #136558-19</Text>
                <Text style={styles.orderTime}>05:16 PM | 2 items for ₹500</Text>
              </View>
              <Text style={styles.orderAmount}>₹500</Text>
            </View>
            {/* <View style={styles.statusRow}>
              <Text style={styles.preparingStatus}>👨‍🍳 Preparing</Text>
              <Text style={styles.prepTime}>Preparation Time: 18 mins</Text>
            </View> */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.confirmButtonText}>Order Prepared</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    width: "48%", // To make them sit side by side
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
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
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
    fontWeight: "500",
    color: "#000",
  },
  orderTime: {
    fontSize: 12,
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
    fontWeight: "500",
    color: "#01615F",
  },

  preparingStatus: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2196F3",
  },
  prepTime: {
    fontSize: 12,
    color: "#666666",
  },
  singleButton: {
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#01615F",
    alignItems: "center",
  },
});

export default Home;