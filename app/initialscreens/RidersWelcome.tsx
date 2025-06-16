import React, { useState } from "react";
import { View, Text, SafeAreaView, Animated } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Button from "@/components/ButtoN";
import { RFPercentage } from "react-native-responsive-fontsize";

const Onboarding = () => {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(1));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, padding: 24 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            <Image
              source={require("../../assets/images/Take Away.gif")}
              style={{
                width: 300,
                height: 300,
                resizeMode: "contain",
              }}
            />
          </Animated.View>
        </View>
        <View style={{ alignItems: "center", marginTop: -50 }}>
          <Image
            source={require("../../assets/images/logo2.png")}
            style={{ width: 300, height: 50, resizeMode: "contain" }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text allowFontScaling={false} 
            style={{
              fontSize: RFPercentage(2),
              color: "#014D4E",
              marginBottom: 28,
              fontWeight: "500",
            }}
          >
            Partner with Last Bite
          </Text>
          <Text allowFontScaling={false} 
            style={{
              fontSize: RFPercentage(2),
              color: "#4A4A4A",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Deliver and earn better
          </Text>
          <Button
            buttonContent="Get started"
            onPress={() => router.push("/Screens/RegisterRiders")}
            backgroundColor="#01615F"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
