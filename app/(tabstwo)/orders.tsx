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
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

const Orders = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");

  const tabs = ["All", "Preparing", "Packing", "Hand Over", "Handed Over" , "Deleivered"];
  const allOrders = [
    { id: "#136558-19", time: "05:16 PM", items: 2, amount: 500, status: "New" },
    { id: "#136558-20", time: "05:45 PM", items: 3, amount: 750, status: "Packing" },
    { id: "#136558-21", time: "06:00 PM", items: 1, amount: 250, status: "Delivered" },
  ];
  
  const filteredOrders = selectedTab === "All" ? allOrders : allOrders.filter(order => order.status === selectedTab);
  
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.selectedTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Orders List */}
      <ScrollView style={styles.ordersList}>
        {/* New Order */}
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
    fontSize: 16,
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
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 20,
    borderWidth:1,
    borderColor:"#666",
  },
  selectedTab: {
    backgroundColor: "#01615F",
    borderRadius: 20,
  },
  tabText: {
    fontFamily: "Poppins-Medium",
    color: "#666666",
  },
  selectedTabText: {
    color: "#FFFFFF",
  },
  ordersList: {
    padding: 16,
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

export default Orders;