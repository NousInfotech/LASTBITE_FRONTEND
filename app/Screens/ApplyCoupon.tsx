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
  Image,
} from "react-native";
import Header from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

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
          <Header />
        </TouchableOpacity>
        <Text allowFontScaling={false}  style={styles.headerTitle}>Apply Coupon</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Input Section */}
        <View style={styles.inputContainer}>
         <TextInput allowFontScaling={false} 
            style={styles.inputBox}
            placeholder="Enter Coupon Code"
            placeholderTextColor="#A3A3A3"
            value={couponInput}
            onChangeText={setCouponInput}
          />
          <TouchableOpacity
            style={[styles.applyButton, couponInput ? {} : styles.applyButtonDisabled]} 
            disabled={!couponInput} // Disables the button if couponInput is empty
          >
            <Text allowFontScaling={false}  style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

      <View style={styles.section}>
      <Text allowFontScaling={false}  style={styles.sectionTitle}>Applied Coupons</Text>
      <View style={styles.couponCard}>
        <View style={styles.couponLeftBorder}>
          <Text allowFontScaling={false}  style={styles.couponLeftBorderText}>50% OFF</Text>
        </View>
        <View style={styles.couponContent}>
          <View style={styles.couponRow}>
            <Text allowFontScaling={false}  style={styles.couponCode}>TRYNEW</Text>
            <TouchableOpacity>
              <Text allowFontScaling={false}  style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
          <Text allowFontScaling={false}  style={styles.discountText}>Save ₹84 on this order!</Text>
          <View style={styles.separatorLine} />
          <Text allowFontScaling={false}  style={styles.couponDetails}>
            Use code TRYNEW & get 50% off on orders above ₹149. Maximum discount: ₹100.
          </Text>
          <TouchableOpacity>
            <Text allowFontScaling={false}  style={styles.moreText}>+ MORE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    <View style={styles.section}>
      <Text allowFontScaling={false}  style={styles.sectionTitle}>Best Offers</Text>
      <View style={styles.couponCard}>
        <View style={styles.couponLeftBorder}>
          <Text allowFontScaling={false}  style={styles.couponLeftBorderText}>50% OFF</Text>
        </View>
        <View style={styles.couponContent}>
          <View style={styles.couponRow}>
            <Text allowFontScaling={false}  style={styles.couponCode}>TRYNEW</Text>
            <TouchableOpacity>
              <Text allowFontScaling={false}  style={styles.removeText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <Text allowFontScaling={false}  style={styles.discountText}>Save ₹84 on this order!</Text>
          <View style={styles.separatorLine} />
          <Text allowFontScaling={false}  style={styles.couponDetails}>
            Use code TRYNEW & get 50% off on orders above ₹149. Maximum discount: ₹100.
          </Text>
          <TouchableOpacity>
            <Text allowFontScaling={false}  style={styles.moreText}>+ MORE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

        {/* Payment Offers Section */}
        <View style={styles.section}>
          <Text allowFontScaling={false}  style={styles.sectionTitle}>Payment Offers</Text>
          <View style={styles.offerCard}>
            <Text allowFontScaling={false}  style={styles.offerDetails}>
            Save on top of coupon discounts by applying these offers on the payments page.
            </Text>
          </View>
        </View>


      <View style={styles.offerCards}>
        <View style={styles.offerRow}>
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Paytm_logo.png" }} // Paytm logo as an example
            style={styles.offerLogo}
          />
          <Text allowFontScaling={false}  style={styles.offerTitle}>Assured up to ₹100 cashback...</Text>
        </View>
        <Text allowFontScaling={false}  style={styles.offerDetail}>
          Unlock Double Rewards This Month! Pay using Paytm UPI & get assured cashback between ₹10
          to ₹100 on your two transactions above ₹150.
        </Text>
        <TouchableOpacity>
          <Text allowFontScaling={false}  style={styles.moreText}>+ MORE</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplyCoupon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: RFPercentage(2),
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
  applyButtonDisabled: {
    backgroundColor: "#ccc", // Gray color for disabled state
  },
  applyButton: {
    backgroundColor: "#01615F", // Default button color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "stretch",
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 4, 
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#555555",
    marginBottom: 8,
  },
  couponCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    flexDirection: "row", // Align content horizontally
    borderColor: "#E0E0E0",
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden", // Ensures border radius applies to all children
  },
  couponLeftBorder: {
    width: 48, // Width to fit the "50% OFF" text
    backgroundColor: "#01615F", // Green color for the border
    justifyContent: "center",
    alignItems: "center",
  },
  couponLeftBorderText: {
    fontSize: 11,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF", // White text for visibility
    textAlign: "center",
    transform: [{ rotate: "-90deg" }], // Rotate the text vertically
  },
  couponContent: {
    flex: 1,
    padding: 16, // Padding inside the coupon content
  },
  couponRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 8,
  },
  couponCode: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    color: "black", // Green text for the code
  },
  discountText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#01615F", // Green text for discount details
    marginBottom: 8, // Adds spacing below the discount text
  },
  separatorLine: {
    height: 1,
    backgroundColor: "#E0E0E0", // Light gray for the separator line
    marginVertical: 8,
  },
  removeText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#01615F", // Red text for the Remove button
  },
  couponDetails: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#777777", // Gray text for the details
    lineHeight: 18, // Improves readability
    marginBottom: 8,
  },
  moreText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    color: "black", // Green color for "More" option
    textTransform: "uppercase", // Ensures consistency with the design
  },

  applyText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#01615F", // Green text
  },
  offerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  offerCard: {
    backgroundColor: "#E6F7F7", // Light green
    borderRadius: 8,
    borderWidth:1,
    borderColor: "#01615F",
    padding: 14,
  },
  offerCards: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    marginBottom: 24,
  },
  offerDetails: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    color: "#01615F", // Green text
  },
  offerLogo: {
    width: 24,
    height: 24,
    marginRight: 8, // Space between logo and title
  },
  offerTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#555555",
  },
  offerDetail: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Regular",
    color: "#777777",
    lineHeight: 18,
    marginBottom: 8,
  },
});