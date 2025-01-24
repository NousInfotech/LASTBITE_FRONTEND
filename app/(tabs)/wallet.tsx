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
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Font from "expo-font";

const Wallet = () => {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { panStatus } = useLocalSearchParams();
  const [isPanCompleted, setIsPanCompleted] = useState(false);

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
  
    // Convert panStatus to a boolean and set it
    const isCompleted = panStatus === 'true';
    setIsPanCompleted(isCompleted);
  }, [panStatus]); // This will run when panStatus changes

  if (!fontsLoaded) {
    return null; // Optionally, show a loading screen or placeholder
  }

  const handleContinuePress = () => {
    if (isPanCompleted) {
      router.push("/Screens/PersonalDetails"); // Redirect if PAN is completed
    } else {
      router.push("/Screens/PanInfo");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <GoBack />
        </TouchableOpacity>
      </View>

     {/* Content */}
     <View style={styles.content}>
        <Text style={styles.title}>Good to go!</Text>
        <Text style={styles.subtitle}>
          You are one step closer to extraordinary savings
        </Text>

        {/* Images in a Row */}
        <View style={styles.imageRow}>
          <Image
            source={require("../../assets/images/Wallet_img.png")}
            style={styles.walletImage}
          />
          <Image
            source={require("../../assets/images/Card.png")}
            style={styles.cardImage}
          />
        </View>
      </View>

      <View style={styles.content_A}>
        <View style={styles.stepsContainer}>
          <Text style={styles.stepText}>
            • Enter your PAN number
          </Text>
          <Text style={[styles.stepText, isPanCompleted && { color: "#01615F" }]}>• Fill in your details</Text>
          <Text style={styles.stepText}>• KYC with HDFC Bank</Text>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;


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
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Regular",
    color: "#01615F",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    color: "#000",
    textAlign: "center",
    marginVertical: 18,
  },
  imageRow: {
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    marginVertical: 20,
  },
  walletImage: {
    width: 170,
    height: 190,
    resizeMode: "contain",
    marginHorizontal: -30, 
  },
  cardImage: {
    width: 130,
    height: 190,
    resizeMode: "contain",
    marginHorizontal: -35, 
  },
  content_A: {
    flex: 1,
    alignItems: "flex-start", 
    paddingHorizontal: 20,
    marginTop: 150,  // Added margin to ensure content_A is below the images
  },
  stepsContainer: {
    marginVertical: 20,
    alignItems: "flex-start", // Align the steps container to the left
  },
  stepText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#555",
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "#01615F",
   paddingVertical: 10,
   borderRadius: 8,
   marginHorizontal: 16,
   marginTop: 16,
   position: "absolute",
   bottom: 16,
   width: "100%",
   alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
