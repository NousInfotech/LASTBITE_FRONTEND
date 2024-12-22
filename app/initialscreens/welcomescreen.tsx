import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import { useNavigation } from "expo-router";
const WelcomeScreen = () => {
  const router = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [boxAnimation] = useState(new Animated.Value(-200));
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        myCustomFont: require("../../assets/fonts/Itim-Regular.ttf"),
        "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(boxAnimation, {
        toValue: 0, // Set the final position to be at the center (or wherever you prefer)
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade out after the box animation is done
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    // Redirect after 2 seconds when the fadeout is done
    setTimeout(() => {
      router.push("/UserDetails/GetUserDetails"); // Corrected navigation method with router.push
    }, 3000); // Adjust the time to match your animation duration
  }, [boxAnimation, fadeAnim, router]);

  if (!fontsLoaded) {
    return null; // Optionally, you can show a loading screen or placeholder until fonts are loaded
  }

  return (
    <View style={styles.container}>
      {/* Apply the fade animation to the entire container */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Animated.Image
          source={require("../../assets/images/welcome.png")} // Ensure the image path is correct
          style={[
            styles.image,
            {
              transform: [{ translateY: boxAnimation }],
            },
          ]}
        />
        <Text style={[styles.welcome, { fontFamily: "myCustomFont" }]}>
          Welcome!
        </Text>
        <Text style={[styles.offer, { fontFamily: "Poppins-Medium" }]}>
          Finish the next steps to unlock
        </Text>
        <Text style={[styles.discount, { fontFamily: "Poppins-Medium" }]}>
          50% off & Free Delivery
        </Text>
        <Text style={[styles.offer, { fontFamily: "Poppins-Medium" }]}>
          on your first order!
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 40,
    marginBottom: 24,
    fontFamily: "myCustomFont", // Make sure the font is applied here
    textAlign: "center",
  },
  image: {
    width: 350, // Set the width of your image
    height: 350, // Set the height of your image
    marginVertical: 24,
  },
  offer: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  discount: {
    fontSize: 27, // Set the font size to 32px
    color: "#01615F", // Set the color to #01615F
    textAlign: "center",
    fontFamily: "Poppins-Medium", // Apply the Poppins-Medium font
    paddingHorizontal: 24,
  },
});

export default WelcomeScreen;
