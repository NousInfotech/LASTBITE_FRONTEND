import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GoBack from "@/components/GoBack";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState("All");
  
  const tabs = [
    "All",
    "Unconfirmed",
    "Order Prepared",
    "Order Packed",
    "Hand Over",
    "Picked",
    "Delivered",
  ];

  // Define the status sequence
  const statusSequence = [
    "Unconfirmed",
    "Order Prepared",
    "Order Packed",
    "Hand Over", 
    "Picked",
    "Delivered"
  ];

  // Define button text for each status (showing the NEXT action)
  const buttonTextMap = {
    "Unconfirmed": "Order Prepared",
    "Order Prepared": "Order Packed",
    "Order Packed": "Hand Over",
    "Hand Over": "Picked",
    "Picked": "Delivered"
  };
  
  // Initialize orders with current status
  const [orders, setOrders] = useState([
    {
      id: "#136558-19",
      date: "05/19 PM",
      items: 3,
      total: 300,
      status: "Order Packed",
      additionalInfo: null,
    },
    {
      id: "#136558-20",
      date: "05/19 PM",
      items: 3,
      total: 300,
      status: "Order Prepared",
      additionalInfo: {
        type: "time",
        value: "15 mins",
      },
    },
    {
      id: "#136558-21",
      date: "05/19 PM",
      items: 3,
      total: 300,
      status: "Hand Over",
      additionalInfo: {
        type: "info",
        value: "Delivery Partner Arrived",
      },
    },
    {
      id: "#136558-22",
      date: "05/19 PM",
      items: 3,
      total: 300,
      status: "Unconfirmed",
      additionalInfo: {
        type: "info",
        value: "",
      },
    },
    {
      id: "#136558-23",
      date: "05/19 PM",
      items: 3,
      total: 300,
      status: "Picked",
      additionalInfo: {
        type: "info",
        value: "Delivery Partner Arrived",
      },
    },
    {
      id: "#136558-24",
      date: "05/19 PM",
      items: 3,
      total: 300,
      status: "Delivered",
      additionalInfo: {
        type: "info",
        value: "Delivery Partner Arrived",
      },
    },
  ]);

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  // Function to handle status progression when button is clicked
  const handleStatusChange = (orderIndex) => {
    const updatedOrders = [...orders];
    const currentOrder = updatedOrders[orderIndex];
    
    // Find current status in the sequence
    const currentStatusIndex = statusSequence.indexOf(currentOrder.status);
    
    // Only proceed if not at the final stage (Delivered)
    if (currentStatusIndex < statusSequence.length - 1) {
      // Move to next status
      currentOrder.status = statusSequence[currentStatusIndex + 1];
      setOrders(updatedOrders);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Packed":
        return (
          <View style={[styles.statusIcon, styles.packingIcon]}>
            <Text>📦</Text>
          </View>
        );
      case "Order Prepared":
        return (
          <View style={[styles.statusIcon, styles.preparingIcon]}>
            <Text>🔄</Text>
          </View>
        );
      case "Hand Over":
        return (
          <View style={[styles.statusIcon, styles.handOverIcon]}>
            <Text>🤝</Text>
          </View>
        );
      case "Unconfirmed":
        return (
          <View style={[styles.statusIcon, styles.unconfirmedIcon]}>
            <Text>❓</Text>
          </View>
        );
      case "Picked":
        return (
          <View style={[styles.statusIcon, styles.pickedIcon]}>
            <Text>🔍</Text>
          </View>
        );
      case "Delivered":
        return (
          <View style={[styles.statusIcon, styles.deliveredIcon]}>
            <Text>✅</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderOrderCard = ({ item, index }) => {
    // Determine if we need to show the action button
    // We don't show the button for "Delivered" status as that's the final status
    const isDelivered = item.status === "Delivered";
    
    return (
      <View style={styles.orderCard}>
        {getStatusIcon(item.status)}
        <View style={styles.orderHeader}>
          <Text style={styles.orderLabel}>{item.status}</Text>
          {item.additionalInfo && (
            <Text style={styles.preparingInfo}>
              {item.additionalInfo.type === "time" ? "Preparation Time: " : ""}
              {item.additionalInfo.value}
            </Text>
          )}
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderId}>Order ID: {item.id}</Text>
          <Text style={styles.orderAmount}>₹{item.total}</Text>
        </View>
        <Text style={styles.orderMeta}>
          {item.date} | {item.items} items for ₹{item.total}.0
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Order</Text>
          </TouchableOpacity>

          {!isDelivered && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleStatusChange(index)}
            >
              <Text style={styles.actionButtonText}>
                {buttonTextMap[item.status]}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <GoBack />
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContainer}
          style={styles.tabContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ordersList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: RFPercentage(2),
    flex: 1,
    textAlign: 'left',
  },
  filterButton: {
    padding: 8,
    marginTop: RFPercentage(2),
    marginLeft: 'auto', 
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    paddingVertical: 12,
    marginRight: 20,
  },
  tabText: {
    fontSize: 14,
    color: "#9e9e9e",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "500",
    borderWidth: 2,
    borderColor: "#01615F",
    backgroundColor: "#01615F",
    borderRadius: 12,
    paddingHorizontal: RFPercentage(3),
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  packingIcon: {
    backgroundColor: "#FFF8E1",
  },
  preparingIcon: {
    backgroundColor: "#E1F5FE",
  },
  handOverIcon: {
    backgroundColor: "#E8F5E9",
  },
  unconfirmedIcon: {
    backgroundColor: "#F3E5F5",
  },
  pickedIcon: {
    backgroundColor: "#EDE7F6",
  },
  deliveredIcon: {
    backgroundColor: "#E8F5E9",
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  orderLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  preparingInfo: {
    fontSize: 12,
    color: "#757575",
    marginLeft: "auto",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  orderId: {
    fontSize: 15,
    fontWeight: "600",
  },
  orderAmount: {
    fontSize: 15,
    fontWeight: "600",
  },
  orderMeta: {
    fontSize: 13,
    color: "#757575",
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  viewButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: "center",
    marginRight: 8,
  },
  viewButtonText: {
    color: "#01615F",
    fontSize: 14,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#01615F",
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
