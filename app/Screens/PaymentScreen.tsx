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
import GoBack from "@/components/GoBack";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";

const PaymentScreen = () => {
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
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Payment Options</Text>
          <Text style={styles.subTitle}>1 item | Total : $ 26</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.lineText}>
            <Text style={styles.mainText}>Gourmet Delights </Text>
            <Text style={styles.subText}>Delivery in 50-55 mins</Text>
          </Text>
          <Text style={styles.lineText}>
            <Text style={styles.mainText}>Address: </Text>
            <Text style={styles.subText}>
              1234 Foodie Street, Flavor Town, CA 90210
            </Text>
          </Text>
        </View>

        <View style={styles.offerContainer}>
          <Text style={styles.offerText}>
            Save up to $19 more with payment offers
          </Text>
          <View style={styles.chevronContainer}>
            <AntDesign name="right" size={16} color="#01615F" />
          </View>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.paymentHeader}>Pay by any UPI App</Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.paymentOption}>
            <Text style={styles.paymentText}>Unlock Last Bites UPI</Text>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <Text style={styles.paymentText}>Google Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <Text style={styles.paymentText}>Amazon Pay UPI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View>
              <Text style={styles.paymentNewText}>Add New UPI ID</Text>
              <Text style={styles.subText}>
                You need to have a registered UPI ID
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.paymentHeader}>Credit & Debit Cards</Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.paymentOption}>
            <View>
              <Text style={styles.paymentNewText}>Add New Card</Text>
              <Text style={styles.subText}>Save and pay via cards</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.paymentHeader}>More Payment Options</Text>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.paymentOption}>
            <View>
              <Text style={styles.paymentText}>Wallet</Text>
              <Text style={styles.subText}>
                PhonePe, Amazon Pay & more
              </Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View>
              <Text style={styles.paymentText}>Pluxee</Text>
              <Text style={styles.subText}>
                Pluxee card only valid only on food & instamart
              </Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View>
              <Text style={styles.paymentText}>Netbanking</Text>
              <Text style={styles.subText}>
                Select from list of banks
              </Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View>
              <Text style={styles.paymentText}>Pay Later</Text>
              <Text style={styles.subText}>
                simpi
              </Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View>
              <Text style={styles.paymentText}>Pay on Delievery</Text>
              <Text style={styles.subText}>
                Pay in cash or pay online 
              </Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View>
              <Text style={styles.paymentText}>CRED Pay</Text>
            </View>
            <AntDesign name="right" size={16} color="grey" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

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
  titleContainer: {
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-SemiBold",
  },
  subTitle: {
    fontSize: 10,
    color: "grey",
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  infoContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  lineText: {
    marginBottom: 8,
  },
  mainText: {
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
  offerContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFFFF4",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#01615F",
    fontFamily: "Poppins-Medium",
  },
  chevronContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EFFFF4",
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
  paymentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  paymentNewText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
});
