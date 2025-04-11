import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Image, Animated, StatusBar } from "react-native";

export default function SplashScreen() {
  const [fadeAnim] = useState(new Animated.Value(0)); 
  const [fadeOutAnim] = useState(new Animated.Value(1)); 
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    StatusBar.setBarStyle("light-content"); 
    StatusBar.setBackgroundColor("#01615F"); 
    return () => {
      StatusBar.setBarStyle("dark-content"); 
      StatusBar.setBackgroundColor("#ffffff"); 
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, 
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeOutAnim, {
        toValue: 0, 
        duration: 2000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        // router.push("/auth/NumberLogin/otpScreen"); 
        router.push("/initialscreens/SelectRole"); 
      }, 3000); 
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
          opacity: fadeAnim, 
        }}
      />
    </View>
  );
}
