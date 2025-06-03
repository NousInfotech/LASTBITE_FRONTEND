import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Animated, Platform } from "react-native";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import * as Font from "expo-font";
import Button from "@/components/ButtoN";

const Onboarding = () => {
  const navigation = useNavigation();
  const [activeOption, setActiveOption] = useState<string>("Food");
  const [fadeAnim] = useState(new Animated.Value(1)); 
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const options: string[] = ["Food", "Supermart"];

  const images: Record<string, any> = {
    Food: require("../../assets/images/Food.gif"),
    Instamart: require("../../assets/images/supermart.gif"),
    // Dineout: require("../../assets/images/OrderTracking.gif"),
  };

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

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const interval = setInterval(() => {
      handleOptionChange(
        options[(options.indexOf(activeOption) + 1) % options.length]
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [activeOption]);

  const handleOptionChange = (option: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setActiveOption(option);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const router = useRouter();

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            aspectRatio: 1,
            marginBottom: 32,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <Image
              source={images[activeOption]}
              style={{ width: 400, height: 400, resizeMode: "contain" }}
            />
          </Animated.View>
        </View>

        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <View style={{ flexDirection: "row", marginTop: 32, marginBottom: 8 }}>
            <Image
              source={require("../../assets/images/logo2.png")}
              style={{ width: 300, height: 50, resizeMode: "contain" }}
            />
          </View>

          <Text
            style={{
              color: "#929292",
              textAlign: "center",
              fontSize: 14,
              fontFamily: "Poppins-Regular",
            }}
          >
            Enjoy meals from popular spots around you
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          {options.map((option, index) => (
            <View key={option} style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontWeight: activeOption === option ? "400" : "normal",
                  color: activeOption === option ? "black" : "#4a4a4a",
                  fontSize: Platform.OS === "ios" ? 20 : 20,
                }}
              >
                {option}
              </Text>

              {index < options.length - 1 && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#01615F",
                    margin: 8,
                  }}
                />
              )}
            </View>
          ))}
        </View>

        <Button
          buttonContent="Get Started"
          onPress={() => router.push("/initialscreens/welcomescreen")}
          backgroundColor="#01615F"
        />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
