import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Image, Animated, StatusBar } from "react-native";

export default function SplashScreen() {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0
  const [fadeOutAnim] = useState(new Animated.Value(1)); // Initial opacity for fade-out is 1
  const navigation = useNavigation();
  const router = useRouter();

  // Change status bar color only for the SplashScreen
  useEffect(() => {
    StatusBar.setBarStyle("light-content"); // Adjust for light text color
    StatusBar.setBackgroundColor("#01615F"); // Set status bar to teal

    // Reset the status bar color after leaving SplashScreen (if necessary)
    return () => {
      StatusBar.setBarStyle("dark-content"); // Reset text color
      StatusBar.setBackgroundColor("#ffffff"); // Reset background color
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    // Fade-in animation for the image
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to opacity 1
      duration: 2000, // Duration of the fade-in
      useNativeDriver: true,
    }).start();

    // Wait for 2 seconds, then start the fade-out animation
    const timer = setTimeout(() => {
      Animated.timing(fadeOutAnim, {
        toValue: 0, // Fade out to opacity 0
        duration: 2000, // Duration of the fade-out
        useNativeDriver: true,
      }).start();

      // After fade-out animation ends, navigate to the next page
      setTimeout(() => {
        router.push("/(tabs)/home"); // Navigate to the onboarding screen
      }, 3000); // Ensure that the navigation happens after the fade-out completes
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, fadeOutAnim, router]);

  return (
    <View className="h-screen justify-center items-center bg-rootTeal">
      <Animated.Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 300,
          height: 150,
          opacity: fadeAnim, // Apply fade-in animation
        }}
      />
    </View>
  );
}
