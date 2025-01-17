import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

const ApplyCoupon = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [couponInput, setCouponInput] = useState("");

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
    return null; // Optionally, show a loading screen or placeholder
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#01615F" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apply Coupon</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Coupon Code"
            placeholderTextColor="#A3A3A3"
            value={couponInput}
            onChangeText={setCouponInput}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Applied Coupons Section */}
        <View style={styles.couponCard}>
  <View style={styles.couponLeftBorder}></View>
  <View style={styles.couponContent}>
    <View style={styles.couponRow}>
      <Text style={styles.couponCode}>TRYNEW</Text>
      <TouchableOpacity>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.couponDetails}>
      Save ₹84 on this order!
      {"\n"}Use code TRYNEW & get 50% off on orders above ₹149. Maximum discount: ₹100.
    </Text>
  </View>
</View>


        {/* Best Offers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Offers</Text>
          <View style={styles.couponCard}>
            <View style={styles.couponRow}>
              <Text style={styles.couponCode}>TRYNEW</Text>
              <TouchableOpacity>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.couponDetails}>
              Save ₹84 on this order!
              {"\n"}Use code TRYNEW & get 50% off on orders above ₹149. Maximum discount: ₹100.
            </Text>
          </View>
        </View>

        {/* Payment Offers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Offers</Text>
          <View style={styles.offerCard}>
            <Text style={styles.offerDetails}>
              Assured up to ₹100 cashback...
              {"\n"}Unlock Double Rewards This Month! Pay using Paytm UPI & get assured cashback between ₹10 to ₹100 on your two transactions above ₹150.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplyCoupon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputBox: {
    height: 50,
    borderWidth: 1,
    borderColor: "#A3A3A3",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#333333",
    marginBottom: 12, // Adds spacing between input box and button
  },
  applyButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF", // White text
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#555555",
    marginBottom: 8,
  },
  applyButton: {
    backgroundColor: "#01615F",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "stretch", // Makes the button take full width
    alignItems: "center", // Centers the text
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
    flexDirection: "row", // Align content horizontally
  },

  couponLeftBorder: {
    width: 8, // Width of the colored left border
    backgroundColor: "#01615F", // Green color for the border
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },

  couponContent: {
    flex: 1,
    paddingLeft: 16, // Adds space between border and content
  },
  couponRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  couponCode: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#01615F", // Green text
  },
  removeText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#FF0000", // Red text
  },
  applyText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#01615F", // Green text
  },
  couponDetails: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666666",
  },
  offerCard: {
    backgroundColor: "#E6F7F7", // Light green
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  offerDetails: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#01615F", // Green text
  },
});