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
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import GoBack from "@/components/GoBack";
import { RFPercentage } from "react-native-responsive-fontsize";

interface PaymentType {
  id: string;
  date: string;
  amount: string;
  status: "Completed" | "Processing" | "Failed";
}

const Payments: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("All (15)");

  const tabs: string[] = [
    "All (15)",
    "Completed (10)",
    "Processing (5)",
    "Failed(10)",
  ];

  const payments: PaymentType[] = [
    {
      id: "#136558-19",
      date: "January 15, 2025",
      amount: "₹2,450.00",
      status: "Completed",
    },
    {
      id: "#136558-19",
      date: "January 15, 2025",
      amount: "₹2,450.00",
      status: "Processing",
    },
    {
      id: "#136558-19",
      date: "January 15, 2025",
      amount: "₹2,450.00",
      status: "Failed",
    },
    {
      id: "#136558-19",
      date: "January 15, 2025",
      amount: "₹2,450.00",
      status: "Processing",
    },
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#4CAF50";
      case "Processing":
        return "#2196F3";
      case "Failed":
        return "#F44336";
      default:
        return "#000000";
    }
  };

  const handleViewDetails = (payment: PaymentType) => {
    router.push({
      pathname: "/Screens/PaymentDetails",
      params: {
        id: payment.id,
        date: payment.date,
        amount: payment.amount,
        status: payment.status
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.selectedTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.selectedTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Payments List */}
      <ScrollView style={styles.paymentsList}>
        {payments.map((payment, index) => (
          <View key={index} style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <Text style={styles.paymentId}>Order ID: {payment.id}</Text>
              <Text
                style={[
                  styles.status,
                  { color: getStatusColor(payment.status) },
                ]}
              >
                {payment.status}
              </Text>
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentDate}>Payout Date:</Text>
              <Text style={styles.date}>{payment.date}</Text>
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentAmount}>Amount:</Text>
              <Text style={styles.amount}>{payment.amount}</Text>
            </View>
            <TouchableOpacity style={styles.viewDetailsButton}  onPress={() => handleViewDetails(payment)}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
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
    fontSize: RFPercentage(2),
    marginLeft: 16,
    fontFamily: "Poppins-SemiBold",
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
    borderWidth: 1,
    borderColor: "#666",
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
  paymentsList: {
    padding: 16,
  },
  paymentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  paymentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  paymentId: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#000",
    marginBottom: 8,
  },
  paymentDetails: {
    flexDirection: "row",
    marginBottom: 4,
    justifyContent: "space-between",
  },
  paymentDate: {
    fontSize: RFPercentage(2),,
    color: "#666666",
    width: 100,
  },
  paymentAmount: {
    fontSize: RFPercentage(2),,
    color: "#666666",
    width: 100,
  },
  date: {
    fontSize: RFPercentage(2),,
    color: "#000000",
    fontFamily: "Poppins-Medium",
  },
  amount: {
    fontSize: RFPercentage(2),,
    color: "#000000",
    fontFamily: "Poppins-Medium",
  },
  status: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  viewDetailsButton: {
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#01615F",
    alignItems: "center",
  },
  viewDetailsText: {
    color: "#01615F",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});

export default Payments;
