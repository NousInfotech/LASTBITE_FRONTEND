import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import LocationHeader from "@/components/LocationHeader";
import SearchBarVoice from "@/components/SearchBarVoice";
import * as Font from "expo-font";
import { router } from "expo-router";

const Home = () => {
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <LocationHeader />
      <SearchBarVoice
        onInputPress={() => {}}
        redirectTargets={["Dishes", "Restaurants"]}
        placeholder="Search...."
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Shift Starting Section */}
        <View style={styles.shiftContainer}>
          <Text style={styles.rupeeSign}>₹0</Text>
          <Text style={styles.shiftText}>
            Begin your work shift with just a click!
          </Text>

          <TouchableOpacity
            style={styles.startShiftButton}
            //  onPress={()=>router.push('/auth2/faceverification')}
          >
            <Text style={styles.startShiftText}>Start Your Shift</Text>
          </TouchableOpacity>

          <Text style={styles.shiftedAtText}>SHIFTED AT: --:-- --</Text>
        </View>

        {/* Quick Links Section */}
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.quickLinksContainer}>
          <View style={styles.quickLinkCard}>
            <View style={styles.iconCircle}>
              <Image
                source={require("../../assets/images/order-1.png")}
                style={styles.linkIcon}
              />
            </View>
            <Text style={styles.linkTitle}>Completed Orders</Text>
            <Text style={styles.linkValue}>20</Text>
          </View>

          <View style={styles.quickLinkCard}>
            <View style={styles.iconCircle}>
              <Image
                source={require("../../assets/images/star.png")}
                style={styles.linkIcon}
              />
            </View>
            <Text style={styles.linkTitle}>Average Rating</Text>
            <Text style={styles.linkValue}>4.5</Text>
          </View>
        </View>

        {/* Current Order Section */}
        <Text style={styles.sectionTitle}>Current Order</Text>
        <View style={styles.currentOrderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderStatus}>On the Way</Text>
            <Text style={styles.orderTime}>
              Remaining time:<Text style={styles.deliveryPlace}> 15 mins</Text>
            </Text>
          </View>

          <View style={styles.orderDetails}>
            <Text style={styles.earnings}>
              Estimated Earnings: <Text style={styles.amount}>₹40</Text>
            </Text>

            <Text style={styles.deliveryLocation}>
              Deliver at: <Text style={styles.deliveryPlace}>abc</Text>
            </Text>
          </View>
          <Text style={styles.deliveryInfo}>
            Time: 16 mins | Distance: 3.34 kms
          </Text>
          <View style={styles.orderActions}>
            <TouchableOpacity style={styles.mapButton}>
              {/* <Image 
            source={require("../../assets/images/map.png")} 
            style={styles.mapIcon} 
          /> */}
              <Text style={styles.mapButtonText}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  shiftContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  rupeeSign: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#01615F",
    marginBottom: 8,
  },
  shiftText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 16,
  },
  startShiftButton: {
    backgroundColor: "#01615F",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  startShiftText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  shiftedAtText: {
    fontSize: 12,
    color: "#999999",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginTop: 24,
    marginBottom: 12,
  },
  quickLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickLinkCard: {
    backgroundColor: "#01615F",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    alignItems: "center",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  linkIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  linkTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 4,
  },
  linkValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  currentOrderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: "600",
    color: "#01615F",
  },
  orderTime: {
    fontSize: 14,
    color: "#666666",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  earnings: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  deliveryInfo: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 24,
  },
  deliveryLocation: {
    fontSize: 14,
    color: "#666666",
  },
  deliveryPlace: {
    fontWeight: "bold",
    color: "#333333",
  },
  orderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 6,
    paddingVertical: 12,
    flex: 1,
    marginRight: 10,
  },
  mapIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  mapButtonText: {
    color: "#01615F",
    fontSize: 14,
    fontWeight: "500",
  },
  detailsButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 6,
    paddingVertical: 12,
  },
  detailsButtonText: {
    color: "#01615F",
    fontSize: 14,
    fontWeight: "500",
  },
  amount: {
    color: "#01615F",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});

export default Home;
