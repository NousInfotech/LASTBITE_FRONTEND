import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons
import GoBack from "@/components/GoBack";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function OrderSummaryScreen({ navigation }) {
  const orderNumber = "136558-19";
  const items = [
    {
      name: "Egg Roll",
      note: "Rolls",
      price: 100.0,
      quantity: 2,
      color: "#FF6B6B",
      image: require("../../assets/images/non-veg-mark.png"),
    },
    {
      name: "Veg Roll",
      note: "None",
      price: 80.0,
      quantity: 2,
      color: "#4CAF50",
      image: require("../../assets/images/veg-mark.png"),
    },
  ];

  const packagingCharges = 79.8;
  const gst = 7.6;
  const discount = 4.78;
  const discountPercentage = "60% OFF";
  const estimatedEarning = 45;

  const itemTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const billTotal = itemTotal + packagingCharges + gst - discount;

  const [modalVisible, setModalVisible] = useState(false);
  const [prepTime, setPrepTime] = useState(15);
  const [orderStatus, setOrderStatus] = useState("Confirm Order");
  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [deliveryInstructionsCollapsed, setDeliveryInstructionsCollapsed] = useState(false);
  const [cashOnDeliveryCollapsed, setCashOnDeliveryCollapsed] = useState(false);

  const incrementTime = () => setPrepTime((prev) => prev + 5);
  const decrementTime = () => setPrepTime((prev) => Math.max(5, prev - 5));

  const handleStatusPress = () => {
    switch (orderStatus) {
      case "Confirm Order":
        setModalVisible(true);
        break;
      case "Order Prepared":
        setOrderStatus("Order Packed");
        break;
      case "Order Packed":
        setOrderStatus("Handed Over");
        break;
      case "Handed Over":
        setVerificationModalVisible(true);
        break;
    }
  };

  const handleDone = () => {
    setModalVisible(false);
    setOrderStatus("Order Prepared");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <GoBack />
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            Order ID: <Text style={styles.orderNumber}>#{orderNumber}</Text>
          </Text>
          <Text style={styles.subTitle}>06:19 PM | Deliver at: abc</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={styles.rejectButton}>
            <Text style={styles.rejectButtonText}>X Reject</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content container with flex layout */}
      <View style={styles.mainContainer}>
        {/* Scrollable content */}
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Estimated Earnings */}
          <View style={styles.earningsContainer}>
            <View style={styles.earningsHeader}>
              <Text style={styles.earningsTitle}>Estimated Earnings:</Text>
              <Text style={styles.earningsAmount}>₹{estimatedEarning}</Text>
            </View>
            
            <View style={styles.earningsDetail}>
              <Text style={styles.earningsLabel}>Time: {prepTime} mins</Text>
            </View>
            
            <View style={styles.earningsDetail}>
              <Text style={styles.earningsLabel}>Distance: 3.34 kms</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.addressSection}>
              <Text style={styles.addressLabel}>To Restaurant</Text>
              <Text style={styles.addressAmount}>₹30</Text>
            </View>
            
            <View style={styles.addressSection}>
              <Text style={styles.addressLabel}>Long Distance</Text>
              <Text style={styles.addressAmount}>₹10</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.locationContainer}>
              <View style={styles.locationIconContainer}>
                <Image 
                  source={require("../../assets/images/Home.png")} 
                  style={styles.locationIcon} 
                />
              </View>
              <View style={styles.locationDetails}>
                <Text style={styles.locationTitle}>Connecticut</Text>
                <Text style={styles.locationAddress}>
                  2158 Trainridge Cir, Syracuse, Connecticut 34242
                </Text>
              </View>
            </View>
            
            <View style={styles.routeIndicator} />
            
            <View style={styles.locationContainer}>
              <View style={styles.locationIconContainer}>
                <Image 
                  source={require("../../assets/images/Restaurant Building-1.png")} 
                  style={styles.locationIcon} 
                />
              </View>
              <View style={styles.locationDetails}>
                <Text style={styles.locationTitle}>Kentucky</Text>
                <Text style={styles.locationAddress}>
                  4917 Washington Ave, Manchester, Kentucky 39498
                </Text>
              </View>
            </View>
          </View>
          
          {/* Items List */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Items</Text>
            {items.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.itemDetails}>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.quantity}>x{item.quantity}</Text>
                  </View>
                  <View style={styles.inline}>
                    <Image
                      source={item.image}
                      style={{ width: 30, height: 30, marginRight: 8 }}
                    />
                    <Text style={styles.itemPrice}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Bill Summary */}
          <View style={styles.billSummary}>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billValue}>₹{itemTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Packaging Charges</Text>
              <Text style={styles.billValue}>
                ₹{packagingCharges.toFixed(2)}
              </Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>GST</Text>
              <Text style={styles.billValue}>₹{gst.toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Discount</Text>
              <Text style={styles.billValue}>-₹{discount.toFixed(2)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Discount Description</Text>
              <Text style={styles.discountLabel}>{discountPercentage}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Bill Total</Text>
              <Text style={styles.totalValue}>₹{billTotal.toFixed(2)}</Text>
            </View>
          </View>

          {/* Delivery Instructions */}
          <View style={styles.instructionSection}>
            <TouchableOpacity 
              style={styles.instructionHeader}
              onPress={() => setDeliveryInstructionsCollapsed(!deliveryInstructionsCollapsed)}
            >
              <Text style={styles.instructionTitle}>Delivery Instructions</Text>
              <Ionicons 
                name={deliveryInstructionsCollapsed ? "chevron-down" : "chevron-up"} 
                size={20} 
                color="#333" 
              />
            </TouchableOpacity>
            {!deliveryInstructionsCollapsed && (
              <View style={styles.instructionContent}>
                <Text style={styles.instructionText}>
                  Leave the package with the security guard if no one answers the door.
                </Text>
              </View>
            )}
          </View>

          {/* Cash On Delivery */}
          <View style={styles.instructionSection}>
            <TouchableOpacity 
              style={styles.instructionHeader}
              onPress={() => setCashOnDeliveryCollapsed(!cashOnDeliveryCollapsed)}
            >
              <Text style={styles.instructionTitle}>Cash On Delivery</Text>
              <Ionicons 
                name={cashOnDeliveryCollapsed ? "chevron-down" : "chevron-up"} 
                size={20} 
                color="#333" 
              />
            </TouchableOpacity>
            {!cashOnDeliveryCollapsed && (
              <View style={styles.instructionContent}>
                <Text style={styles.instructionText}>
                  Amount to be collected:
                  <Text style={styles.amountText}> ₹300</Text>
                </Text>
              </View>
            )}
          </View>
          
          {/* Add extra space at the bottom to ensure content is scrollable above the fixed buttons */}
          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Fixed bottom buttons container */}
        <View style={styles.fixedBottomContainer}>
  {/* Call and Map buttons in the same row */}
  <View style={styles.buttonRow}>
    <TouchableOpacity style={styles.callButton}>
      <Text style={styles.callButtonText}>Call</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.mapButton}>
      <Text style={styles.mapButtonText}>Map</Text>
    </TouchableOpacity>
  </View>
  
  {/* Confirm Order button below */}
  <View style={styles.footer}>
    <TouchableOpacity
      style={styles.confirmButton}
      onPress={handleStatusPress}
    >
      <Text style={styles.confirmButtonText}>{orderStatus}</Text>
    </TouchableOpacity>
  </View>
</View>
      </View>

      {/* Prep Time Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Food preparation time</Text>
            <View style={styles.timePicker}>
              <TouchableOpacity style={styles.timeButton} onPress={decrementTime}>
                <Text style={styles.timeButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.timeText}>{prepTime} mins</Text>
              <TouchableOpacity style={styles.timeButton} onPress={incrementTime}>
                <Text style={styles.timeButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Verification Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={verificationModalVisible}
        onRequestClose={() => setVerificationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Enter Verification Code</Text>
            <TextInput
              style={styles.input}
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="Enter code"
              keyboardType="number-pad"
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setVerificationModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: "#fff" 
    },
    mainContainer: {
      flex: 1,
      position: 'relative',
    },
    scrollContainer: {
      flex: 1,
      paddingBottom: 130, // Space for the fixed bottom buttons
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#EEE",
    },
    headerTitleContainer: { 
      marginLeft: 16, 
      flex: 1 
    },
    headerTitle: { 
      fontSize: 16, 
      fontWeight: "bold" 
    },
    orderNumber: { 
      color: "#01615F" 
    },
    subTitle: { 
      fontSize: 12, 
      color: "#666", 
      marginTop: 2 
    },
    content: {
      padding: 16,
      borderWidth: 1,
      borderColor: "#EEEEEE",
      borderRadius: 8,
      backgroundColor: "#FFFFFF",
      marginHorizontal: RFPercentage(2),
      marginBottom: RFPercentage(2),
    },
    inline: { 
      flexDirection: "row", 
      alignItems: "center" 
    },
    rejectButton: {
      borderColor: "red",
      borderWidth: RFPercentage(0.3),
      borderRadius: RFPercentage(1),
    },
    rejectButtonText: {
      color: "red",
      padding: '3%',
    },
    sectionTitle: { 
      fontSize: 18, 
      fontWeight: "bold", 
      marginBottom: 16 
    },
    itemContainer: { 
      marginBottom: 16 
    },
    itemDetails: { 
      flexDirection: "column" 
    },
    itemNameContainer: { 
      flexDirection: "row", 
      justifyContent: "space-between" 
    },
    itemName: { 
      fontSize: 16, 
      fontWeight: "700" 
    },
    quantity: { 
      fontSize: 16, 
      fontWeight: "700" 
    },
    itemPrice: { 
      marginTop: 8, 
      fontSize: 15, 
      fontWeight: "500" 
    },
    billSummary: {
      paddingHorizontal: 16,
      paddingTop: 8,
      borderWidth: 1,
      borderColor: "#EEEEEE",
      borderRadius: 8,
      backgroundColor: "#FFFFFF",
      marginBottom: RFPercentage(2),
      marginHorizontal: RFPercentage(2),
    },
    billRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
    },
    billLabel: { 
      fontSize: 14, 
      color: "#666" 
    },
    billValue: { 
      fontSize: 14, 
      fontWeight: "500" 
    },
    discountLabel: { 
      fontSize: 14, 
      fontWeight: "500", 
      color: "#4CAF50" 
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: "#EEE",
      marginTop: 8,
    },
    totalLabel: { 
      fontSize: 16, 
      fontWeight: "bold" 
    },
    totalValue: { 
      fontSize: 16, 
      fontWeight: "bold", 
      color: "#01615F" 
    },
    fixedBottomContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#EEE',
      paddingBottom: RFPercentage(2),
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: RFPercentage(2),
      marginTop: RFPercentage(2),
    },
    callButton: {
      borderColor: "#01615F",
      borderWidth: 2,
      borderRadius: 8,
      paddingVertical: RFPercentage(1.6),
      alignItems: "center",
      flex: 1,
      marginRight: RFPercentage(1),
    },
    callButtonText: { 
      color: "#01615F", 
      fontSize: 16, 
      fontWeight: "bold",
    },
    mapButton: {
      borderColor: "#01615F",
      borderWidth: 2,
      borderRadius: 8,
      alignItems: "center",
      paddingVertical: RFPercentage(1.6),
      flex: 1,
      marginLeft: RFPercentage(1),
    },
    mapButtonText: {
      color: "#01615F", 
      fontSize: 16, 
      fontWeight: "bold",
    },
    confirmButton: {
      backgroundColor: "#01615F",
      borderRadius: 8,
      paddingVertical: RFPercentage(1.6),
      marginHorizontal: RFPercentage(2),
      alignItems: "center",
      marginTop: RFPercentage(2),
    },
    confirmButtonText: { 
      color: "white", 
      fontSize: 16, 
      fontWeight: "bold",
    },
    bottomPadding: {
      height: 20,
    },
  
    // Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalBox: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 12,
      width: "80%",
      alignItems: "center",
    },
    modalTitle: { 
      fontSize: 16, 
      fontWeight: "bold", 
      marginBottom: 20 
    },
    timePicker: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    timeButton: {
      borderWidth: 1,
      borderColor: "#01615F",
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    timeButtonText: { 
      fontSize: 20, 
      color: "#01615F", 
      fontWeight: "bold" 
    },
    timeText: { 
      fontSize: 16, 
      marginHorizontal: 20 
    },
    doneButton: {
      backgroundColor: "#01615F",
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 8,
    },
    doneButtonText: { 
      color: "white", 
      fontWeight: "bold", 
      fontSize: 16 
    },
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#CCC",
      borderRadius: 8,
      padding: 10,
      marginBottom: 16,
      fontSize: 16,
    },
  
    // Earnings section styles
    earningsContainer: {
      backgroundColor: "#F9F9F9",
      borderRadius: 8,
      padding: 16,
      marginHorizontal: RFPercentage(2),
      marginTop: RFPercentage(2),
      marginBottom: RFPercentage(2),
    },
    earningsHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    earningsTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    earningsAmount: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#01615F",
    },
    earningsDetail: {
      marginVertical: 4,
    },
    earningsLabel: {
      fontSize: 14,
      color: "#666",
    },
    divider: {
      height: 1,
      backgroundColor: "#E0E0E0",
      marginVertical: 12,
    },
    addressSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 4,
    },
    addressLabel: {
      fontSize: 14,
      color: "#333",
    },
    addressAmount: {
      fontSize: 14,
      fontWeight: "500",
      color: "#333",
    },
    locationContainer: {
      flexDirection: "row",
      marginVertical: 8,
    },
    locationIconContainer: {
      marginRight: 12,
    },
    locationIcon: {
      width: 24,
      height: 24,
    },
    locationDetails: {
      flex: 1,
    },
    locationTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333",
    },
    locationAddress: {
      fontSize: 12,
      color: "#666",
      marginTop: 2,
    },
    routeIndicator: {
      width: 2,
      height: 24,
      backgroundColor: "#C4C4C4",
      marginLeft: 11,
    },
    
    // Instructions section styles
    instructionSection: {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      marginHorizontal: RFPercentage(2),
      marginBottom: RFPercentage(2),
      borderWidth: 1,
      borderColor: "#EEEEEE",
      overflow: "hidden",
    },
    instructionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    instructionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333333",
    },
    instructionContent: {
      paddingHorizontal: 16,
      paddingBottom: 14,
    },
    instructionText: {
      fontSize: 14,
      color: "#666666",
      lineHeight: 20,
    },
    amountText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333333",
    }
});