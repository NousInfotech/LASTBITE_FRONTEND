import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import GoBack from "@/components/GoBack";
import { RFPercentage } from "react-native-responsive-fontsize";

const Orders: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
   const [activeTab, setActiveTab] = useState<"currentOrder" | "delievered">("currentOrder");

  const tabs: string[] = ["Current Order", "Delivered"];

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

  const handleViewDetails =  () => {
    router.push('/Screens/ViewDetailsRiders')
  }

  const handleMap = () => {
    router.push('/(tabsthree)/map')
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Image
            source={require("../../assets/images/Filter.png")}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
     
 <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "currentOrder" && styles.activeTab]}
          onPress={() => setActiveTab("currentOrder")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "currentOrder" && styles.activeTabText,
            ]}
          >
            Current Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "delievered" && styles.activeTab]}
          onPress={() => setActiveTab("delievered")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "delievered" && styles.activeTabText,
            ]}
          >
            Delievered
          </Text>
        </TouchableOpacity>
      </View>
      {/* Orders List */}
      <ScrollView style={styles.ordersList}>
        {activeTab === "currentOrder" ? (
          <View style={styles.currentOrderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderStatus}>On the Way</Text>
              <Text style={styles.orderTime}>
                Remaining time:
                <Text style={styles.deliveryPlace}> 15 mins</Text>
              </Text>
            </View>

            <View style={styles.orderDetails}>
              <Text style={styles.earnings}>
                Estimated Earnings: <Text style={styles.amount}>₹40</Text>
              </Text>

              <Text style={styles.deliveryLocation}>
                Deliver at: <Text style={styles.deliveryPlace}>abc</Text>
              </Text>
            </View>
            <Text style={styles.deliveryInfo}>
              Time: 16 mins | Distance: 3.34 kms
            </Text>
            <View style={styles.orderActions}>
              <TouchableOpacity style={styles.mapButton} onPress={handleMap}>
                <Text style={styles.mapButtonText}>Map</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailsButton} onPress={handleViewDetails}>
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.currentOrderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderStatus}>Delievered</Text>
            <Text style={styles.orderTime}>
              Remaining time:
              <Text style={styles.deliveryPlace}> 15 mins</Text>
            </Text>
          </View>

          <View style={styles.orderDetails}>
            <Text style={styles.earnings}>
              Earnings: <Text style={styles.amount}>₹40</Text>
            </Text>

            <Text style={styles.deliveryLocation}>
              Delivered at: <Text style={styles.deliveryPlace}>abc</Text>
            </Text>
          </View>
          <Text style={styles.deliveryInfo}>
            Time: 16 mins | Distance: 3.34 kms
          </Text>
          <View style={styles.orderActions}>
            <TouchableOpacity style={styles.detailsButton} onPress={handleViewDetails}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
      </ScrollView>
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
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
    flex: 1,
  },
  filterButton: {
    padding: 8,
  },
  filterIcon: {
    width: 24,
    height: 24,
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
  ordersList: {
    padding: 16,
  },
  currentOrderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  orderStatus: {
    fontSize: RFPercentage(2),
    fontWeight: "600",
    color: "#01615F",
  },
  orderTime: {
    fontSize: 14,
    color: "#666666",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  earnings: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  deliveryInfo: {
    fontSize: RFPercentage(2),
    color: "#666666",
    marginBottom: 24,
  },
  deliveryLocation: {
    fontSize: 14,
    color: "#666666",
  },
  deliveryPlace: {
    fontWeight: "bold",
    color: "#333333",
  },
  orderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 6,
    paddingVertical: 12,
    flex: 1,
    marginRight: 10,
  },
  mapIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  mapButtonText: {
    color: "#01615F",
    fontSize: 14,
    fontWeight: "500",
  },
  detailsButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 6,
    paddingVertical: 12,
  },
  detailsButtonText: {
    color: "#01615F",
    fontSize: 14,
    fontWeight: "500",
  },
  amount: {
    color: "#01615F",
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
  },
});

export default Orders;
