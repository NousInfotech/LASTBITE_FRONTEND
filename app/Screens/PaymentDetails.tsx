import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Font from "expo-font";
import GoBack from "@/components/GoBack";

const PaymentDetails: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  const paymentDetails = {
    earnings: {
      base: "₹2,000.00",
      promotion: "₹900.00",
      deductions: "₹450.00",
      taxDeducted: "₹500.00",
      finalAmount: "₹2,450.00"
    },
    payment: {
      bankAccount: "XYZ Bank (Last four digits: 1234)",
      transferDate: "January 15, 2025",
      transactionId: "TXN123456789"
    },
    order: {
      orderId: "10123",
      customer: "John Doe",
      totalOrderValue: "₹1,000.00",
      orderTimestamp: "5 pm"
    },
    confirmation: {
      amountTransferred: "₹5,000.00",
      pending: "Pending"
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Details</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Order ID: {params.id}</Text>
            <Text style={[styles.status, { color: "#FF9800" }]}>{params.status}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payout Date</Text>
            <Text style={styles.value}>{params.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>{params.amount}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earnings</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Base Earnings</Text>
            <Text style={styles.value}>{paymentDetails.earnings.base}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Promotion</Text>
            <Text style={styles.value}>{paymentDetails.earnings.promotion}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Deductions</Text>
            <Text style={styles.value}>{paymentDetails.earnings.deductions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tax Deducted</Text>
            <Text style={styles.value}>{paymentDetails.earnings.taxDeducted}</Text>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.label}>Final Amount</Text>
            <Text style={styles.totalValue}>{paymentDetails.earnings.finalAmount}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Bank Account</Text>
            <Text style={styles.value}>{paymentDetails.payment.bankAccount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transfer Date</Text>
            <Text style={styles.value}>{paymentDetails.payment.transferDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>{paymentDetails.payment.transactionId}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Order</Text>
            <Text style={styles.value}>{paymentDetails.order.orderId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Customer</Text>
            <Text style={styles.value}>{paymentDetails.order.customer}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Order Value</Text>
            <Text style={styles.value}>{paymentDetails.order.totalOrderValue}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Order Timestamp</Text>
            <Text style={styles.value}>{paymentDetails.order.orderTimestamp}</Text>
          </View>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Payment Confirmation</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Amount Transferred to Bank</Text>
            <Text style={styles.value}>{paymentDetails.confirmation.amountTransferred}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, { color: "#FF9800" }]}>
              {paymentDetails.confirmation.pending}
            </Text>
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
      },
      headerTitle: {
        fontSize: 16,
        marginLeft: 16,
        fontFamily: "Poppins-SemiBold",
      },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  lastSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 12,
    color: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#000000",
  },
  status: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
  },
  value: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#000000",
  },
  totalValue: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
  },
});

export default PaymentDetails;