import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Added missing import
import Header from "@/components/GoBack";
import { RFPercentage } from "react-native-responsive-fontsize";

// Define types for better type safety
interface Order {
  id: string;
  time: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
  additionalInfo: {
    type: string;
    value: string;
  } | null;
}

type OrderStatus = "Unconfirmed" | "Order Prepared" | "Order Packed" | "Hand Over" | "Picked" | "Delivered";
type FilterType = "Today" | "Weekly" | "Monthly" | "Yearly" | "Reset";

export default function OrdersScreen() {
  const router = useRouter(); // Initialize router
  const [activeTab, setActiveTab] = useState<string>("All");
  const [filterDropdownVisible, setFilterDropdownVisible] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("All Time");
  
  const tabs = [
    "All",
    "Unconfirmed",
    "Order Prepared",
    "Order Packed",
    "Hand Over",
    "Picked",
    "Delivered",
  ];

  const filterOptions: FilterType[] = [
    "Today",
    "Weekly",
    "Monthly",
    "Yearly",
    "Reset"
  ];

  // Define the status sequence
  const statusSequence: OrderStatus[] = [
    "Unconfirmed",
    "Order Prepared",
    "Order Packed",
    "Hand Over", 
    "Picked",
    "Delivered"
  ];

  // Define button text for each status (showing the NEXT action)
  const buttonTextMap: Record<OrderStatus, string> = {
    "Unconfirmed": "Order Prepared",
    "Order Prepared": "Order Packed",
    "Order Packed": "Hand Over",
    "Hand Over": "Picked",
    "Picked": "Delivered",
    "Delivered": "Delivered" // This won't be used as delivered orders don't show button
  };
  
  // Initialize orders with current status
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#136558-19",
      time: "05:19 PM",
      date: "30/04/2024",
      items: 3,
      total: 300,
      status: "Order Packed",
      additionalInfo: null,
    },
    {
      id: "#136558-20",
      time: "05:19 PM",
      date: "30/04/2025",
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
      time: "05:19 PM",
      date: "30/04/2025",
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
      time: "05:19 PM",
      date: "30/04/2025",
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
      time: "05:19 PM",
      date: "01/05/2025",
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
      time: "05:19 PM",
      date: "07/01/2025",
      items: 3,
      total: 300,
      status: "Delivered",
      additionalInfo: {
        type: "info",
        value: "Delivery Partner Arrived",
      },
    },
  ]);

  // Store the original unfiltered orders
  const [originalOrders] = useState<Order[]>([...orders]);

  // Function to filter orders by date
  const filterOrdersByDate = (filterType: FilterType) => {
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    let filteredOrders: Order[] = [];

    switch (filterType) {
      case "Today":
        // Filter for today's orders
        filteredOrders = originalOrders.filter(order => {
          const [day, month, year] = order.date.split('/');
          const orderDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          return orderDate.getDate() === today.getDate() && 
                 orderDate.getMonth() === today.getMonth() && 
                 orderDate.getFullYear() === today.getFullYear();
        });
        setActiveFilter("Today");
        break;
      case "Weekly":
        // Filter for orders from the past week
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        filteredOrders = originalOrders.filter(order => {
          const [day, month, year] = order.date.split('/');
          const orderDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          return orderDate >= oneWeekAgo && orderDate <= currentDate;
        });
        setActiveFilter("Weekly");
        break;
      case "Monthly":
        // Filter for orders from the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        
        filteredOrders = originalOrders.filter(order => {
          const [day, month, year] = order.date.split('/');
          const orderDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          return orderDate >= firstDayOfMonth && orderDate <= currentDate;
        });
        setActiveFilter("Monthly");
        break;
      case "Yearly":
        // Filter for orders from the current year
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        
        filteredOrders = originalOrders.filter(order => {
          const [day, month, year] = order.date.split('/');
          const orderDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          return orderDate >= firstDayOfYear && orderDate <= currentDate;
        });
        setActiveFilter("Yearly");
        break;
      case "Reset":
        // Reset to all orders
        filteredOrders = [...originalOrders];
        setActiveFilter("All Time");
        break;
      default:
        filteredOrders = [...originalOrders];
        break;
    }

    setOrders(filteredOrders);
    setFilterDropdownVisible(false);
  };

  // Apply status filter after date filter
  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  // Function to handle status progression when button is clicked
  const handleStatusChange = (orderIndex: number) => {
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

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "Order Packed":
        return (
          <View style={[styles.statusIcon, styles.packingIcon]}>
            <Text allowFontScaling={false} >📦</Text>
          </View>
        );
      case "Order Prepared":
        return (
          <View style={[styles.statusIcon, styles.preparingIcon]}>
            <Text allowFontScaling={false} >🔄</Text>
          </View>
        );
      case "Hand Over":
        return (
          <View style={[styles.statusIcon, styles.handOverIcon]}>
            <Text allowFontScaling={false} >🤝</Text>
          </View>
        );
      case "Unconfirmed":
        return (
          <View style={[styles.statusIcon, styles.unconfirmedIcon]}>
            <Text allowFontScaling={false} >❓</Text>
          </View>
        );
      case "Picked":
        return (
          <View style={[styles.statusIcon, styles.pickedIcon]}>
            <Text allowFontScaling={false} >🔍</Text>
          </View>
        );
      case "Delivered":
        return (
          <View style={[styles.statusIcon, styles.deliveredIcon]}>
            <Text allowFontScaling={false} >✅</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const handleViewOrder = () => {
    router.push('/Screens/ViewOrder');
  };

  const renderOrderCard = ({ item, index }: { item: Order; index: number }) => {
    // Determine if we need to show the action button
    // We don't show the button for "Delivered" status as that's the final status
    const isDelivered = item.status === "Delivered";
    
    return (
      <View style={styles.orderCard}>
        {getStatusIcon(item.status)}
        <View style={styles.orderHeader}>
          <Text allowFontScaling={false}  style={styles.orderLabel}>{item.status}</Text>
          {item.additionalInfo && (
            <Text allowFontScaling={false}  style={styles.preparingInfo}>
              {item.additionalInfo.type === "time" ? "Preparation Time: " : ""}
              {item.additionalInfo.value}
            </Text>
          )}
        </View>
        <View style={styles.orderDetails}>
          <Text allowFontScaling={false}  style={styles.orderId}>Order ID: {item.id}</Text>
          <Text allowFontScaling={false}  style={styles.orderAmount}>₹{item.total}</Text>
        </View>
        <Text allowFontScaling={false}  style={styles.orderMeta}>
          {item.date}|{item.time} | {item.items} items for ₹{item.total}.0
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.viewButton} onPress={handleViewOrder}>
            <Text allowFontScaling={false}  style={styles.viewButtonText}>View Order</Text>
          </TouchableOpacity>

          {!isDelivered && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleStatusChange(index)}
            >
              <Text allowFontScaling={false}  style={styles.actionButtonText}>
                {buttonTextMap[item.status]}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // Render filter dropdown
  const renderFilterDropdown = () => {
    return (
      <Modal
        transparent={true}
        visible={filterDropdownVisible}
        animationType="fade"
        onRequestClose={() => setFilterDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setFilterDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.filterDropdown}>
                <Text allowFontScaling={false}  style={styles.filterHeading}>Filter by Time</Text>
                {filterOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.filterOption}
                    onPress={() => filterOrdersByDate(option)}
                  >
                    <Text allowFontScaling={false}  style={[
                      styles.filterOptionText,
                      (option === "Reset" && activeFilter === "All Time") || option === activeFilter ? styles.activeFilterText : null
                    ]}>
                      {option}
                    </Text>
                    {((option === "Reset" && activeFilter === "All Time") || option === activeFilter) && (
                      <Ionicons name="checkmark" size={18} color="#01615F" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Header />
        <Text allowFontScaling={false}  style={styles.headerTitle}>Orders</Text>
        <View style={styles.filterContainer}>
          <Text allowFontScaling={false}  style={styles.filterLabel}>{activeFilter}</Text>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilterDropdownVisible(true)}>
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
          style={styles.tabScrollView}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text allowFontScaling={false} 
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

      {renderFilterDropdown()}

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ordersList}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text allowFontScaling={false}  style={styles.emptyText}>No orders found for the selected filter.</Text>
          </View>
        )}
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
    fontWeight: '500',
    fontSize: RFPercentage(2.5),
    marginTop: RFPercentage(2),
    fontFamily: "Poppins-SemiBold",
    flex: 1,
    textAlign: 'left',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  filterLabel: {
    fontSize: 12,
    color: '#757575',
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabScrollView: {
    flexDirection: "row",
  },
  tab: {
    paddingVertical: 12,
    marginRight: 20,
  },
  tabText: {
    fontSize: 14,
    color: "#9e9e9e",
  },
  activeTab: {
    // Style for active tab container if needed
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
  // Filter dropdown styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  filterDropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 200,
    marginTop: 90,
    marginRight: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterHeading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
  },
  filterOption: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterOptionText: {
    fontSize: 14,
    color: "#333",
  },
  activeFilterText: {
    color: "#01615F",
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
  },
});