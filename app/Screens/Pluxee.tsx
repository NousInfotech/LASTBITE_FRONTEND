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

const Pluxee = () => {
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
            <Text style={styles.headerTitle}>Select a card</Text>
          </View>
          <View style={styles.cardList}>
<TouchableOpacity style={styles.paymentOption} onPress={() => router.push('./AddCard')}>
            <Image
              source={require("../../assets/images/Plus Math.png")}
              style={styles.aImage}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentNewText}>Add New Food Card</Text>
              <Text style={styles.subNewText}>Pluxee card need to be added separately for restaurant orders</Text>
            </View>
          </TouchableOpacity>
            
          </View>
          </SafeAreaView>
    )
}

export default Pluxee;

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
  cardList: {
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
  paymentNewText: {
    marginBottom: 2,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
  subNewText: {
    fontSize: RFPercentage(2),
    fontWeight: "500",
    color: "grey",
    fontFamily: "Poppins-Regular",
  },
});