import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import GoBack from "@/components/GoBack";
import SearchBarVoice from "@/components/SearchBarVoice";
import { useRouter } from "expo-router";
import * as Font from "expo-font";

const PayLater = () => {
  const router = useRouter();
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
    return null; // Optionally, show a loading screen or placeholder
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay Later</Text>
      </View>
      <View style={styles.paymentContainer}>
        <TouchableOpacity
          style={styles.paymentOption}
        >
          <Image
            source={require("../../assets/images/Plus Math.png")}
            style={styles.aImage}
          />
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentText}>SimpI</Text>
            <Text style={styles.subText}>
              You are not eligible to use SimpI.Try other payment method
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PayLater;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 14,
    marginLeft: 16,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  paymentContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 16,
  },
  paymentHeader: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
  },
  payImage: {
    height: 30,
    width: 36,
  },

  aImage: {
    height: 30,
    width: 30,
  },

  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  paymentDetails: {
    flex: 1, // Ensures text and subtext wrap properly and align to the left
    marginLeft: 16, // Adds spacing between the image and text
  },

  paymentText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  subText: {
    fontSize: 12,
    fontWeight: "500",
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
});
