import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import * as Font from "expo-font";
import Button from "@/components/ButtoN";
import { RFPercentage } from "react-native-responsive-fontsize";

const LocationAccessScreen = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleAllowLocation = () => {
    console.log("Requesting location access");
    router.push("/(tabs)/home");
  };

  const handleManualEntry = () => {
    console.log("Opening manual location entry");
    router.push("/initialscreens/LocationInputScreen");
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const router = useRouter();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { fontFamily: "Poppins-Bold" }]}>
              What's your location?
            </Text>
            <Text style={[styles.subtitle, { fontFamily: "Poppins-Regular" }]}>
              We need your location to show available restaurants & products.
            </Text>
          </View>

          {/* Map Illustration Container */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/Location.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              buttonContent="Allow Location Access"
              onPress={handleAllowLocation}
            />
            <TouchableOpacity
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleManualEntry}
              style={[
                styles.borderButton,
                isPressed && styles.borderButtonHover,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.borderButtonText,
                  { fontFamily: "Poppins-Medium" },
                ]}
              >
                Enter location manually
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationAccessScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "flex-start",
    marginBottom: 24,
  },
  title: {
    fontSize: RFPercentage(3), // Reduced size
    marginBottom: 6,
  },
  subtitle: {
    fontSize: RFPercentage(2), // Reduced size
    color: "#6B7280",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    maxWidth: 350, // Reduced maximum width
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 12, // Reduced padding
  },
  borderButton: {
    borderWidth: 1,
    borderColor: "#01615F",
    borderRadius: 6, // Reduced border radius
    paddingVertical: 6, // Reduced padding
    marginTop: 12, // Reduced margin
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  borderButtonHover: {
    backgroundColor: "#E6F5F4",
  },
  borderButtonText: {
    fontSize: 18, // Reduced font size
    color: "#01615F",
    fontWeight: "600",
  },
});
