import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

const RestaurantScreen = () => {
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
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/initialimage.png")}
          style={styles.image}
        />
        <Text allowFontScaling={false}  style={styles.heading}>
          Make your restaurant delivery-ready in 24hrs!
        </Text>
        <Text allowFontScaling={false}  style={styles.subText}>
          Simplify your submission with these handy items:
        </Text>
        <View style={styles.listContainer}>
          <Text allowFontScaling={false}  style={styles.listItem}>• PAN Number</Text>
          <Text allowFontScaling={false}  style={styles.listItem}>• GSTIN Number</Text>
          <Text allowFontScaling={false}  style={styles.listItem}>
            • Bank Details (IFSC and Account Number)
          </Text>
          <Text allowFontScaling={false}  style={styles.listItem}>• FSSAI Registration Number</Text>
          <Text allowFontScaling={false}  style={styles.listItem}>• Your Restaurant Menu</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/Screens/RegisterRestaurant")}
        >
          <Text allowFontScaling={false}  style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01615F",
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 30,
  },
  heading: {
    fontSize: RFPercentage(2.5),
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginBottom: 15,
    lineHeight: 32,
    textAlign: "left",
    alignSelf: "flex-start",
    paddingHorizontal: 2,
  },
  subText: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    marginBottom: 20,
    opacity: 0.9,
    textAlign: "left",
    alignSelf: "flex-start",
    paddingHorizontal: 2,
  },
  listContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  listItem: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    marginBottom: 12,
    opacity: 0.9,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontFamily: "Poppins-Medium",
    color: "#01615F",
  },
});

export default RestaurantScreen;
