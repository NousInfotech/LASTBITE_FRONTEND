import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import Button from "@/components/ButtoN";
import * as Font from "expo-font";
import { RFPercentage } from "react-native-responsive-fontsize";

const Congratulation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const router = useRouter();

  const handleExplore = () => {
    router.push("/initialscreens/LocationAccessScreen");
  };

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
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
      <Text style={[styles.title, { fontFamily: "Poppins-Medium" }]}>
        Congratulations!
      </Text>
      <Text style={[styles.offer, { fontFamily: "Poppins-Regular" }]}>
        Your welcome gift is unlocked!
      </Text>
      <Image
        source={require("../../assets/images/offer.png")}
        style={[styles.image, { width: 350, height: 400 }]} // Decreased image size
        resizeMode="contain"
      />
      <Button
        buttonContent="Explore"
        onPress={handleExplore}
        backgroundColor="white"
        textColor="#01615F"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01615F",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 32, // Adjusted font size
    color: "white",
    marginBottom: 8, // Reduced margin
    textAlign: "center",
  },
  offer: {
    fontFamily: "Poppins-Regular",
    fontSize: RFPercentage(2), // Adjusted font size
    color: "white",
    marginBottom: 16, // Reduced spacing
    textAlign: "center",
  },
  image: {
    marginVertical: 16, // Reduced vertical margin
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
});

export default Congratulation;
