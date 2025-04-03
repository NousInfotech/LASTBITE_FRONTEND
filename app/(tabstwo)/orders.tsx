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
  Modal,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import GoBack from "@/components/GoBack";
import { RFPercentage } from "react-native-responsive-fontsize";

interface FilterPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface OrderType {
  id: string;
  time: string;
  items: number;
  amount: number;
  status: string;
}

const Orders: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [filterPosition, setFilterPosition] = useState<FilterPosition>({ x: 0, y: 0, width: 0, height: 0 });

  const filters: string[] = ["Today", "Weekly", "Monthly", "Yearly", "Reset"];
  const tabs: string[] = ["All", "Preparing", "Packing", "Hand Over", "Handed Over", "Delivered"];

  const allOrders: OrderType[] = [
    { id: "#136558-19", time: "05:16 PM", items: 2, amount: 500, status: "New" },
    { id: "#136558-20", time: "05:45 PM", items: 3, amount: 750, status: "Packing" },
    { id: "#136558-21", time: "06:00 PM", items: 1, amount: 250, status: "Delivered" },
  ];

  const onFilterIconLayout = (event: LayoutChangeEvent) => {
    const { target } = event;
    if (target) {
      // Measure the position of the filter icon
      target.measure((x, y, width, height, pageX, pageY) => {
        setFilterPosition({
          x: pageX,
          y: pageY + height, // Position modal below the icon
          width,
          height
        });
      });
    }
  };
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
         <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setFilterModalVisible(true)}
          onLayout={onFilterIconLayout}
        >
          <Image 
            source={require("../../assets/images/Filter.png")} 
            style={styles.filterIcon} 
          />
        </TouchableOpacity>
      </View>
      <Modal 
        transparent={true} 
        visible={filterModalVisible} 
        animationType="none"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          onPress={() => setFilterModalVisible(false)}
        >
          <View 
            style={[
              styles.modalContainer,
              {
                position: 'absolute',
                top: filterPosition.y,
                right: Dimensions.get('window').width - (filterPosition.x + filterPosition.width),
              }
            ]}
          >
            {filters.map((filter, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.filterOption,
                  selectedFilter === filter && styles.selectedFilter
                ]} 
                onPress={() => {
                  setSelectedFilter(filter);
                  setFilterModalVisible(false);
                }}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter && styles.selectedFilterText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
    fontWeight: "500",
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
  modalOverlay: { 
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
   },
  modalContainer: { 
    width: 120, 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    padding: 10, 
    elevation: 5 
  },
  filterOption: { 
    paddingVertical: 5, 
    paddingHorizontal: 5, 
  },
  selectedFilter: {
    backgroundColor: '#fff',
  },
  selectedFilterText: {
    fontFamily: 'Poppins-Medium',
  },
  filterText: { 
    fontSize: RFPercentage(2), 
    fontFamily: "Poppins-Medium" 
  }
});

export default Orders;