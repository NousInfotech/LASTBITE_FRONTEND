import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";

const CouponScreen = () => {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    // Handle coupon application logic here
    console.log("Coupon applied:", couponCode);
  };

  const handleRemoveCoupon = () => {
    // Handle coupon removal logic here
    console.log("Coupon removed");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Apply Coupon</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChangeText={setCouponCode}
        />
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyCoupon}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.appliedCouponContainer}>
        <Text style={styles.appliedCouponTitle}>Applied Coupon</Text>
        <View style={styles.couponCard}>
          <View style={styles.couponLeftBorder}></View>
          <View style={styles.couponContent}>
            <View style={styles.couponRow}>
              <Text style={styles.couponCode}>TRYNEW</Text>
              <TouchableOpacity onPress={handleRemoveCoupon}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.couponDetails}>
              Save ₹84 on this order!
              {"\n"}Use code TRYNEW & get 50% off on orders above ₹149. Maximum discount: ₹100.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  applyButton: {
    backgroundColor: "#01615F",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  appliedCouponContainer: {
    marginTop: 24,
  },
  appliedCouponTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
  },
  couponCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    flexDirection: "row",
  },
  couponLeftBorder: {
    width: 8,
    backgroundColor: "#01615F",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  couponContent: {
    flex: 1,
    paddingLeft: 16,
  },
  couponRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  couponCode: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#01615F",
  },
  removeText: {
    fontSize: 14,
    color: "#FF3B30",
  },
  couponDetails: {
    fontSize: 14,
    color: "#666666",
  },
});

export default CouponScreen;
