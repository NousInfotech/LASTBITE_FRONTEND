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
} from "react-native";
import { Image } from "react-native";
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
          <Text style={styles.subTitle}>30/11/11 | Dine-in for ROOM</Text>
        </View>
      </View>

      {/* Scrollable Items + Fixed Summary/Footer */}
      <View style={{ flex: 1 }}>
        {/* Items List */}
        <ScrollView style={styles.content}>
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
        </ScrollView>

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

        {/* Confirm/Status Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleStatusPress}
          >
            <Text style={styles.confirmButtonText}>{orderStatus}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Preparation Time */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              How long will this take to prepare?
            </Text>
            <View style={styles.timePicker}>
              <TouchableOpacity
                onPress={decrementTime}
                style={styles.timeButton}
              >
                <Text style={styles.timeButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.timeText}>{prepTime} MINS</Text>
              <TouchableOpacity
                onPress={incrementTime}
                style={styles.timeButton}
              >
                <Text style={styles.timeButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Verification Code */}
      <Modal
        visible={verificationModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setVerificationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Enter Verification Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Verification Code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setVerificationModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitleContainer: { marginLeft: 16 },
  headerTitle: { fontSize: 16, fontWeight: "bold" },
  orderNumber: { color: "#01615F" },
  subTitle: { fontSize: 12, color: "#666", marginTop: 2 },
  content: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginBottom: RFPercentage(20),
    marginTop: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
  },
  inline: { flexDirection: "row", alignItems: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  itemContainer: { marginBottom: 16 },
  itemDetails: { flexDirection: "column" },
  itemNameContainer: { flexDirection: "row", justifyContent: "space-between" },
  itemName: { fontSize: 16, fontWeight: "700" },
  quantity: { fontSize: 16, fontWeight: "700" },
  itemPrice: { marginTop: 8, fontSize: 15, fontWeight: "500" },
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
  billLabel: { fontSize: 14, color: "#666" },
  billValue: { fontSize: 14, fontWeight: "500" },
  discountLabel: { fontSize: 14, fontWeight: "500", color: "#4CAF50" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    marginTop: 8,
  },
  totalLabel: { fontSize: 16, fontWeight: "bold" },
  totalValue: { fontSize: 16, fontWeight: "bold", color: "#01615F" },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#fff",
  },
  confirmButton: {
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },

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
  modalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 20 },
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
  timeButtonText: { fontSize: 20, color: "#01615F", fontWeight: "bold" },
  timeText: { fontSize: 16, marginHorizontal: 20 },
  doneButton: {
    backgroundColor: "#01615F",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  doneButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
});